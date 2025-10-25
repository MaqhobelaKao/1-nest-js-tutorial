import { Module, forwardRef} from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./user.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [forwardRef(() => AuthModule)],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UserModule {}