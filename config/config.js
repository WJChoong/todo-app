require('dotenv').config(); // import the env file

// assign details into each variables
const username = process.env.NAME;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
const host = process.env.HOST;
const node_env = process.env.NODE_ENV;

// declare the environment for different purpose
const config = {

    // development environment
    dev:{
        // include all the details of connection
        db:{
            username,
            password,
            database,
            host
        }
    },

    // test environment
    test:{},

    // production environmnt
    prod:{}
};

module.exports = config[node_env];