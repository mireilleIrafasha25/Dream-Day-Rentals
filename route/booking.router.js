import express from "express";
const bookingRoute = express.Router();
import { addNewBooking, getAllBookings, getBookingById, updateBooking, deleteBooking, findBookingByCategory } from "../controller/booking.controller.js";
import { addNewBookingValidation } from "../utils/validation.js";

bookingRoute.post("/add", addNewBookingValidation,addNewBooking );
bookingRoute.get("/list", getAllBookings);
bookingRoute.get("/get/:id", getBookingById);
bookingRoute.get("/get/:category", findBookingByCategory);
bookingRoute.put("/update/:id", updateBooking);
bookingRoute.delete("/delete/:id", deleteBooking);

export default bookingRoute;