import serviceModel from "../model/service.model.js";
import { NotFoundError, BadRequestError } from "../error/index.js";
import { validationResult } from "express-validator";
import asyncWrapper from "../middleware/async.js";

export const test = (req, res, next) => {
    res.send('Hello Brides!');
}

   export const addNewService = asyncWrapper(async (req, res, next) => {
       const errors = validationResult(req)
       
        if(!errors.isEmpty()){
            next(new BadRequestError(errors.array()[0].msg));
        }
            const newService = await serviceModel.create(req.body)
           return  res.status(201).json(newService); 
        
        
    });

    export const getAllServices =  async (req, res, next) => {
        try{
            const getServices = await serviceModel.find();
            if(getServices){
                return res.status(200).json({
                    size: getServices.length,
                    getServices
                })
            }
            
        }catch (error){
            next(error);  
        }
    }

    export const getServiceById = async (req, res, next) => {
        try{
            const foundService = await serviceModel.findById(req.params.id)
            if (!foundService) {
                return next(new NotFoundError(`Service not found`))
            }
            
              return  res.status(200).json(foundService)
            }
        catch (error) {
            next(error);
            
          }
    }

    export const findServiceCategory = async (req, res, next) => {
        const serviceCategory = req.params.category;
        
        try {
            const foundService = await serviceModel.find({category: serviceCategory});
            return res.status(200).json({
                size: foundService.length,
                foundService
            });
        } catch (error) {
            next(error);
        }
    }
      export const updateService = async(req, res, next) => {
        try {
            const updatedService = await serviceModel.findByIdAndUpdate(req.params.id, req.body,{set:true});
               if(!updatedService) {
                return next(new NotFoundError(`Service not found`));
               }
               return  res.status(200).json(updatedService)
            }
        catch (error) {
            next(error);
        }

    }
    export const deleteService = async(req, res, next) => {
        const id =req.params.id;
           
        try {
            const deletedService = await serviceModel.findByIdAndDelete(id);
              return  res.status(200).json({ message : 'Service is deleted'})
            }
            
         catch (error) {
            next(error)
        }

    }
