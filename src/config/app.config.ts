export const appConfig = () => {
    return{
        port: parseInt(process.env.PORT!, 10) || 3000,
        environment: process.env.NODE_ENV || 'production',
        database: {
            type: process.env.DATABASE_TYPE,
            host: process.env.DATABASE_HOST! ,
            port: parseInt(process.env.DATABASE_PORT!, 10),
            username: process.env.DATABASE_USERNAME ,
            password: process.env.DATABASE_PASSWORD ,
            name: process.env.DATABASE_NAME,
            synchorize: process.env.DATABASE_SYNCHRONIZE === 'true'? true : false,
            autoLoadEntities: process.env.AUTO_LOAD === 'true'? true : false,
        },
        jwtSecret: process.env.JWT_SECRET || 'defaultSecretKey',
    }
}