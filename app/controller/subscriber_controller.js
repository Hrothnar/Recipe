const mongoose = require("mongoose");
const Subscriber = require("../model/subscriber").Subscriber;

// module.exports.showAllSubscribers = showAllSubscribers = (request, response) => {
//     Subscriber.find()
//         .then((value) => {
//             response.send(value);
//         })
//         .catch((error) => console.log(error));
// };

module.exports.showAllSubscribers = showAllSubscribers = (request, response, next) => {
    Subscriber.find()
        .then((value) => {
            request.data = value;
            next();
        })
        .catch((error) => next(error))
};

module.exports.doNextStuff = doNextStuff = (request, response) => { // final middleware in the chain
    response.status(200);
    response.send(request.data);
};

module.exports.removeAll = removeAll = (request, response) => {
    Subscriber.deleteMany({})
        .then((value) => {
            response.send("Count of removed records:", value);
        });
};