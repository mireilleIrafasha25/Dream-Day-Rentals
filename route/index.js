
import userRoute from "./userRoute.js";
import serviceRoute from "./service.router.js";
import bookingRoute from "./booking.router.js";
import ContactRoute from "./contactRoute.js";

import express from "express";

const route = express.Router();

route.use("/user", userRoute);
route.use('/service', serviceRoute);
route.use('/booking',bookingRoute);
route.use("/contact", ContactRoute);

export default route;