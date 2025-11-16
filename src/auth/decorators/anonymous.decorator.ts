import { SetMetadata } from "@nestjs/common";

export function AllowAnonymous(): MethodDecorator {

    return SetMetadata('allowAnonymous', true);
}
