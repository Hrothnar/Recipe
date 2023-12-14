module.exports.log = (request, response) => {
    console.log(`-------------------------------------\nMethod: ${request.method}   URL: ${request.url}   Status Code: ${response.statusCode}\n-------------------------------------`);
};