import { HttpException, HttpStatus } from "@nestjs/common";

export class UserNotFoundException extends HttpException {
    constructor(status: number) {
        super(`User with with this crendetials not found.`, HttpStatus.NOT_FOUND);
    }
}