const log = require("../util/util").log;

module.exports.sendRequestParam = sendRequestParam = (request, response) => {
    response.send(request.params.vegetable);
};

module.exports.sendSimpleResponse = sendSimpleResponse = (request, response) => {
    response.send("You are at this page");
};

module.exports.logBody = logBody = (request, response) => {
    console.log(request.body);
    console.log(request.query);
    log(request, response);
    response.send("Your data was received and collected");
};

module.exports.helloWorld = helloWorld = (request, response) => {
    response.status(200);
    response.send("Hello World!");
    log(request, response);
};

module.exports.sendName = sendName = (request, response) => {
    response.render("index", {"name": request.params.name}, (error, html) => {
        error ? response.render("error") : response.status(200).send(html);
    });
}