import { registerAs } from "@nestjs/config"

export default registerAs('appConfig', () => ({
    port: parseInt(process.env.PORT!, 10) || 3000,
    environment: process.env.NODE_ENV || 'production',
    jwtSecret: process.env.JWT_SECRET || 'defaultSecretKey',
}));