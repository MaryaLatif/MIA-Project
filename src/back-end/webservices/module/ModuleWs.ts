import {Express, json} from 'express';
import {ModuleService} from "../../services/module/ModuleService";


/**
 * Exemple de web service avec un endpoint post et get
 * @param app 
 */

export function ModuleWs(app: Express) {
    const BaseUrl = "/api/exempleWs";
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
    });
    app.get(`${BaseUrl}`, (req, res) => {
        const moduleName = new ModuleService();
        res.json(moduleName.getModuleByName());
    })

    app.get(`${BaseUrl}/module/:id`, (req, res) => {
        const moduleProf = new ModuleService();
        const id: number = +req.params.id; // + pour convertir stirng en number
        res.json(moduleProf.getProfOfModule(id));
    });

    app.get(`${BaseUrl}/cours/:id`,(req, res) => {
        const coursesList = new ModuleService();
        const id: number = +req.params.id;
        res.json(coursesList.getCourses(id));
    })

    app.get(`${BaseUrl}/td/:id`, (req, res) => {
        const tdList = new ModuleService();
        const id: number = +req.params.id;
        res.json(tdList.getTd(id));
    })

    app.get(`${BaseUrl}/tp/:id`, (req, res) =>{
        const tpList = new ModuleService();
        const id: number = +req.params.id;
        res.json(tpList.getTp(id));
    })

}
