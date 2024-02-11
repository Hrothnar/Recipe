export function createPreBuildCourse(request, response) {
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

export function createPreBuildSubs(request, response, next) {
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

export function showRequestParam(request, response) {
    response.send(request.params.vegetable);
    log(request, response);
};

export function showSimpleResponse(request, response) {
    response.send("You are at this page");
    log(request, response);
};

export function logBody(request, response) {
    console.log(request.body);
    console.log(request.query);
    response.send("Your data was received and collected");
    log(request, response);
};

export function showSentName(request, response) {
    const name = request.params.name;
    response.render("index", { name: name }, (error, html) => {
        error ? response.render("error") : response.status(200).send(html);
    });
    log(request, response);
}