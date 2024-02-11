import { Course } from "./course.js";
import { log } from "../../util/http_logger.js";

export function getCourseCreateForm() {

}

export function createCourse() {

}

export function getCourseEditForm() {

}

export function updateCourse() {

}

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

export function removeCourseById() {

}

export function getAllCourses() {

}

export function getCourseById() {

}
