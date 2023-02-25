// import { PrismaClient, User } from "../../../../../__generated__/prisma";

// /**
//  * Allow to manipulate the user table
//  */
// export class UserDao {

//     constructor(private readonly prismaClient: PrismaClient) { }

//     async searchByName(userName: string): Promise<User | null>  {
//         return this.prismaClient.user.findFirst({
//             where: {
//                 userName: userName
//             }
//         })
//     }
// }