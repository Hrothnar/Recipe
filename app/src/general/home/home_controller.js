import { log } from "../../util/http_logger.js";

export function getHelloPage(request, response) {
    response.status(200);
    response.send("Hello World!");
    log(request, response);
};