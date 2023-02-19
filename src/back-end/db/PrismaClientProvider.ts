
import { Provider } from "plume-ts-di";
import { Prisma, PrismaClient } from "../../../__generated__/prisma";

export class PrismaClientProvider implements Provider<PrismaClient>{
    private prismaClient: PrismaClient;

    constructor() {
        this.prismaClient = new PrismaClient();
    }

    get(): PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined> {
        return this.prismaClient;
    }
}