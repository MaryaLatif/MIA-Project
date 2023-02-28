import {User} from "./types/userType";

export class UserService {
    private user: User[] = [ {
        nip: 12200955,
        firstName: "Marya",
        lastName: "Latif",
        email: "latifmarya@gmail.com",
        password: "Papichulo.95120"
    }
    ]

    constructor() {}

    public getFullName(nip: number): string[]{ //renvoie le Nom Prénom
        const fullName: string[] = [];
        this.user.map((User) => {
            if(User.nip == nip){
                fullName.push(User.firstName, User.lastName);
            }
        })
        return fullName;
    }
    public getPassword(nip: number): string{ //renvoie le mdp (pour comparer avk ce qu'il a écrit quand l'user se co par ex)
       // @ts-ignore
        this.user.map((User) => {
           if(User.nip == nip){
               return User.password;
           }
       })
    }
    public getEmail(nip: number): string{ //renvoie le mail pour comparer avk le mail écrit quand l'user se co
        this.user.map((User) => {
            if(User.nip == nip){
                return User.email;
            }
        })
    }
    public getAllNip(): number[]{ //donner la liste des nip pour vérifier si celui de l'user est dedans
        const nipList: number[] = [];
        this.user.map((User) => {
            nipList.push(User.nip);
        })
        return nipList;
    }

}