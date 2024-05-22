import express from "express";
const serviceRoute = express.Router();
import { test, addNewService, getAllServices, getServiceById, findServiceCategory, updateService, deleteService} from "../controller/service.controller.js";
import { addServiceValidation, testValidation } from "../utils/validation.js";
import upload from"../middleware/multer.js"
serviceRoute.post("/test", testValidation, test);
serviceRoute.post("/add", upload.single('image'), addNewService);
serviceRoute.get("/list", getAllServices);
serviceRoute.get("/get/:id", getServiceById);
serviceRoute.get("/getByCategory/:category", findServiceCategory);
serviceRoute.put("/update/:id", updateService);
serviceRoute.delete("/delete/:id", deleteService);

export default serviceRoute;