import express from "express";
const bookingRoute = express.Router();
import { addNewBooking, getAllBookings, getBookingById,updateBooking, deleteBooking, findBookingByCategory } from "../controller/booking.controller.js";
import { addNewBookingValidation } from "../utils/validation.js";
import {authorize,authenticateToken} from "../middleware/authethicateToken.js";

bookingRoute.post("/add", addNewBookingValidation,authenticateToken,addNewBooking );
bookingRoute.get("/list", getAllBookings);
bookingRoute.get("/get/:id", getBookingById);
bookingRoute.get("/getByCategory/:category", findBookingByCategory);
bookingRoute.put("/update/:id", updateBooking);
bookingRoute.delete("/delete/:id", deleteBooking);

export default bookingRoute;