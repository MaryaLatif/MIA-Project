import {Express} from "express";
import {UserService} from "../../services/user/UserService";

export function UserWs(app: Express){
    const BaseUrl = "/api/module";

    app.get(`${BaseUrl}/user/:nip`, (req, res) =>{
        const fullName = new UserService();
        const nip: number = +req.params.nip;
        res.json(fullName.getFullName(nip));
    })
}