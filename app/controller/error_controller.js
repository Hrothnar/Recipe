module.exports.status500 = status500 = (error, request, response, next) => {
    console.error(error);
    const code = 500;
    response.status(code).send(code);
};

module.exports.status404 = status404 = (request, response, next) => {
    const code = 404;
    response.status(code).send(code);
    // response.sendFile("app/view/status404.html", {root: "./"});
    next();
};
