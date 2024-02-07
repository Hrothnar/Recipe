import { User } from "../model/user.js";
import { Subscriber } from "../model/subscriber.js";
import { log } from "../util/http_logger.js";

export function index(request, response) {
    User.find({})
        .then((users) => {
            response.render("user/index", { users: users }, (error, html) => {
                if (error) {
                    response.redirect("/");
                    throw error;
                }
                response.status(200);
                response.send(html);
                log(request, response);
            })
        })
        .catch((error) => {
            throw error;
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