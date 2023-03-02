import {Courses, Module, Td, Tp} from "./types/modulesTypes";

export class ModuleService {
    private module: Module[] = [
        {
            id: 1,
            name: "Initiation au développement",
            prof: "Kristikis",
            email: "kris.evag@univ-paris13.fr"
        },
        {
            id: 2,
            name: "Bas niveau",
            prof: "Kristikis",
            email: "kris.evag@univ-paris13.fr"
        },
        {
            id: 3,
            name: "Communication",
            prof: "Ciara Citron",
            email: "ciara.citron@univ-paris13.fr"
        }
    ];
    private courses: Courses[] = [
        {
            id: 1,
            name: "Tableaux",
            semester: 1,
            dateAdd: new Date(2023,2,22).toDateString(),
            download: true
        },
        {
            id: 1,
            name: "Table de hachage",
            semester: 1,
            dateAdd: new Date(2023,2,22).toDateString(),
            download: true
        },
        {
            id: 1,
            name: "Condition, boucle",
            semester: 1,
            dateAdd: new Date(2023,2,22).toDateString(),
            download: true
        },
        {
            id: 1,
            name: "Variable",
            semester: 1,
            dateAdd: new Date(2023,2,22).toDateString(),
            download: true
        },
        {
            id: 1,
            name: "Matrice",
            semester: 1,
            dateAdd: new Date(2023,2,22).toDateString(),
            download: true
        },
        {
            id: 2,
            name: "C",
            semester: 2,
            dateAdd: new Date(2023,2,22).toDateString(),
            download: false
        },
        {
            id: 2,
            name: "Assembleur",
            semester: 2,
            dateAdd: new Date(2023,2,22).toDateString(),
            download: true
        }
    ]

    private td: Td[] = [
        {
            id: 1,
            name: "TD Tableaux",
            semester: 1,
            dateAdd: new Date(2023,2,22).toDateString(),
            download: true
        },
        {
            id: 1,
            name: "TD Table de hachage",
            semester: 1,
            dateAdd: new Date(2023,2,22).toDateString(),
            download: true
        },
        {
            id: 1,
            name: "TD Condition, boucle",
            semester: 1,
            dateAdd: new Date(2023,2,22).toDateString(),
            download: true
        },
        {
            id: 1,
            name: "TD Variable",
            semester: 1,
            dateAdd: new Date(2023,2,22).toDateString(),
            download: true
        },
        {
            id: 1,
            name: "TD Matrice",
            semester: 1,
            dateAdd: new Date(2023,2,22).toDateString(),
            download: true
        },
        {
            id: 1,
            name: "TD Matrice 1",
            semester: 1,
            dateAdd: new Date(2023,2,22).toDateString(),
            download: true
        },
        {
            id: 1,
            name: "TD Matrice 2",
            semester: 1,
            dateAdd: new Date(2023,2,22).toDateString(),
            download: true
        },
        {
            id: 1,
            name: "TD Algo",
            semester: 1,
            dateAdd: new Date(2023,2,22).toDateString(),
            download: true
        },
        {
            id: 1,
            name: "TD Dico",
            semester: 1,
            dateAdd: new Date(2023,2,22).toDateString(),
            download: true
        },
        {
            id: 2,
            name: "TD pointeur",
            semester: 2,
            dateAdd: new Date(2023,2,22).toDateString(),
            download: false
        },
        {
            id: 2,
            name: "TD Programation en asembleur",
            semester: 2,
            dateAdd: new Date(2023,2,22).toDateString(),
            download: true
        }
    ]

    private tp: Tp[] = [
        {
            id: 1,
            name: "TP Tableaux",
            semester: 1,
            dateAdd: new Date(2023,2,22).toDateString(),
            download: true
        },
        {
            id: 1,
            name: "TP Table de hachage",
            semester: 1,
            dateAdd: new Date(2023,2,22).toDateString(),
            download: true
        },
        {
            id: 1,
            name: "TP Condition, boucle",
            semester: 1,
            dateAdd: new Date(2023,2,22).toDateString(),
            download: true
        },
        {
            id: 2,
            name: "TP pointeur",
            semester: 2,
            dateAdd: new Date(2023,2,22).toDateString(),
            download: false
        },
        {
            id: 2,
            name: "TP Programation en asembleur",
            semester: 2,
            dateAdd: new Date(2023,2,22).toDateString(),
            download: true
        }
    ]
    constructor() { }

    public getModuleByName(): string[] { //récup les noms des modules
           const moduleName: string[] = [];
           this.module.map((Module) => {
               moduleName.push(Module.name);
        });
           return moduleName;
    }

    public getProfOfModule(id: number): string[]{ //renvoyer les infos du responsable module
        const moduleProf: string[] = [];
        this.module.map((Module) => {
           if(Module.id === id){
               if (Module.prof != null && Module.email != null) {
                   moduleProf.push(Module.prof, Module.email);
               }
           }
        })
        return moduleProf;
    }

    public getCourses(id: number): Courses[]{ //renvoyer les cours du module
        const coursesList: Courses[] = [];
        this.courses.map((Courses) =>{
            if(Courses.id == id){
                coursesList.push(Courses);
            }
        })
        return coursesList;
    }

    public getTd(id: number): Td[]{ //renvoyer la liste des td
        const tdList: Td[] = [];
        this.td.map((Td) =>{
            if(Td.id == id){
                tdList.push(Td);
            }
        })
        return tdList;
    }

    public getTp(id: number): Tp[]{ //renvoyer la liste des tp
        const tpList: Tp[] = [];
        this.tp.map((Tp) => {
            if(Tp.id == id){
                tpList.push(Tp);
            }
        })
        return tpList;
    }
}