import contactModel from "../model/contactModel.js";
import asyncWrapper from "../middleware/async.js";
import {UnauthorizedError,BadRequestError} from "../error/index.js";

export const test = (req, res, next) => {
    res.send('Hello Brides!');
}

export const addNewContact = asyncWrapper(async (req, res, next) => {
    const newContact = await contactModel.create(req.body)
    return res.status(201).json(newContact);
});

export const findbyUser= asyncWrapper(async (req, res, next) => {
    const Contactowner = req.query.user;
        const foundContact = await contactModel.findOne({status:Contactowner});
        return res.status(200).json({foundContact});
        next();
})


