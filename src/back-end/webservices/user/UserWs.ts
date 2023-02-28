import {Express} from "express";
import {UserService} from "../../services/user/UserService";

export function UserWs(app: Express){
    const BaseUrl = "/api/exempleWs";

    app.get(`${BaseUrl}/user`, (req, res) =>{

    })
}