import { User } from "../model/user.js";
import { Subscriber } from "../model/subscriber.js";
import { log } from "../util/http_logger.js";

export function index(request, response, next) {
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

export function indexView(request, response) {
    response.status(200);
    response.render("user/index", (error, html) => {
        if (error) {
            throw error;
        }
        response.send(html);
    });
};

export function showUserForm(request, response) {
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
            response.locals.redirect = "/user/index";
            // response.locals.user = user;
            next();
        })
        .catch((error) => {
            console.log("Does user exist already? --> Do some logic!")
            next(error);
            log(request, response);
        });
};

export function redirectView(request, response) {
    response.status(300);
    response.redirect(response.locals.redirect);
};

export function findUser(request, response, next) {
    const id = request.params.id;
    User.findOne({ _id: id })
        .then((user) => {
            // this action allows to use this parameter directly in the .ejs file without using in the render() function in the next middleware
            response.locals.user = user;
            next();
            log(request, response);
        })
        .catch((error) => {
            next(error);
        });
};

export function showAfterFinding(request, response) {
    response.status(200);
    response.render("user/show", (error, html) => {
        if (error) {
            throw error;
        }
        response.send(html);
    });
};

export function showEditForm(request, response, next) {
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

export function removeUser(request, response, next) {
    const id = request.params.id;
    User.findOneAndDelete({_id: id})
        .then(() => {
            response.locals.redirect = "/user/index";
            next();
            log(request, response);
        })
        .catch((error) => {
            next(error);
        });
};

export function createSomeUser(request, response) {
    User.create({
        name: {
            first: "Riddik",
            last: "Dizelevich"
        },
        email: "riddik@mail.com",
        password: "coolguy",
    })
        .then((user) => {
            response.status(200);
            response.send(`The ${user} has been created`);
            log(request, response);
        })
        .catch((error) => {
            throw error;
        });
};

export async function associateWithSub(request, response, next) {
    try {
        const user = await User.findOne({ email: "riddik@mail.com" });
        let sub = await Subscriber.findOne({ email: "riddik@mail.com" });
        user.subscriberAccount = sub;
        sub = await user.save();
        response.status(200);
        response.send(sub);
        log(request, response);
    } catch (error) {
        next(error);
    }
};