#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryGetTableCaseConvention = exports.tryGetFileContents = void 0;
const fs_1 = require("fs");
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const change_case_1 = require("change-case");
const internals_1 = require("@prisma/internals");
const convention_transformer_1 = require("./convention-transformer");
const DEFAULT_FILE_LOCATION = 'schema.prisma';
const program = new commander_1.Command(`prisma-case-format`);
const VERSION = require('../package.json').version;
const SUPPORTED_CASE_CONVENTIONS_MESSAGE = `Supported case conventions: ["pascal", "camel", "snake"]`;
program
    .description(`Give your schema.prisma sane naming conventions`)
    .addHelpText('after', SUPPORTED_CASE_CONVENTIONS_MESSAGE)
    .requiredOption('--file <file>', 'cwd-relative path to schema.prisma file', DEFAULT_FILE_LOCATION)
    .option('-D, --dry-run', 'print changes to console, rather than back to file', false)
    .option('--table-case <tableCase>', 'case convention for table names', 'pascal')
    .option('--field-case <fieldCase>', 'case convention for field names', 'camel')
    .option('--map-table-case <mapTableCase>', 'case convention for @@map() annotations')
    .option('--map-field-case <mapFieldCase>', 'case convention for @map() annotations')
    .option('-p, --pluralize', 'optionally pluralize array type fields', false)
    .version(VERSION, '', `hint: you have v${VERSION}`);
program.parse(process.argv);
run();
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const options = program.opts();
        if (options.dryRun) {
            console.log('***Dry run mode***');
        }
        const [file_contents, err] = tryGetFileContents(options);
        if (err) {
            console.error(chalk_1.default.red("Encountered an error while trying to read provided schema.prisma file at path " + options.file));
            console.error(chalk_1.default.red(err.message));
            process.exit(1);
        }
        const convention_options = (0, convention_transformer_1.getMigrateConventionDefaults)();
        if (options.tableCase) {
            let [tableCaseConvention, err] = tryGetTableCaseConvention(options.tableCase);
            if (err) {
                console.warn(chalk_1.default.yellow(`Warning: encountered unsupported case convention: "${options.fieldCase}". Defaulting to "pascal" case.`));
                [tableCaseConvention,] = tryGetTableCaseConvention('pascal');
            }
            else {
                convention_options.tableCaseConvention = tableCaseConvention;
            }
        }
        if (options.fieldCase) {
            let [fieldCaseConvention, err] = tryGetTableCaseConvention(options.fieldCase);
            if (err) {
                console.warn(chalk_1.default.yellow(`Warning: encountered unsupported case convention: "${options.fieldCase}". Defaulting to "camel" case.`));
                [fieldCaseConvention,] = tryGetTableCaseConvention('camel');
            }
            else {
                convention_options.fieldCaseConvention = fieldCaseConvention;
            }
        }
        if (options.mapTableCase) {
            const opt_case = options.mapTableCase;
            let [convention, err] = tryGetTableCaseConvention(opt_case);
            if (err) {
                console.error(chalk_1.default.red(`Error: encountered unsupported case convention for --map-table-case: "${opt_case}".`));
                console.error(chalk_1.default.red(`Suggestion: ${SUPPORTED_CASE_CONVENTIONS_MESSAGE}`));
                program.outputHelp();
                process.exit(1);
            }
            else {
                convention_options.mapTableCaseConvention = convention;
            }
        }
        if (options.mapFieldCase) {
            const opt_case = options.mapFieldCase;
            let [convention, err] = tryGetTableCaseConvention(opt_case);
            if (err) {
                console.error(chalk_1.default.red(`Error: encountered unsupported case convention for --map-field-case: "${opt_case}".`));
                console.error(chalk_1.default.red(`Suggestion: ${SUPPORTED_CASE_CONVENTIONS_MESSAGE}`));
                program.outputHelp();
                process.exit(1);
            }
            else {
                convention_options.mapFieldCaseConvention = convention;
            }
        }
        convention_options.pluralize = !!options.pluralize;
        const [schema, schema_error] = convention_transformer_1.ConventionTransformer.migrateCaseConventions(file_contents, convention_options);
        if (schema_error) {
            console.error(chalk_1.default.red('Encountered error while migrating case conventions'));
            console.error(chalk_1.default.red(schema_error));
            process.exit(1);
        }
        const new_schema = yield (0, internals_1.formatSchema)({ schema: schema });
        if (options.dryRun) {
            console.log(new_schema);
            process.exit(0);
        }
        (0, fs_1.writeFileSync)(options.file, Buffer.from(new_schema), { encoding: 'utf8' });
        console.log(chalk_1.default.blue('✨ Done.'));
    });
}
function tryGetFileContents(options) {
    const file_path = options.file;
    try {
        const contents = String((0, fs_1.readFileSync)(file_path));
        return [contents,];
    }
    catch (error) {
        return [, error];
    }
}
exports.tryGetFileContents = tryGetFileContents;
function tryGetTableCaseConvention(type) {
    switch (type) {
        case 'pascal': return [change_case_1.pascalCase,];
        case 'camel': return [change_case_1.camelCase,];
        case 'snake': return [change_case_1.snakeCase,];
        default: return [, new Error('unsupported case convention: ' + type)];
    }
}
exports.tryGetTableCaseConvention = tryGetTableCaseConvention;
//# sourceMappingURL=cli.js.map