const express = require("express");
const homeController = require("./app/controller/home_controller");
const expressLayout = require("express-ejs-layouts");
const errorController = require("./app/controller/error_controller");
const mongoose = require("mongoose");
const Subscriber = require("./app/model/subscriber").Subscriber;
const subscriberController = require("./app/controller/subscriber_controller");
const cors = require("cors");
require("dotenv").config();

const port = 3000;

const eUsername = encodeURIComponent(process.env.MONGO_USERNAME);
const ePassword = encodeURIComponent(process.env.MONGO_PASSWORD);

const uri = `mongodb+srv://${eUsername}:${ePassword}@ecluster.rfacqfw.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri, {
    dbName: "recipe"
}).then(() => console.log("Successefully connected to MongoDB using Mongoose"));

// const db = mongoose.connection;

// new Subscriber({
//     name: "Todd Wilson",
//     email: "todd@mail.com"
// }).save();

// Subscriber.create({
//     name: "Todd Wilson",
//     email: "todd@mail.com"
// });

// Subscriber.findOne({ name: "Todd Wilson" })
//     .where("email", /todd/)
//     .then((value) => console.log(value));

// Subscriber.deleteMany({})
//     .where("email", /t/)
//     .then((value) => console.log(value));

const app = express();

app.set("port", 3000);
app.set("view engine", "ejs");
app.set("views", __dirname + "/app/view");

app.use(cors());
// app.use((req, res, next) => {
//     res.setHeader("Content-Security-Policy", "connect-src http://127.0.0.1:3000");
//     next();
// });

app.use(express.json());
app.use(expressLayout);
app.use(express.urlencoded({ extended: false }));

app.get("/", homeController.helloWorld);
app.get("/item/:vegetable", homeController.sendRequestParam);
app.get("/name/:name", homeController.sendName);

// app.get("/sub", subscriberController.showAllSubscribers, (request, response, next) => {
//     response.send(request.data);
//     // next();
// });

app.get("/sub", subscriberController.showAllSubscribers, subscriberController.doNextStuff);

app.get("/sub", subscriberController.showAllSubscribers);
app.post("/", homeController.logBody);
app.delete("/sub", subscriberController.removeAll);
app.post("/sub", subscriberController.addSubscriber);
app.get("/contact", subscriberController.showCreationForm);
app.get("/ran", subscriberController.randomFill);

app.use(errorController.status404);
app.use(errorController.status500);

app.listen(port, () => {
    console.log(`The express.js server has started and is listening on port: ${app.get("port")}`);
});