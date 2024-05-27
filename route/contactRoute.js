import {addNewContact,ListContact,findbyUser,updateContact,deleteContact} from "../controller/ContactController.js";
import {addnewMessageValidation} from "../utils/validation.js"
import express from "express";

const route = express.Router();
route.post("/add",addNewContact, addNewContact);
route.get("/list", ListContact);
route.get("/findbyUser/:id", findbyUser);
route.put("/update/:id", updateContact);
route.delete("/delete/:id", deleteContact);

export default route;
