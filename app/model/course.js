import Mongoose from "mongoose";

const courseSchema = Mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String,
        require: true
    },
    items: [],
    zipCode: {
        type: Number,
        min: [10000, "Zip code is too short"],
        max: 99999
    }
},
    {
        timestamp: false
    });

export const Course = Mongoose.model("Course", courseSchema);