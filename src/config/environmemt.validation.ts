import * as joi from 'joi';

export default joi.object({
  NODE_ENV: joi
    .string()
    .valid('development', 'test', 'staging', 'production')
    .default('development'),
  // DATABASE_PORT: joi.number().port().default(5432),
  // DATABASE_PASSWORD:joi.string().required()
});
