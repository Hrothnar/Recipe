const express = require("express");
const homeController = require("./app/controller/home_controller");
const expressLayout = require("express-ejs-layouts");

const app = express();

const port = 3000;

app.use(express.urlencoded({
    extended: false
}));

app.set("port", 3000);
app.set("view engine", "ejs");
app.set("views", __dirname + "/app/view");

app.use(express.json());
app.use(expressLayout);

app.get("/", homeController.helloWorld);
app.get("/item/:vegetable", homeController.sendRequestParam);
app.get("/name/:name", homeController.sendName);
app.post("/", homeController.logBody);

app.listen(port, () => {
    console.log(`The express.js server has started and is listening on port: ${app.get("port")}`);
});