import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";

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
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

ContactSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    }catch(e){
        console.log(e);
    }
}