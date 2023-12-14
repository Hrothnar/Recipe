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