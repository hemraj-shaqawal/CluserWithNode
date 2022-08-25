const express = require("express");
const os = require("os");
const cluster = require("cluster");
const app = express();
const numOfCPU = os.cpus().length;


app.get("/",(req,res) => {
    for (let i=0;i<1e8;i++) { 
    }
    res.status(200).send(`ok ${process.pid}`)
});


if(cluster.isMaster){
    for(let i=0; i<numOfCPU; i++) { 
        cluster.fork();
    } 

    cluster.on('exit', (worker,code,signal) => {
        console.log(`worker died ${worker.process.pid}`)
        cluster.fork();
    })

} else {  
    app.listen(3000,() => {
        console.log("app is running on " +process.pid)
    })
} 

