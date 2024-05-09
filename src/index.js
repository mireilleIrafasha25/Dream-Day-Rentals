import express from 'express';
import mongoose from 'mongoose';
import router from './route/index.js';
import errorHandler from './middleware/errorhandler.js';
import Configuration from './configuration/configs.js';


const app = express();
app.use(express.json());
app.use('/Weeding',router);
mongoose.connect(Configuration.db)
.then(()=>
{
    console.log('connected to db');
})
.catch(err=>
    {
        console.log(err);
    }
)
app.listen(Configuration.port,()=>
{
    console.log(`server is running on port ${Configuration.port}`);
})
app.use(errorHandler)