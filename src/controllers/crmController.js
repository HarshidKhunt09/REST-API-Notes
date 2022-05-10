import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { ContactSchema } from "../models/crmModel";

// Create a new collection
export const Contact = mongoose.model('Contact', ContactSchema);

// export const addNewContact = (req, res) => {
//     let  newContact = new Contact(req.body);

//     newContact.save((err, contact) => {
//         if(err) {
//             res.send(err);
//         }
//         res.json(contact);
//     });
// }

export const addNewContact = async (req, res) =>{
    try{
        let newContact = new Contact(req.body);

        const contact = await newContact.save();
        res.status(201).send(contact);
    }catch(e){
        res.status(400).send(e);
    }
}

// export const getContacts = (req, res) => {
//     Contact.find({}, (err, contact) => {
//         if(err) {
//             res.send(err);
//         }
//         res.json(contact);
//     });
// }

export const getContacts = async (req, res) => {
    try{
        const contacts = await Contact.find();
        res.send(contacts);
    }catch(e){
        res.send(e);
    }
}

// export const getContactWithID = (req, res) => {
//     Contact.findById(req.params.contactID, (err, contact) => {
//         if(err) {
//             res.send(err);
//         }
//         res.json(contact);
//     });
// }

export const getContactWithID = async (req, res) => {
    try{
        const contact = await Contact.findById(req.params.contactID);

        if(!contact){
            return res.status(404).send();
        }else{
            res.send(contact);
        }
    }catch(e){
        res.status(500).send(e);
    }
}

// export const updateContact = (req, res) => {
//     Contact.findOneAndUpdate({ _id: req.params.contactID }, req.body, { new: true, useFindAndModify: false}, (err, contact) => {
//         if(err) {
//             res.send(err);
//         }
//         res.json(contact);
//     });
// }

export const updateContact = async (req, res) => {
    try{
        const updateContact = await Contact.findByIdAndUpdate(req.params.contactID, req.body, { new: true, useFindAndModify: false });
        res.send(updateContact);
    }catch(e){
        res.status(404).send(e);
    }
}

// export const deleteContact = (req, res) => {
//     Contact.remove({ _id: req.params.contactID }, (err, contact) => {
//         if(err) {
//             res.send(err);
//         }
//         res.json({ message: 'successfully deleted contact'});
//     });
// }

export const deleteContact = async (req, res) => {
    try{
        const deleteContact = await Contact.findByIdAndDelete(req.params.contactID);
        if(!req.params.contactID){
            return res.status(400).send();
        }
        res.send(deleteContact);
    }catch(e){
        res.status(500).send(e);
    }
}

export const signup = async (req, res) =>{
    try{
        let newContact = new Contact(req.body);

        if(newContact.password != newContact.cpassword){
            return res.status(422).json({ error: "Password are not matching" });
        }else{
            
            newContact.password = await bcrypt.hash(newContact.password, 12);
            newContact.cpassword = await bcrypt.hash(newContact.cpassword, 12);

            const contact = await newContact.save();
            res.status(201).send(contact);
        }
    }catch(e){
        res.status(400).send(e);
    }
}

export const signin = async (req, res) => {
    try{
        let token;
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({ error: "Plz filled the data" });
        }

        const userlogin = await Contact.findOne({ email: email });

        if(userlogin){
            const isMatch = await bcrypt.compare(password, userlogin.password);

            token = await userlogin.generateAuthToken();
            console.log(token);

            res.cookie("jwttoken", token, {
                expires:new Date(Date.now() + 25892000000),
                httpOnly:true
            });

            if(!isMatch) {
                res.status(400).json({ error: "Invalid Credentials" });
            }else {
                res.json({ message: "user signin successfully" });
            }
        }else{
            res.status(400).json({ error: "Invalid Credentials" });
        }
    }catch(e){
        console.log(e);
    }
}

export const about = (req, res) => {
    console.log("Hello my about");
    res.send(req.rootUser);
}