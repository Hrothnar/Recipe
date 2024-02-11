import { Subscriber } from "./subscriber.js";
import { Course } from "../course/course.js";
import { log } from "../../util/http_logger.js";

export function getSubscriberCreateForm(request, response) {
    response.render("contact", (error, html) => {
        if (error) {
            throw error;
        }
        response.status(200);
        response.send(html);
        log(request, response);
    })
};

export function createSubscriber(request, response) {
    Subscriber.create({
        name: request.body.name,
        email: request.body.email,
        zipCode: request.body.zipCode
    })
        .then((value) => {
            response.status(200);
            response.sendFile("app/view/thanks.html", { root: "./" });
            console.log(value.getInfo());
            log(request, response);
        })
        .catch((error) => {
            console.log(error);
        });
};

export function getSubscriberEditForm() {

}

export function updateSubcriber() {

}

export function removeAllSubscribers(request, response) {
    Subscriber.deleteMany({})
        .then((value) => {
            response.status(204);
            response.send(`Quantity of removed records: ${value}`);
            log(request, response);
        })
        .catch((error) => {
            throw error;
        });
};

export function removeSubscriberById() {

}

export function getAllSubscribers(request, response, next) {
    Subscriber.find({})
        .then((subcribers) => {
            response.render("subscriber/index", { subscribers: subcribers }, (error, html) => {
                if (error) {
                    throw error;
                }
                response.status(200);
                response.send(html);
                log(request, response);
            });
        })
        .catch((error) => {
            next(error)
        })
};

export function getSubscriberById() {
    
}



