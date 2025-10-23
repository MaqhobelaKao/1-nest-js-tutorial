import { Controller, Get, Param, Post, Query } from "@nestjs/common";
import { UsersService } from "./user.service";
import { log } from "console";

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get()
    getUsers (@Query() query: any) {
        const { gender, isMarried } = query;
        if(gender){
            return this.usersService.getUsers().filter(user => user.gender === gender)
        }
        return this.usersService.getUsers();
    }

    @Get(':id')
    getUserById(@Param() param) {
       var { id }  = param;
        return this.usersService.getUserById(parseInt(id));
    }
    
    
    @Post()
    createUser(req: Request, res: Response)  {
        // this.usersService.createUser(req.body)
    }
}