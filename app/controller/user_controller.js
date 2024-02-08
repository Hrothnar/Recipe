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

export function redirectAfterCreation(request, response) {
    response.status(300);
    response.redirect(response.locals.redirect);
};

export function findUser(request, response, next) {
    const id = request.params.id;
    User.findOne({ _id: id })
        .then((user) => {
            response.locals.user = user; // this action allows not to use this parameter directly in the render() function in the next middleware
            next();
            log(request, response);
        })
        .catch((error) => {
            next(error);
        })
};

export function showAfterFinding(request, response) {
    response.status(200);
    response.render("user/show", (error, html) => {
        if (error) {
            throw error;
        }
        response.send(html);
    })
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