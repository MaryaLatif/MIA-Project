"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConventionTransformer = exports.isPrimitive = exports.getMigrateConventionDefaults = exports.DEFAULTS = void 0;
const change_case_1 = require("change-case");
const pluralize_1 = require("pluralize");
const MODEL_TOKEN = 'model';
const ENUM_TOKEN = 'enum';
exports.DEFAULTS = {
    tableCaseConvention: change_case_1.pascalCase,
    fieldCaseConvention: change_case_1.camelCase,
    pluralize: false,
};
function getMigrateConventionDefaults() {
    return Object.assign({}, exports.DEFAULTS);
}
exports.getMigrateConventionDefaults = getMigrateConventionDefaults;
function isPrimitive(field_type) {
    field_type = field_type.replace('[]', '').replace('?', '').replace(/("\w+")/, '');
    return [
        'String',
        'Boolean',
        'Int',
        'BigInt',
        'Float',
        'Decimal',
        'DateTime',
        'Json',
        'Bytes',
        'Unsupported',
    ].includes(field_type);
}
exports.isPrimitive = isPrimitive;
const MODEL_DECLARATION_REGEX = /^\s*model\s+(?<model>\w+)\s*\{\s*/;
const MODEL_MAP_ANNOTATION_REGEX = /@@map\("(?<map>\w+)"\)/;
const ENUM_DECLARATION_REGEX = /^\s*enum\s+(?<enum>\w+)\s*\{\s*/;
const FIELD_DECLARATION_REGEX = /^(\s*)(?<field>\w+)(\s+)(?<type>[\w+]+)(?<is_array_or_nullable>[\[\]\?]*)(\s+.*\s*)?(?<comments>\/\/.*)?/;
const MAP_ANNOTATION_REGEX = /@map\("(?<map>\w+)"\)/;
const RELATION_ANNOTATION_REGEX = /(?<preamble>@relation\("?\w*"?,?\s*)((?<cue1>(fields|references):\s*\[)(?<ids1>\w+(,\s*\w+\s*)*))((?<cue2>\]\,\s*(fields|references):\s*\[)(?<ids2>\w+(,\s*\w+\s*)*))(?<trailer>\].*)/;
const TABLE_INDEX_REGEX = /\@\@index\((?<fields>\[[\w\s,]+\])/;
const TABLE_UNIQUE_REGEX = /\@\@unique\((?<fields>\[[\w\s,]+\])/;
const TABLE_ID_REGEX = /\@\@id\((?<fields>\[[\w\s,]+\])/;
class ConventionTransformer {
    static migrateCaseConventions(file_contents, options) {
        const { tableCaseConvention, fieldCaseConvention, mapTableCaseConvention, mapFieldCaseConvention, pluralize, } = options;
        const lines = file_contents.split('\n');
        const [reshape_model_error] = ConventionTransformer.reshapeModelDefinitions(lines, tableCaseConvention, mapTableCaseConvention);
        if (reshape_model_error) {
            return [, reshape_model_error];
        }
        const [reshaped_enum_map, reshape_enum_error] = ConventionTransformer.reshapeEnumDefinitions(lines, tableCaseConvention);
        if (reshape_enum_error) {
            return [, reshape_enum_error];
        }
        const reshape_model_options = {
            reshaped_enum_map: reshaped_enum_map,
            pluralize: pluralize,
            fieldCaseConvention,
            tableCaseConvention,
            mapFieldCaseConvention,
        };
        const [reshape_model_field_error] = ConventionTransformer.reshapeModelFields(lines, reshape_model_options);
        if (reshape_model_field_error) {
            return [, reshape_model_field_error];
        }
        return [lines.join('\n'),];
    }
    static findExistingMapAnnotation(lines) {
        for (let i = lines.length - 1; i >= 0; i--) {
            const line = lines[i];
            const matches = line.match(MODEL_MAP_ANNOTATION_REGEX);
            if (!!matches) {
                return [matches.groups['map'], i];
            }
        }
        return [, -1];
    }
    static reshapeModelDefinitions(lines, tableCaseConvention, mapTableCaseConvention) {
        var _a, _b;
        const [model_bounds, model_bounds_error] = ConventionTransformer.getDefinitionBounds(MODEL_TOKEN, lines);
        if (model_bounds_error) {
            return [model_bounds_error];
        }
        /*
          in scope [start, end]:
            - find raw_model_header : REQUIRED  (ex: `model MyModel {`)
            - find existing_map_anno: OPTIONAL  (ex: `  @@map("my_model")`)
    
            ensure existence of 2 symbols: [model-name, store-name]
            1. raw_model_header gets updated to be model-name
            2. if model-name == store-name, ensure @@map does not exist
               if model-name != store-name, apply @@map("store-name")
    
            where:
              model-name := tableCase(raw_model_header)
              store-name := mapTableCase?(model-name) ?? existing_map_anno ?? raw_model_header
        */
        let offset = 0;
        for (let [base_start, base_end] of model_bounds) {
            const start = base_start + offset;
            const end = base_end + offset;
            try {
                const model_declaration_line = MODEL_DECLARATION_REGEX.exec(lines[start]);
                const [existing_map_anno, map_anno_index] = ConventionTransformer.findExistingMapAnnotation(lines.slice(start, end));
                const raw_model_header = model_declaration_line.groups['model'];
                const model_name = tableCaseConvention(raw_model_header);
                const store_name = (_b = (_a = mapTableCaseConvention === null || mapTableCaseConvention === void 0 ? void 0 : mapTableCaseConvention(model_name)) !== null && _a !== void 0 ? _a : existing_map_anno) !== null && _b !== void 0 ? _b : raw_model_header;
                const mapping_annotation_line_number = start + map_anno_index;
                if (model_name == store_name && 0 <= map_anno_index) {
                    lines.splice(mapping_annotation_line_number, 1);
                    offset -= 1;
                }
                if (model_name != store_name) {
                    const map_model_line = `  @@map("${store_name}")`;
                    lines[start] = ConventionTransformer.transformDeclarationName(lines[start], model_name, tableCaseConvention);
                    if (0 <= map_anno_index) {
                        lines.splice(mapping_annotation_line_number, 1, map_model_line);
                    }
                    else {
                        lines.splice(start + 1, 0, map_model_line);
                        offset += 1;
                    }
                }
            }
            catch (error) {
                return [error];
            }
        }
        return [];
    }
    static reshapeEnumDefinitions(lines, tableCaseConvention) {
        const reshaped_enum_map = new Map(); // Map<origin_enum_name, reshaped_enum_name>
        const [enum_bounds, enum_bounds_error] = ConventionTransformer.getDefinitionBounds(ENUM_TOKEN, lines);
        if (enum_bounds_error) {
            return [, enum_bounds_error];
        }
        for (const [start, _end] of enum_bounds) {
            try {
                const enum_declaration_line = ENUM_DECLARATION_REGEX.exec(lines[start]);
                const enum_name = enum_declaration_line.groups['enum'];
                const reshaped_enum_name = tableCaseConvention(enum_name);
                if (reshaped_enum_name !== enum_name) {
                    lines[start] = ConventionTransformer.transformDeclarationName(lines[start], enum_name, tableCaseConvention);
                }
                reshaped_enum_map.set(enum_name, reshaped_enum_name);
            }
            catch (error) {
                return [, error];
            }
        }
        return [reshaped_enum_map];
    }
    /**
     * Given a working schema.prisma change buffer, updates model fields based on
     * conventions provided in. This includes updating references in the following
     * annotation types: `@relation`, `@unique`, and `@index`.
     */
    static reshapeModelFields(lines, options) {
        var _a, _b, _c, _d;
        const { reshaped_enum_map, pluralize, fieldCaseConvention, tableCaseConvention, mapFieldCaseConvention } = options;
        const [model_bounds, model_bounds_error] = ConventionTransformer.getDefinitionBounds(MODEL_TOKEN, lines);
        if (model_bounds_error) {
            return [model_bounds_error];
        }
        for (const [start, end] of model_bounds) {
            for (let i = start; i < end; i++) {
                /*
                  in scope lines[i]:
                    - find field  : REQUIRED  (ex: `>>>id<<< @id @map("Id")`)
                    - find raw_@map        : OPTIONAL  (ex: `id @id >>>@map("Id")<<<`)
        
                    ensure existence of 2 symbols: [model-name, store-name]
                    1. field becomes field-name
                    2. if model-name == store-name, ensure @map does not exist
                      if model-name != store-name, apply @map("store-name")
                    where
                    
                    field-name := fieldCase(field)
                    store-name := mapFieldCase?(field-name) ?? existing raw_@map ?? field
                */
                const field_declaration_line = FIELD_DECLARATION_REGEX.exec(lines[i]);
                if (field_declaration_line) {
                    let [search_term, chunk0, field, chunk2, type, is_array_or_nullable, chunk5] = field_declaration_line;
                    const raw_map = (_b = (_a = MAP_ANNOTATION_REGEX.exec(chunk5)) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b['map'];
                    if (raw_map) {
                        // delete it, we'll tee it up again in a moment
                        chunk5 = chunk5.replace(`@map("${raw_map}")`, '');
                    }
                    let model_name = fieldCaseConvention(field);
                    const store_name = (_d = (_c = mapFieldCaseConvention === null || mapFieldCaseConvention === void 0 ? void 0 : mapFieldCaseConvention(model_name)) !== null && _c !== void 0 ? _c : raw_map) !== null && _d !== void 0 ? _d : field;
                    if (pluralize && is_array_or_nullable.startsWith('[]')) {
                        model_name = (0, pluralize_1.plural)(model_name);
                    }
                    let map_field_fragment = '';
                    // Primitive field
                    if (model_name !== store_name &&
                        !lines[i].includes('@relation') &&
                        isPrimitive(type)) {
                        map_field_fragment = ` @map("${store_name}")`;
                    }
                    if (model_name === store_name) {
                        map_field_fragment = '';
                    }
                    // Exception field
                    const enum_name = reshaped_enum_map.get(type);
                    if (enum_name) {
                        // Enum field
                        type = enum_name;
                        map_field_fragment = ` @map("${store_name}")`;
                    }
                    else if (!isPrimitive(type)) {
                        // Unhandled field type
                        type = tableCaseConvention(type);
                    }
                    lines[i] = lines[i].replace(search_term, [chunk0, model_name, chunk2, type, is_array_or_nullable, map_field_fragment, chunk5,].join(''));
                }
                const relation_annotation_line = RELATION_ANNOTATION_REGEX.exec(lines[i]);
                if (relation_annotation_line) {
                    // , chunk0, fields, chunk2, references, chunk4
                    const [search_term] = relation_annotation_line;
                    const { preamble, cue1, ids1, cue2, ids2, trailer } = relation_annotation_line.groups;
                    const updated_ids1 = ids1
                        .split(/,\s*/)
                        .map(fieldCaseConvention)
                        .join(', ');
                    const updated_ids2 = ids2
                        .split(/,\s*/)
                        .map(fieldCaseConvention)
                        .join(', ');
                    lines[i] = lines[i].replace(search_term, [preamble, cue1, updated_ids1, cue2, updated_ids2, trailer].join(''));
                }
                const table_unique_declaration_line = TABLE_UNIQUE_REGEX.exec(lines[i]);
                if (table_unique_declaration_line) {
                    const field_names = table_unique_declaration_line.groups['fields'];
                    const updated_field_names = `[${field_names.split(/,\s*/).map(fieldCaseConvention).join(', ')}]`;
                    lines[i] = lines[i].replace(field_names, updated_field_names);
                }
                const table_index_declaration_line = TABLE_INDEX_REGEX.exec(lines[i]);
                if (table_index_declaration_line) {
                    const field_names = table_index_declaration_line.groups['fields'];
                    const updated_field_names = `[${field_names.split(/,\s*/).map(fieldCaseConvention).join(', ')}]`;
                    lines[i] = lines[i].replace(field_names, updated_field_names);
                }
                const table_id_declaration_line = TABLE_ID_REGEX.exec(lines[i]);
                if (table_id_declaration_line) {
                    const field_names = table_id_declaration_line.groups['fields'];
                    const updated_field_names = `[${field_names.split(/,\s*/).map(fieldCaseConvention).join(', ')}]`;
                    lines[i] = lines[i].replace(field_names, updated_field_names);
                }
            }
        }
        return [];
    }
    static getDefinitionBounds(token, lines) {
        const END_DEFINITION_TOKEN = '}';
        const definition_bounds = [];
        let within_definition = false;
        let boundary_cursor = [];
        for (const [index, line] of lines.entries()) {
            if (!within_definition && line.trim().startsWith(token)) {
                boundary_cursor.push(index);
                within_definition = true;
            }
            else if (within_definition && line.trim().endsWith(END_DEFINITION_TOKEN)) {
                boundary_cursor.push(index);
                definition_bounds.push(boundary_cursor);
                boundary_cursor = [];
                within_definition = false;
            }
        }
        if (within_definition) {
            return [, new Error(`${token} starting on line ${boundary_cursor[0]} did not end`)];
        }
        return [definition_bounds,];
    }
    static transformDeclarationName(declaration_line, declaration_name, tableCaseConvention) {
        return declaration_line.replace(declaration_name, tableCaseConvention(declaration_name));
    }
}
exports.ConventionTransformer = ConventionTransformer;
//# sourceMappingURL=convention-transformer.js.map