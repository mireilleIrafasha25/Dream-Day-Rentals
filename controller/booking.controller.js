import bookingModel from "../model/booking.model.js";
import { NotFoundError, BadRequestError } from "../error/index.js";
import { validationResult } from "express-validator";
import asyncWrapper from "../middleware/async.js";


   export const addNewBooking = asyncWrapper(async (req, res, next) => {
       const errors = validationResult(req)
       
        if(!errors.isEmpty()){
            next(new BadRequestError(errors.array()[0].msg));
        }
            const newBooking = await bookingModel.create(req.body)
           return  res.status(201).json(newBooking); 
        
        
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

    export const findBookingByName = async (req, res, next) => {
        const service = req.params.serviceName;
        
        try {
            const foundBooking = await bookingModel.find({serviceName: service});
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
