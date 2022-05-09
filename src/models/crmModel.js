import mongoose from "mongoose";
import validator from "validator";

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter a first name',
        minlength: 3
    },
    lastName: {
        type: String,
        required: 'Enter a first name',
        minlength: 3
    },
    email: {
        type: String,
        unique:[true, "Email id already present"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    company: {
        type: String
    },
    phone: {
        type: Number,
        min: 10,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
