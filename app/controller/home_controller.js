import { log } from "../util/http_logger.js";

export function showRequestParam(request, response) {
    response.send(request.params.vegetable);
    log(request, response);
};

export function showSimpleResponse(request, response) {
    response.send("You are at this page");
    log(request, response);
};

export function logBody(request, response) {
    console.log(request.body);
    console.log(request.query);
    response.send("Your data was received and collected");
    log(request, response);
};

export function showHelloWorld(request, response) {
    response.status(200);
    response.send("Hello World!");
    log(request, response);
};

export function showSentName(request, response) {
    const name = request.params.name;
    response.render("index", { name: name }, (error, html) => {
        error ? response.render("error") : response.status(200).send(html);
    });
    log(request, response);
}