const { MongoClient, ServerApiVersion } = require("mongodb");
const username = "hrothnar";
const password = "";
const dbName = "recipe";
const eUsername = encodeURIComponent(username);
const ePassword = encodeURIComponent(password);

const uri = `mongodb+srv://${eUsername}:${ePassword}@ecluster.rfacqfw.mongodb.net/?retryWrites=true&w=majority`;

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


        // await contacts.insertOne({
        //     name: "Tom Reddle",
        //     email: "tom@abc.com",
        //     age: 26,
        //     hobbies: ["having braakfast", "programming", "swimming"]
        // }, (error, db) => {
        //     if (error) throw error;
        //     console.log(db);
        // });

        const array = await contacts.find().toArray();
        array.forEach((data) => console.log(data));

        // const contact = await contacts.findOne({ "name": "Jane Doe" });
        // console.log(contact);

    } finally {
        await client.close(); // Ensures that the client will close when you finish/error
    }
};

run().catch(console.dir);