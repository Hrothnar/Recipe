htmlContentType = {
    "Content-Type": "text/html"
};

routes = {
    GET: {},
    POST: {},
    PATCH: {},
    PUT: {},
    DELETE: {}
};

module.exports.handle = (request, response) => {
    try {
        if (routes[request.method][request.url]) {
            routes[request.method][request.url](request, response);
        } else {
            response.writeHead(404, htmlContentType);
            response.end("<h1>Page not found</h1>");
        }
    } catch (error) {
        console.log("Error: " + error);
    }
};

module.exports.get = (url, callback) => {
    routes["GET"][url] = callback;
};

module.exports.post = (url, callback) => {
    routes["POST"][url] = callback;
};

// setTimeout(() => console.log(routes), 1000);