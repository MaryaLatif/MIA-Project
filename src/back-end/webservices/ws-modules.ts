
import { Express } from 'express';
import { ExempleWs } from './exemple/ExempleWs';
import { ModuleWs } from './module/ModuleWs';
/**
 * Register the web-services for the api.
 * @param app 
 */
export function registerWebServices(app: Express) {
    ExempleWs(app);
    ModuleWs(app);
}