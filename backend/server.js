import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import dotenv from 'dotenv'
import orderRouter from './routes/OrderRouter.js';
import path,{dirname} from 'path'
import { fileURLToPath } from 'url';
dotenv.config()

const app = express();
app.use(express.json({ limit: '30mb', extended: true }))  // to parse body in json format (body parser)
app.use(express.urlencoded({limit: '30mb',extended:true}))
const PORT= process.env.PORT || 5000
//const uri  = "mongodb+srv://Print-X:Pass%40123@cluster0.w844m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

try {
    await mongoose.connect("mongodb://127.0.0.1:27017/foodapp1")
    console.log('Mongodb connected');
} catch (error) {
    console.log(error)
}

app.use(cors())
app.use('/api/users',userRouter);
app.use('/api/products',productRouter)
app.use('/api/orders',orderRouter)



app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message})
})

app.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}`)
});