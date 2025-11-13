import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider implements HashingProvider {
    
    public async hashPassword(data: string | Buffer): Promise<string> {
        // create a salt
        const salt = await bcrypt.genSalt();

        // hash the passoerd with the salt
        return bcrypt.hash(data, salt);
    }
    comparePassword(data: string | Buffer, hashedData: string | Buffer): Promise<boolean> {
        return bcrypt.compare(data, hashedData);
    }
}
