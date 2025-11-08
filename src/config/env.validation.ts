import * as Joi from 'joi';

export default Joi.object({
    PORT: Joi.number().default(3000),
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', )
        .default('production'),
    JWT_SECRET: Joi.string().default('defaultSecretKey'),
    SECRET_KEY: Joi.string().required(),

    // database configurations for postgresql database
    DATABASE_TYPE: Joi.string().valid('postgres').required(),
    DATABASE_HOST: Joi.string().default('localhost').required(),
    DATABASE_PORT: Joi.number().default(5432),
    DATABASE_USERNAME: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().allow('').required(),
    DATABASE_NAME: Joi.string().required(),

});