import {Express, json, response} from 'express';
import {ModuleService} from "../../services/module/ModuleService";


/**
 * Exemple de web service avec un endpoint post et get
 * @param app 
 */

export function ModuleWs(app: Express) {
    const BaseUrl = "/api/module";
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
    });
    app.get(`${BaseUrl}/`, (req, res) => {
        const moduleName = new ModuleService();
        res.json(moduleName.getModuleByName());
    })

    app.get(`${BaseUrl}/:id/prof`, (req, res) => {
        const moduleProf = new ModuleService();
        const id: number = +req.params.id; // + pour convertir stirng en number
        res.json(moduleProf.getProfOfModule(id));
    });

    app.get(`${BaseUrl}/:id/cours`,(req, res) => {
        const coursesList = new ModuleService();
        const id: number = +req.params.id;
        res.json(coursesList.getCourses(id));
    })

    app.get(`${BaseUrl}/:id/td`, (req, res) => {
        const tdList = new ModuleService();
        const id: number = +req.params.id;
        res.json(tdList.getTd(id));
    })

    app.get(`${BaseUrl}/:id/tp`, (req, res) =>{
        const tpList = new ModuleService();
        const id: number = +req.params.id;
        res.json(tpList.getTp(id));
    })

    app.post(`${BaseUrl}/:id/research`, (req, res) =>{
        const search = new ModuleService();
        res.json(search.getResearch(+req.params.id, req.body.research));
    })
}
