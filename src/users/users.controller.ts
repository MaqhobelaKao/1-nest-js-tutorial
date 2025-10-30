import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { UsersService } from "./user.service";
import { CreateUserDto } from "./dtos/create-user.dto";


@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    
    
    @Get('')
    getUsers (@Query('limit', 
                new DefaultValuePipe(10), ParseIntPipe) limit: number, 
                @Query('page',new DefaultValuePipe(1), ParseIntPipe) page: number,
            ) 
                {
        return this.usersService.getUsers();
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id) {
        return this.usersService.getUserById(parseInt(id));
    }
    
    
    @Post()
    createUser(@Body() user: CreateUserDto)  {
        return this.usersService.createUser(user);
    }
    
}