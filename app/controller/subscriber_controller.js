import { Subscriber } from "../model/subscriber.js";
import { Course } from "../model/course.js";
import { log } from "../util/http_logger.js";

export function index(request, response, next) {
    Subscriber.find({})
        .then((value) => {
            request.data = value;
            next();
        })
        .catch((error) => {
            next(error)
        })
};

/**
 * Final middleware in the chain
 */
export function indexView(request, response) {
    response.render("subscriber/index", { subscribers: request.data }, (error, html) => {
        if (error) {
            throw error;
        }
        response.status(200);
        response.send(html);
        log(request, response);
    });
};

export function removeAllSubs(request, response) {
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

export function showCreationForm(request, response) {
    response.render("contact", (error, html) => {
        if (error) {
            throw error;
        }
        response.status(200);
        response.send(html);
        log(request, response);
    })
};

export function addSub(request, response) {
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

export function addSomeSubs(request, response, next) {
    const subcribers = [];
    const creation = [];

    subcribers.push({
        name: "Tom",
        email: "tom@mail.com",
        zipCode: 55555
    });

    subcribers.push({
        name: "Boris",
        email: "boris@mail.com",
        zipCode: 44444
    });

    subcribers.push({
        name: "Riddik",
        email: "riddik@mail.com",
        zipCode: 33333
    });

    subcribers.forEach((sub) => {
        creation.push(Subscriber.create({
            name: sub.name,
            email: sub.email,
            zipCode: sub.zipCode
        }));
    });

    Promise.all(creation)
        .then((value) => {
            response.status(200);
            response.send("Subcribers have been created");
            log(request, response);
        })
        .catch((error) => {
            console.log(error)
            next(error);
        });
};

export function associateSubWithCourse(request, response) {
    Subscriber.findOne({})
        .then((sub) => {
            Course.findOne({})
                .then((course) => {
                    sub.courses.push(course);
                    sub.save()
                        .then((value) => {
                            response.send(`Subscriber ${sub.name} is associated with course ${course.title} now`);
                            console.log(`Subscriber ${sub.name} is associated with course ${course.title} now`);
                            log(request, response);
                            console.log(value.courses);
                        })
                        .catch((error) => {
                            throw error;
                        });
                })
                .catch((error) => {
                    throw error;
                });
        })
        .catch((error) => {
            console.log(error)
            next(error);
        });
};

export function showOneSubWithCourse(request, response) {
    Subscriber.findOne({ courses: { $exists: true, $ne: [] } })
        .populate("courses")
        .then((sub) => {
            response.status(200);
            response.send(sub);
            log(request, response);
        })
        .catch((error) => {
            throw error;
        });
};