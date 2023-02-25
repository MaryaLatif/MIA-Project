
import { Express } from 'express';
import { ExempleWs } from './exemple/ExempleWs';

/**
 * Register the web-services for the api.
 * @param app 
 */
export function registerWebServices(app: Express) {
    ExempleWs(app);
}