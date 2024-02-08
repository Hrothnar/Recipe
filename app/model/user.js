import Mongoose from "mongoose";
import { Subscriber } from "./subscriber.js";

const userSchema = Mongoose.Schema({
    name: {
        first: {
            type: String,
            require: true,
            trim: true
        },
        last: {
            type: String,
            require: false,
            trim: true
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    zipCode: {
        type: Number,
        min: [1000, "Zip code too short"],
        max: 99999
    },
    password: {
        type: String,
        required: true
    },
    couses: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
    subscriberAccount: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Subscriber"
    }
},
    {
        timestamp: true
    });

/**
 * Presenting a virtual property of the User object which is not stored in the database, but could be used in code
 */
userSchema.virtual("fullName")
    .get(function () {
        return `${this.name.first} ${this.name.last}`;
    });

/**
 * This is a mongoose hook, which is middleware too. It takes the next middleware function as a parameter and then invokes it. 
 * This one in particular perform the code before saving model to the database.
 */
userSchema.pre("save", function (next) {
    const user = this;
    if (user.subscriberAccount === undefined) {
        Subscriber.findOne({ email: user.email })
            .then((sub) => {
                user.subscriberAccount = sub;
                next();
            })
            .catch((error) => {
                next(error);
            })
    } else {
        next();
    }
});

export const User = Mongoose.model("User", userSchema);