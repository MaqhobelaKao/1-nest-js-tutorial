import { Body, Controller, DefaultValuePipe, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Query, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./user.service";
import { log } from "console";
import { CreateUserDto } from "./dtos/create-user.dto";
import { GetUserParamDto } from "./dtos/get-user-param.dto";

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    
    @Get(':isMarried')
    getUsers (@Query('limit', 
                new DefaultValuePipe(10), ParseIntPipe) limit: number, 
                @Query('page',new DefaultValuePipe(1), ParseIntPipe) page: number,
                @Param() param: GetUserParamDto
            ) 
                {
        log(param);
        return this.usersService.getUsers();
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id) {
        return this.usersService.getUserById(parseInt(id));
    }
    
    
    @Post()
    createUser(@Body() user: CreateUserDto)  {
        log(user instanceof CreateUserDto);
        return 'User created successfully';
        // this.usersService.createUser(req.body)
    }
}