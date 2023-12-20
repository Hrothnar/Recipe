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
    // response.send(request.data);
    response.render("subscriber", { subscribers: request.data }, (error, html) => {
        if (error) throw error;
        response.status(200);
        response.send(html);
    });
};

module.exports.removeAll = removeAll = (request, response) => {
    Subscriber.deleteMany({})
        .then((value) => {
            response.status(204);
            response.send(`Quantity of removed records: ${value}`);
        });
};

module.exports.showCreationForm = showCreationFrom = (request, response) => {
    response.render("contact", (error, html) => {
        if (error) throw error;
        response.status(200);
        response.send(html);
    })
};

module.exports.addSubscriber = addSubscriber = (request, response) => {
    const name = request.body.name;
    const email = request.body.email;
    const zipCode = request.body.zipCode;
    Subscriber.create({
        name,
        email,
        zipCode
    })
        .then((value) => {
            console.log(value);
            response.status(200);
            response.sendFile("app/view/thanks.html", {root: "./"});
        })
        .catch((error) => {
            console.log(error);
        });
};