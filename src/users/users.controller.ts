import { Controller, Delete, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { UsersService } from "./user.service";
import { PaginationDto } from "src/common/pagination/dto/pagination-query.dto";
import { Paginatited } from "src/common/pagination/paginated.interface";
import { User } from "./user.entity";

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get()
    getUsers (@Query() paginationDto: PaginationDto): Promise<Paginatited<User>> {
        return this.usersService.getUsers(paginationDto);
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id) {
        return this.usersService.findUserById(parseInt(id));
    }
    
    
    // @Post()
    // createUser(@Body() user: CreateUserDto)  {
    //     return this.usersService.createUser(user);
    // }

    
    @Delete(':id')
    public deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id);
    }
    
}