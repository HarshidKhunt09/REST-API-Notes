import mongoose from "mongoose";
import { ContactSchema } from "../models/crmModel";

// Create a new collection
const Contact = mongoose.model('Contact', ContactSchema);

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

