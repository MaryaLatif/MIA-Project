
import { Injector } from "plume-ts-di";
import { PrismaClient } from "../../../__generated__/prisma";
import { UserDao } from "./dao/userDao/UserDao";
import { PrismaClientProvider } from "./PrismaClientProvider";

export function registerDbModule(injector: Injector) {
    injector.registerSingletonProvider(PrismaClientProvider, PrismaClient);
    injector.registerSingleton(UserDao);
}