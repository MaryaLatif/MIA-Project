import express, { Express } from "express";


export function FrontWs(app: Express){
    const BaseUrl = "/module";

    app.get(`${BaseUrl}/*`, (req, res) =>{
        res.sendFile("/Users/marya/Dev/MIA-Project/src/app/modules/html/module.html");
    } );

}
