import { Injectable } from "@nestjs/common";
import { get } from "http";

@Injectable()
export class UsersService {
    private users: {id: number, name: string, age: number, gender: string, isMarried: boolean}[] = [
        {id: 1,name: 'Kao', age: 23, gender: 'f', isMarried: true},
        {id:2, name: 'Lereko', age: 12, gender: 'M', isMarried: false},
    ];

    constructor() {}

    getUsers() {    
        return this.users;
    }

    getUserById(id: number) {
        return this.users.find(user => user.id === id);
    }

    createUser(user: {id: number, name: string, age: number, gender: string, isMarried: boolean}) {
        this.users.push(user);
    }
}