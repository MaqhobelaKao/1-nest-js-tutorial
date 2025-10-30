import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./user.service";
import { User } from "./user.entity";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
    imports: [TypeOrmModule.forFeature([User])]
})
export class UserModule {}
