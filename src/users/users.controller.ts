import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./user.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { PaginationDto } from "src/common/pagination/dto/pagination-query.dto";
import { Paginatited } from "src/common/pagination/paginated.interface";
import { User } from "./user.entity";
import { AuthorizeGuard } from "src/auth/guard/authorize.guard";


@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    
    @UseGuards(AuthorizeGuard)
    @Get()
    getUsers (@Query() paginationDto: PaginationDto): Promise<Paginatited<User>> {
        return this.usersService.getUsers(paginationDto);
    }

    @UseGuards(AuthorizeGuard)
    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id) {
        return this.usersService.findUserById(parseInt(id));
    }
    
    
    // @Post()
    // createUser(@Body() user: CreateUserDto)  {
    //     return this.usersService.createUser(user);
    // }

    @UseGuards(AuthorizeGuard)
    @Delete(':id')
    public deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id);
    }
    
}