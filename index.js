const express = require("express");
const log = require("./app/util/util").log;

const server = express();

const port = 3000;

server.get("/", (request, response) => {
    response.status(200);
    response.send("Hello World!");
    log(request, response);
});

server.listen(port, () => {
    console.log(`The express.js server has started and is listening on port: ${port}`);
});