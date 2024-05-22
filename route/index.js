
import userRoute from "./userRoute.js";
import serviceRoute from "./service.router.js";

import express from "express";

const route = express.Router();

route.use("/user", userRoute);
route.use('/service', serviceRoute);


export default route;