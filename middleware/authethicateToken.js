import jwt from 'jsonwebtoken';
import {UnauthorizedError} from "../error/index.js";
import asyncWrapper from './async.js';

export const  authenticateToken=asyncWrapper(async(req, res, next) =>{
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null)
    { 
    next(new UnauthorizedError("Authorization denied")); // Unauthorized
    }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err)
        {
            return res.status(403).json({message:"forbidden"}); // Forbidden
            // console.log(err);
        }
        else{
            req.user = user;
        }
    
    next();
  });
});
