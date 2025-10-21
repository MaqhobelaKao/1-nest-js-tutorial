import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller.controller";

@Module({
    imports: [],
    controllers: [UsersController],
    providers: [],
})
export class UserModule {}