import { Express } from 'express';

/**
 * Exemple de web service avec un endpoint post et get
 * @param app 
 */
export function ExempleWs(app: Express) {
    const baseUrl = '/api/exemple-ws';

    app.get(`${baseUrl}/get`, (_, response) => {
        response.send("Exemple get WS successful ")
    });

    app.post(`${baseUrl}/post`, (_, response) => {
        response.send("Exemple post WS successful ")
    });
}