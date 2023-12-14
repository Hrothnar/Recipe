const express = require("express");
const log = require("./app/util/util").log;
const homeController = require("./app/controller/home_controller");

const app = express();

const port = 3000;

// app.use((request, response, next) => {
//     console.log("SOME INFO")
//     next();
// });

// app.use((req, res, next) => {
//     console.log('Time:', Date.now())
//     next();
// });

app.use(express.urlencoded({
    extended: false
}));

app.use(express.json());

app.get("/", homeController.helloWorld);
app.get("/item/:vegetable", homeController.sendRequestParam);
app.post("/", homeController.logBody);

app.listen(port, () => {
    console.log(`The express.js server has started and is listening on port: ${port}`);
});