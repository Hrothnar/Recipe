import Mongoose from "mongoose";

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

export const User = Mongoose.model("User", userSchema);