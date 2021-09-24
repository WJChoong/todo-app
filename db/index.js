const dotenv = require('dotenv');

const loadFromEnvironmentVariables = () => {
    const {
        DB_HOST,
        DB_PORT,
        DB_USERNAME,
        DB_PASSWORD,
        DB_DATABASE,
    } = process.env;
    return{
        DB_HOST,
        DB_PORT,
        DB_USERNAME,
        DB_PASSWORD,
        DB_DATABASE,
    };
};

let envs = {};

try{
    
    const result = dotenv.config();
    if (result.error){
        throw result.error;
    }
    const { parsed } = result;
    envs = parsed;

}catch(err){

    console.log(err);
    envs = loadFromEnvironmentVariables();

}

module.exports = envs;