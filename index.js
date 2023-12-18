const express = require("express");
const homeController = require("./app/controller/home_controller");
const expressLayout = require("express-ejs-layouts");
const errorController = require("./app/controller/error_controller");
const { MongoClient, ServerApiVersion } = require("mongodb");
const e = require("express");

const port = 3000;

const username = "hrothnar";
const password = "rpRfhZf1NQCEgWq0";
const dbName = "recipe";
const eUsername = encodeURIComponent(username);
const ePassword = encodeURIComponent(password);

const uri = `mongodb+srv://${eUsername}:${ePassword}@ecluster.rfacqfw.mongodb.net/?retryWrites=true&w=majority`;

const app = express();
app.use(express.urlencoded({
    extended: false
}));

app.set("port", 3000);
app.set("view engine", "ejs");
app.set("views", __dirname + "/app/view");

app.use(express.json());
app.use(expressLayout);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {
        const db = client.db(dbName);
        await client.connect(); // Connect the client to the server	(optional starting in v4.7)
        await db.command({ ping: 1 });  // Send a ping to confirm a successful connection
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const contacts = db.collection("contacts");


        await contacts.insertOne({
            name: "Tom Reddle",
            email: "tom@abc.com",
            age: 26,
            hobbies: ["having braakfast", "programming", "swimming"]
        }, (error, db) => {
            if (error) throw error;
            console.log(db);
        });

        const array = await contacts.find().toArray();
        array.forEach((data) => console.log(data));

        // const contact = await contacts.findOne({ "name": "Jane Doe" });
        // console.log(contact);

    } finally {
        await client.close(); // Ensures that the client will close when you finish/error
    }
};

run().catch(console.dir);

// MongoClient.connect(uri, (error, client) => {
//     if (error) throw error;
//     let db = client.db(dbName);
//     db.collection("contacts")
//         .find()
//         .toArray((error, data) => {
//             if (error) throw error;
//             console.log(data);
//         })
// });

app.get("/", homeController.helloWorld);
app.get("/item/:vegetable", homeController.sendRequestParam);
app.get("/name/:name", homeController.sendName);
app.post("/", homeController.logBody);

app.use(errorController.status404);
app.use(errorController.status500);

app.listen(port, () => {
    console.log(`The express.js server has started and is listening on port: ${app.get("port")}`);
});