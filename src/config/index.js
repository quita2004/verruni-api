const dotenv = require("dotenv");

const envFound = dotenv.config();

if(!envFound){
    throw new Error("Couldn't find .env file");
}

module.exports = {
    port: parseInt(process.env.PORT, 10),

    db: {
        name: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        dialect:  process.env.DB_DIALECT
    }
    
}