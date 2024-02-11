const fs = require("fs");
const http = require("http");
const router = require("./route");

const port = 3000;

function sendErrorResponse(response) {
    response.writeHead(200, { "content-type": "text/html" })
    response.write("<h1>This page not found</h1>");
    response.end();
}

htmlContentType = {
    "Content-Type": "text/html"
};

plainTextContentType = {
    "Content-Type": "text/plain"
};


router.get("/", (request, response) => {
    response.writeHead(200, plainTextContentType);
    response.end("INDEX");
});


router.get("/index.html", (request, response) => {
    response.writeHead(200, plainTextContentType);
    fs.readFile("./index.html", (error, data) => {
        if (error) console.log("Error:", error);
        if (data) {
            response.write(data);
            response.end();
        }
    });
});

router.get("/info", (request, response) => {
    response.writeHead(200, {
        "Content-Type": "text/plain"
    })
    response.end("Welcome to the Info Page")
});

router.post("/", (request, response) => {
    response.writeHead(200, plainTextContentType);
    response.end("POSTED");
});

http.createServer(router.handle).listen(port, "127.0.0.1");

console.log(`The server has started and is listening on port: ${port}`);

