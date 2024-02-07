import express from "express";
import expressLayout from "express-ejs-layouts";
import cors from "cors";
import mongoose from "mongoose";
import dotent from "dotenv";

import * as homeController from "./app/controller/home_controller.js";
import * as subscriberController from "./app/controller/subscriber_controller.js";
import * as courseController from "./app/controller/course_controller.js";
import * as errorHandler from "./app/error/error_handler.js";

dotent.config();
const app = express();

const username = encodeURIComponent(process.env.MONGO_USERNAME);
const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const dbName = process.env.MONGO_DATABASE_NAME
const uri = process.env.MONGO_URI;
const port = process.env.PORT;
const URI = `mongodb+srv://${username}:${password}@${uri}`;

app.set("port", 3000);
app.set("view engine", "ejs");
app.set("views", import.meta.dirname + "/app/view");

app.use(cors());
app.use(express.json());
app.use(expressLayout);
app.use(express.urlencoded({ extended: false }));

app.get("/", homeController.showHelloWorld);
app.get("/item/:vegetable", homeController.showRequestParam);
app.get("/name/:name", homeController.showSentName);
app.get("/sub", subscriberController.showAllSubsPart1, subscriberController.showAllSubsPart2);
app.get("/contact", subscriberController.showCreationForm);
app.get("/populate", subscriberController.addSomeSubs);
app.get("/course/create", courseController.createCourse);
app.get("/sub/associate", subscriberController.associateSubWithCourse);
app.get("/sub/assd", subscriberController.showOneSubWithCourse);

app.post("/", homeController.logBody);
app.post("/sub", subscriberController.addSub);

app.delete("/sub", subscriberController.removeAllSubs);
app.delete("/course", courseController.removeAllCourses)

app.use(errorHandler.status404);
app.use(errorHandler.status500);

app.listen(port, () => {
    console.log("\n=================================================================");
    console.log(`The express.js server has started and is listening on port: ${app.get("port")}`);
});

mongoose.connect(URI, {
    dbName: dbName
})
.then(() => {
    console.log("Successefully connected to MongoDB using Mongoose")
    console.log("=================================================================");
});