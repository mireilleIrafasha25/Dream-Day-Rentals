import { NotFoundError,BadRequestError } from "../error/index.js";
import TokenModel from "../model/authTokenModel.js";
import { validationResult } from "express-validator";
import asyncWrapper from "../middleware/async.js";

export const test = (req, res, next) => {
    res.send('Hello Brides!');
}

export const addNewToken = asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        next(new BadRequestError(errors.array()[0].msg));
    }
    const newToken = await TokenModel.create(req.body)
    return res.status(201).json(newToken);
});

export const findbyUser= asyncWrapper(async (req, res, next) => {
    const Tokenowner = req.query.user;
        const foundToken = await TokenModel.findOne({status:Tokenowner});
        return res.status(200).json({foundToken});
        next();

});

export const deleteToken = asyncWrapper(async (req, res, next) => {

    const deleteToken = await TokenModel.findByIdAndDelete(req.query.id)
    return res.status(200).json({message:"Token deleted"});
});
