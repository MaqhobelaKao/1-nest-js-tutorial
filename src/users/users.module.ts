import { Module, forwardRef } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./user.service";
import { User } from "./user.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from "src/profile/profile.entity";
import { PaginationModule } from "src/common/pagination/pagination.module";
import { AuthorizeGuard } from "src/auth/guard/authorize.guard";
import { AuthModule } from "src/auth/auth.module";
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import authConfig from "src/auth/config/auth.config";

@Module({
    controllers: [UsersController],
    providers: [UsersService,  AuthorizeGuard],
    exports: [UsersService],
    imports: [
        TypeOrmModule.forFeature([User, Profile]), 
        PaginationModule, 
        forwardRef(() => AuthModule),
        JwtModule.registerAsync(authConfig.asProvider()),
        ConfigModule.forFeature(authConfig)
    ]
})
export class UserModule {}
