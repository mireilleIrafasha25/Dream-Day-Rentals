import bookingModel from "../model/booking.model.js";
import { NotFoundError, BadRequestError } from "../error/index.js";
import { validationResult } from "express-validator";
import asyncWrapper from "../middleware/async.js";
import {sendEmail} from "../utils/sendEmail.js"
import ServiceModel from "../model/service.model.js"


   export const addNewBooking = asyncWrapper(async (req, res, next) => {
       const errors = validationResult(req)
       
        if(!errors.isEmpty()){
            next(new BadRequestError(errors.array()[0].msg));
        }
        const foundService= await ServiceModel.findOne({serviceName:req.body.serviceName})
        if (!foundService) {
            return next(new NotFoundError(`Service ${req.body.serviceName} not found`));
        }
        if(foundService.availability==false)
        
            {
                return next(new NotFoundError(`${req.body.serviceName}  is not available at ${req.body.date}`));
            }
            const weedingDate=new Date(req.body.startDate).toLocaleDateString();
            // if (isNaN(weedingDate)) {
            //     return next(new BadRequestError(`Invalid date format: ${req.body.date}`));
            // }
        const addNewBooking=new bookingModel({
            Fullname: req.body.Fullname, 
            phone: req.body.phone,
            email: req.body.email,
            category:req.body.category,
            serviceName:foundService._id,
            date:weedingDate,
            paymentMethod:req.body.paymentMethod
        });
        try {
            const savedBooking = await addNewBooking.save();
    
            try {
                await sendEmail(req.body.email, "Booking Confirmation", `
                    Dear ${req.body.Fullname},
                    We are thrilled to confirm your wedding planning booking with ${req.body.serviceName}! 
                    Thank you for choosing us to be a part of your special day.

                    Below are the details of your booking:
                     Couple's Names: ${req.body.Fullname}
                     Wedding Date: ${req.body.date}
                     Location/Venue: ${foundService.location}
                     Package Chosen: ${req.body.category}
                     Planner Assigned: ${req.body.serviceName}

                    Therefore Next step is Initial Consultation: We will contact you within 48 hours to schedule your initial consultation.
                    Contact Us:
                    If you have any questions, please contact us at ${foundService.email} or ${foundService.phoneNumber}.
                    Thank you for choosing ${req.body.serviceName}. We look forward to creating a memorable wedding for you.

                    Warm regards,
                    
                     
                `);
            } catch (emailError) {
                console.error('Error sending email:', emailError);
                // Optionally, you might want to roll back the booking creation if email sending fails
                await BookingModel.findByIdAndDelete(savedBooking._id);
                return next(new Error('Booking created but failed to send confirmation email. Please try again later.'));
            }
    
            return res.status(201).json({
                message: "Booking created!",
                newBooking: savedBooking
            });
    
        } catch (bookingError) {
            console.error('Error creating booking:', bookingError);
            return next(new Error('Failed to create booking. Please try again later.'));
        }
    });

    export const getAllBookings =  async (req, res, next) => {
        try{
            const getBookings = await bookingModel.find();
            if(getBookings){
                return res.status(200).json({
                    size: getBookings.length,
                    getBookings
                })
            }
            
        }catch (error){
            next(error);  
        }
    }

    export const getBookingById = async (req, res, next) => {
        try{
            const foundBooking = await bookingModel.findById(req.params.id)
            if (!foundBooking) {
                return next(new NotFoundError(`Booking not found`))
            }
            
              return  res.status(200).json(foundBooking)
            }
        catch (error) {
            next(error);
            
          }
    }

    export const findBookingByCategory = async (req, res, next) => {
        const serviceCategory = req.params.category;
        
        try {
            const foundBooking = await bookingModel.find({category: serviceCategory});
            return res.status(200).json({
                size: foundBooking.length,
                foundBooking
            });
        } catch (error) {
            next(error);
        }
    }
      export const updateBooking = async(req, res, next) => {
        try {
            const updatedBooking = await bookingModel.findByIdAndUpdate(req.params.id, req.body,{set:true});
               if(!updatedBooking) {
                return next(new NotFoundError(`Booking not found`));
               }
               return  res.status(200).json(updatedBooking)
            }
        catch (error) {
            next(error);
        }

    }
    export const deleteBooking = async(req, res, next) => {
        const id =req.params.id;
           
        try {
            const deletedBooking = await bookingModel.findByIdAndDelete(id);
              return  res.status(200).json({ message : 'Booking is deleted'})
            }
            
         catch (error) {
            next(error)
        }

    }