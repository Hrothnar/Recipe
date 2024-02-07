import { Course } from "../model/course.js";
import { log } from "../util/http_logger.js";

export function createCourse(request, response) {
    Course.create({
        title: "Sweet potato",
        description: "Something tasty",
        items: ["milk", "potato", "spices"],
        zipCode: "94251"
    })
    .then((value) => {
        response.status(200);
        response.sendFile("app/view/thanks.html", { root: "./" });
        log(request, response);
    })
    .catch((error) => {
        console.log(error);
    });
};

export function removeAllCourses(request, response) {
    Course.deleteMany({})
    .then((value) => {
        response.status(204);
        response.send(`Quantity of removed records: ${value}`);
        log(request, response);
    })
    .catch((error) => {
        throw error;
    });
};