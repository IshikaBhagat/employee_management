import * as joi from 'joi';


export default joi.object({
    NODE_ENV:joi.string()
    .valid('development','test','staging','production')
    .default('development')
})