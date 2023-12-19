const mongoose = require("mongoose");

const subscriberSchema = mongoose.Schema({
    name: String,
    email: String,
    zipCode: Number
});

module.exports.Subscriber = Subscriber = mongoose.model("Subscriber", subscriberSchema);