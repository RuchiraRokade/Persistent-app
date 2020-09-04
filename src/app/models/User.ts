export class User {
    id?: number;
    name?: string;
    email: string;
    password: string;
    /**
     *
     */
    constructor(email: string, password: string, name?: string, id?: number) {
        this.email = email;
        this.name = name;
        this.password = password;
        this.id = id;
    }
}
