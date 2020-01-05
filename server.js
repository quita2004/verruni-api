const express = require('express');
const config = require("./src/config");

const router = require("./src/routers");

async function startServer(){
    const app = express();

    app.use("/api", router);

    app.listen(config.port, err=>{
        if(err){
            console.error(err);
            process.exit(1);
        }

        console.log(`Server listening on port ${config.port}`);
    });
}

startServer();