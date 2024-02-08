import express from "express";
import expressLayout from "express-ejs-layouts";
import cors from "cors";
import Mongoose from "mongoose";
import dotent from "dotenv";

import * as homeController from "./app/controller/home_controller.js";
import * as subscriberController from "./app/controller/subscriber_controller.js";
import * as courseController from "./app/controller/course_controller.js";
import * as userController from "./app/controller/user_controller.js";
import * as errorHandler from "./app/error/error_handler.js";

dotent.config();
const app = express();
const router = express.Router();

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
// app.use(expressLayout);
app.use(express.urlencoded({ extended: false }));
app.use("/", router);

router.get("/", homeController.showHelloWorld);
router.get("/item/:vegetable", homeController.showRequestParam);
router.get("/name/:name", homeController.showSentName);
router.get("/contact", subscriberController.showCreationForm);
router.get("/populate", subscriberController.addSomeSubs);
router.get("/course/create", courseController.createCourse);
router.get("/sub/associate", subscriberController.associateSubWithCourse);
router.get("/sub/assd", subscriberController.showOneSubWithCourse);
router.get("/user/create", userController.createSomeUser);
router.get("/user/associate", userController.associateWithSub);
router.get("/sub/index", subscriberController.index, subscriberController.indexView);
router.get("/user/index", userController.index, userController.indexView);
router.get("/user/new", userController.showUserForm);
router.get("/user/:id", userController.findUser, userController.showAfterFinding);

router.post("/", homeController.logBody);
router.post("/sub", subscriberController.addSub);
router.post("/user/create", userController.createUser, userController.redirectAfterCreation);

router.delete("/sub", subscriberController.removeAllSubs);
router.delete("/course", courseController.removeAllCourses)

router.use(errorHandler.status404);
router.use(errorHandler.status500);

app.listen(port, () => {
    console.log("\n=================================================================");
    console.log(`The express.js server has started and is listening on port: ${app.get("port")}`);
});

Mongoose.connect(URI, {
    dbName: dbName
})
    .then(() => {
        console.log("Successefully connected to MongoDB using Mongoose")
        console.log("=================================================================");
    });