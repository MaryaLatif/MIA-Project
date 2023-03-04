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
        },
        {
            id: 4,
            name: "JavaScript",
            prof: "Bosc Marcel",
            email: "bosc.marcel@univ-paris13.fr"
        },
        {
            id: 5,
            name: "Graphe",
            prof: "Hebert David",
            email: "hebert.david@univ-paris13.fr"
        },
        {
            id: 6,
            name: "Gestion",
            prof: "Tour Clair",
            email: "tour.clair@univ-paris13.fr"
        },
        {
            id: 7,
            name: "Base de Donnée",
            prof: "Abir Hocine",
            email: "abor.hocine@univ-paris13.fr"
        },
        {
            id: 8,
            name: "Java",
            prof: "Azzag Hanane",
            email: "azzag.hanane@univ-paris13.fr"
        },
        {
            id: 9,
            name: "Droit",
            prof: "Bamba Aboudouramane",
            email: "bamba.aboudouramane@univ-paris13.fr"
        },
        {
            id: 10,
            name: "Réseaux",
            prof: "Mayero Micaela",
            email: "mayero.micaela@univ-paris13.fr"
        },
        {
            id: 11,
            name: "HTML/CSS",
            prof: "Lemoin Jsp",
            email: "lemoin@univ-paris13.fr"
        },

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
            dateAdd: new Date(2023,2,21).toDateString(),
            download: true
        },
        {
            id: 1,
            name: "Condition, boucle",
            semester: 1,
            dateAdd: new Date(2023,2,20).toDateString(),
            download: true
        },
        {
            id: 1,
            name: "Variable",
            semester: 1,
            dateAdd: new Date(2022,2,22).toDateString(),
            download: true
        },
        {
            id: 1,
            name: "Matrice",
            semester: 1,
            dateAdd: new Date(2023,2,21).toDateString(),
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
            dateAdd: new Date(2023,2,20).toDateString(),
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
            dateAdd: new Date(2023,2,20).toDateString(),
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
        let i: number = 1;
        while (i < this.courses.length){
            let j: number = 0;
            while(j < i){
                if(new Date(this.courses[i].dateAdd) < new Date(this.courses[j].dateAdd)){
                    let a: Courses = this.courses[i];
                    this.courses[i] = this.courses[j];
                    this.courses[j] = a;
                }
                j++;
            }
            i++;
        }

        const coursesList: Courses[] = [];
        this.courses.map((Courses) =>{
            if(Courses.id == id){
                coursesList.push(Courses);
            }
        })
        return coursesList;
    }

    public getTd(id: number): Td[]{ //renvoyer la liste des td
        let i: number = 1;
        while (i < this.td.length){
            let j: number = 0;
            while(j < i){
                if(new Date(this.td[i].dateAdd) < new Date(this.td[j].dateAdd)){
                    let a: Courses = this.td[i];
                    this.td[i] = this.td[j];
                    this.td[j] = a;
                }
                j++;
            }
            i++;
        }

        const tdList: Td[] = [];
        this.td.map((Td) =>{
            if(Td.id == id){
                tdList.push(Td);
            }
        })
        return tdList;
    }

    public getTp(id: number): Tp[]{ //renvoyer la liste des tp
        let i: number = 1;
        while (i < this.tp.length){
            let j: number = 0;
            while(j < i){
                if(new Date(this.tp[i].dateAdd) < new Date(this.tp[j].dateAdd)){
                    let a: Courses = this.tp[i];
                    this.tp[i] = this.tp[j];
                    this.tp[j] = a;
                }
                j++;
            }
            i++;
        }

        const tpList: Tp[] = [];
        this.tp.map((Tp) => {
            if(Tp.id == id){
                tpList.push(Tp);
            }
        })
        return tpList;
    }

    public getResearch(id: number, send: string): object[]{
        let re = new RegExp(`${send}`, "i");
        type Res = {
            name?: string,
            semester?: number,
            dateAdd?: string,
            download?: boolean
        };
        const listRes: object[] = [];

        this.courses.map((Courses)=>{
            if(re.test(Courses.name) && id == Courses.id){
                const res: Res = {};
                res.name = Courses.name;
                res.semester = Courses.semester;
                res.dateAdd = Courses.dateAdd;
                res.download = Courses.download;
                listRes.push(res);
            }
        });
        this.td.map((Td) =>{
            if(re.test(Td.name) && id == Td.id) {
                const res: Res = {};
                res.name = Td.name;
                res.semester = Td.semester;
                res.dateAdd = Td.dateAdd;
                res.download = Td.download;
                listRes.push(res);
            }
        })
        this.tp.map((Tp)=>{
            if(re.test(Tp.name) && id == Tp.id) {
                const res: Res = {};
                res.name = Tp.name;
                res.semester = Tp.semester;
                res.dateAdd = Tp.dateAdd;
                res.download = Tp.download;
                listRes.push(res);
            }
        });

        if(listRes.length != 0) return listRes;
        else return [{error: "Cette recherche n'existe pas"}];
    }
}