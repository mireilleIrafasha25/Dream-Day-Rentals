import express from "express";
const serviceRoute = express.Router();
import { test, addNewService, getAllServices, getServiceById, findServiceByName, updateService, deleteService} from "../controller/service.controller.js";
import { addServiceValidation, testValidation } from "../utils/validation.js";
serviceRoute.post("/test", testValidation, test);
serviceRoute.post("/add", addServiceValidation, addNewService);
serviceRoute.get("/list", getAllServices);
serviceRoute.get("/get/:id", getServiceById);
serviceRoute.get("/get/:serviceName", findServiceByName);
serviceRoute.put("/update/:id", updateService);
serviceRoute.delete("/delete/:id", deleteService);

export default serviceRoute;