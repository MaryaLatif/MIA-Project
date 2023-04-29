import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import {registerWebServices} from './webservices/ws-modules';
import {Logger} from 'simple-logging-system';
import {Injector} from 'plume-ts-di';
// import { registerDbModule } from './back-end/db/db-module';
import {registerServices} from './services/services-module';
import path from 'path';
// import { PrismaClient } from './../__generated__/prisma';
const logger = new Logger('index');

logger.info("Fetching server configuration.");
dotenv.config();

logger.info("Creating express server.");
const app = express();
const port = process.env.PORT;

logger.info("Setting express middleware.");
app.use(express.json())
app.use(express.static(__dirname + '/../src/app/'));

logger.info("Registering modules.");
const injector = new Injector();
// registerDbModule(injector);
registerServices(injector);
registerWebServices(app);

// logger.info("Connecting to the database...");
//   injector.getInstance(PrismaClient).$connect()
//   .then(()=> {
//     logger.info("Connected to the database.");
//   })
//   .catch((e)=>{
//     logger.error("failled to connect to the database", {e});
//   });

app.listen(port, () => {
    logger.info(`⚡️[server]: Server is running at http://localhost:${port}`);
});