import { User } from "./user.js";
import { Subscriber } from "../subscriber/subscriber.js";
import { log } from "../../util/http_logger.js";

export function getUserCreateForm(request, response) {
    response.render("user/new", (error, html) => {
        if (error) {
            throw error;
        }
        response.status(200);
        response.send(html);
        log(request, response);
    })
};

export function createUser(request, response, next) {
    User.create({
        name: {
            first: request.body.firstName,
            last: request.body.lastName
        },
        email: request.body.email,
        password: request.body.password,
        zipCode: request.body.zipCode
    })
        .then((user) => {
            response.locals.redirect = "/user";
            // response.locals.user = user;
            next();
        })
        .catch((error) => {
            console.log("Does user exist already? --> Do some logic!")
            next(error);
            log(request, response);
        });
};

export function getUserEditForm(request, response, next) {
    const id = request.params.id;
    User.findById(id)
        .then((user) => {
            response.render("user/edit", { user: user }, (error, html) => {
                if (error) {
                    next(error);
                }
                response.status(200);
                response.send(html);
            });
        })
        .catch((error) => {
            next(error);
        });
};

export function updateUser(request, response, next) {
    const id = request.params.id;
    const userParams = {
        name: {
            first: request.body.firstName,
            last: request.body.lastName
        },
        email: request.body.email,
        password: request.body.password,
        zipCode: request.body.zipCode
    };
    User.findByIdAndUpdate(id, { $set: userParams })
        .then((user) => {
            response.locals.redirect = `/user/${id}`;
            response.locals.user = user;
            next();
        })
        .catch((error) => {
            next(error);
        });
};

export function removeAllUsers() {

}

export function removeUserById(request, response, next) {
    const id = request.params.id;
    User.findOneAndDelete({ _id: id })
        .then(() => {
            response.locals.redirect = "/user/index";
            next();
            log(request, response);
        })
        .catch((error) => {
            next(error);
        });
};

export function getAllUsers(request, response, next) {
    User.find({})
        .then((users) => {
            response.render("user/index", { users: users }, (error, html) => {
                if (error) {
                    next(error);
                }
                response.locals.users = users;
                next();
            })
        })
        .catch((error) => {
            next(error);
        })
        .finally(() => {
            log(request, response);
        })
};

/**
 * A second middleware for getAllUsers() function.
 * @param {*} request 
 * @param {*} response 
 */
export function showAllUsers(request, response) {
    response.status(200);
    response.render("user/index", (error, html) => {
        if (error) {
            throw error;
        }
        response.send(html);
    });
};

export function getUserById(request, response, next) {
    const id = request.params.id;
    User.findOne({ _id: id })
        .then((user) => {
            // this action allows to use this parameter directly in the .ejs file 
            // without using in the render() function in the next middleware
            response.locals.user = user;
            next();
            log(request, response);
        })
        .catch((error) => {
            next(error);
        });
};

/**
 * A second middleware for getUser() function.
 * @param {*} request 
 * @param {*} response 
 */
export function showUserById(request, response) {
    response.status(200);
    response.render("user/show", (error, html) => {
        if (error) {
            throw error;
        }
        response.send(html);
    });
};

/**
 * A helping middleware for reducing code repetition.
 * @param {*} request 
 * @param {*} response 
 */
export function showRedirectedView(request, response) {
    response.status(300);
    response.redirect(response.locals.redirect);
};