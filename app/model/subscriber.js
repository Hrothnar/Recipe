import Mongoose from "mongoose";

const subscriberSchema = Mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        lowercase: true,
        unique: true
    },
    zipCode: {
        type: Number,
        min: [10000, "Zip code is too short"],
        max: 99999
    },
    courses: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
},
    {
        timestamp: false
    });

subscriberSchema.methods.getInfo = function () {
    return `Name: ${this.name} | Email: ${this.email} | Zip Code: ${this.zipCode}`;
};

subscriberSchema.methods.findLocalSubscribers = function () {
    return this
        .model("Subscriber")
        .find({ zipCode: this.zipCode });
};

export const Subscriber = Mongoose.model("Subscriber", subscriberSchema);