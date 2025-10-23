import { Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import { UsersService } from "./user.service";
import { log } from "console";

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get()
    getUsers (@Query('limit', 
                    new DefaultValuePipe(10), ParseIntPipe) limit: number, 
                @Query('page',new DefaultValuePipe(1), ParseIntPipe) page: number
            ) 
                {
        log(limit, page);
        return this.usersService.getUsers();
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id) {
        return this.usersService.getUserById(parseInt(id));
    }
    
    
    @Post()
    createUser(req: Request, res: Response)  {
        // this.usersService.createUser(req.body)
    }
}