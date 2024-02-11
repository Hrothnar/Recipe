import express from "express";
import expressLayout from "express-ejs-layouts";
import cors from "cors";
import Mongoose from "mongoose";
import dotent from "dotenv";
import methodOverride from "method-override";

import * as homeController from "./app/src/general/home/home_controller.js";
import * as subscriberController from "./app/src/component/subscriber/subscriber_controller.js";
import * as courseController from "./app/src/component/course/course_controller.js";
import * as userController from "./app/src/component/user/user_controller.js";
import * as errorHandler from "./app/src/error/error_handler.js";

dotent.config();
const app = express();
const router = express.Router();

const username = encodeURIComponent(process.env.MONGO_USERNAME);
const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const dbName = process.env.MONGO_DATABASE_NAME;
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
app.use(methodOverride("_method", ["POST", "GET"])); //must be before app.use("/", router); 
app.use("/", router);

router.get("/", homeController.getHelloPage);

router.get("/user/create", userController.getUserCreateForm);
router.post("/user/create", userController.createUser, userController.showRedirectedView);
router.get("/user/:id/edit", userController.getUserEditForm);
router.put("/user/:id/edit", userController.updateUser, userController.showRedirectedView);
router.delete("/user", userController.removeAllUsers);
router.delete("/user/:id", userController.removeUserById, userController.showRedirectedView);
router.get("/user", userController.getAllUsers, userController.showAllUsers);
router.get("/user/:id", userController.getUserById, userController.showUserById);

router.get("/sub/create", subscriberController.getSubscriberCreateForm);
router.post("/sub/create", subscriberController.createSubscriber);
router.get("/sub/:id/edit", subscriberController.getSubscriberEditForm);
router.put("/sub/:id/edit", subscriberController.updateSubcriber);
router.delete("/sub", subscriberController.removeAllSubscribers);
router.delete("/sub/:id", subscriberController.removeSubscriberById);
router.get("/sub", subscriberController.getAllSubscribers);
router.get("/sub/:id", subscriberController.getSubscriberById);

router.get("/course/create", courseController.getCourseCreateForm);
router.post("/course/create", courseController.createCourse);
router.get("/course/:id/edit", courseController.getCourseEditForm);
router.put("/course/:id/edit", courseController.updateCourse);
router.delete("/course", courseController.removeAllCourses);
router.delete("/course/:id", courseController.removeCourseById);
router.get("/course", courseController.getAllCourses);
router.get("/course/:id", courseController.getCourseById);

// router.get("/", homeController.showHelloWorld);
// router.get("/item/:vegetable", homeController.showRequestParam);
// router.get("/name/:name", homeController.showSentName);
// router.get("/contact", subscriberController.getCreationForm);
// router.get("/populate", subscriberController.createPreBuildSubs);
// router.get("/course/create", courseController.createPreBuildCourse);
// router.get("/sub/associate", subscriberController.associateSubWithCourse);
// router.get("/sub/assd", subscriberController.showOneSubWithCourse);
// router.get("/user/create", userController.createSomeUser);
// router.get("/user/associate", userController.associateWithSub);
// router.get("/sub/index", subscriberController.index, subscriberController.indexView);
// router.get("/user/index", userController.getAllUsers, userController.showAllUsers);
// router.get("/user/new", userController.getUserCreateForm);
// router.get("/user/:id", userController.getUserById, userController.showUser);
// router.get("/user/:id/edit", userController.getUserEditForm);

// router.post("/", homeController.logBody);
// router.post("/sub", subscriberController.createSubscriber);
// router.post("/user/create", userController.createUser, userController.redirectView);

// router.delete("/sub", subscriberController.removeAllSubscribers);
// router.delete("/course", courseController.removeAllCourses);
// router.delete("/user/:id/delete", userController.removeUserById, userController.redirectView);

// router.put("/user/:id/update", userController.updateUser, userController.redirectView);

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