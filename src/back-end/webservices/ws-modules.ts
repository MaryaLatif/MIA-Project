
import { Express } from 'express';
import { ExempleWs } from './exemple/ExempleWs';
import { ModuleWs } from './module/ModuleWs';
import {UserWs} from "./user/UserWs";
import {FrontWs} from "./front/FrontWs";
/**
 * Register the web-services for the api.
 * @param app 
 */
export function registerWebServices(app: Express) {
    ExempleWs(app);
    FrontWs(app);
    ModuleWs(app);
    UserWs(app);
}