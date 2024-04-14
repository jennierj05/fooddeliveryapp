import express from "express";
import expressAsyncHandler from "express-async-handler";
import nodemailer from 'nodemailer'
import {google} from 'googleapis'
import Order from "../models/order.js";
import { emailTemplate, isAuth } from "../utlis.js";

const orderRouter= express.Router()


const CLIENT_ID='47384081821-if2foogmo9lv185u2o8ijqa36937otr3.apps.googleusercontent.com';
const CLIENT_SECRET='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';
const REDIRECT_URI='https://developers.google.com/oauthplayground';
const REFRESH_TOKEN='1//04exMZMaUA_BTCgYIARAAGAQSNwF-L9IrcSS4FaKEdRBdfEiYdptXQPgsA7dZqRUEytqNcsED-0YzGhrsmoD23484-nhbsV9Pe00';


const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN});



orderRouter.get('/',isAuth,expressAsyncHandler(async(req,res)=>{
    const orders = await Order.find({userId:req.user._id})
    res.send(orders)
}))
orderRouter.get('/admin-orders',expressAsyncHandler(async(req,res)=>{
    const orders = await Order.find().sort({_id:-1}).limit(20)
    res.send(orders)
}))



orderRouter.post('/',isAuth,expressAsyncHandler(async(req,res)=>{
 if(req.body.orderItems.length===0){
  res.status(400).send({message:'cart is empty!'})
 }
 else{
    const accessToken = oAuth2Client.getAccessToken();
     const newOrder= new Order({
        orderItems:req.body.orderItems,
        shippingAddress:req.body.shippingAddress,
        paymentMethod:req.body.paymentMethod,
        itemsPrice:req.body.itemsPrice,
        totalprice:req.body.totalprice,
        shippingPrice:req.body.shippingPrice,
        paymentId:req.body.paymentId,
        userId:req.user._id,
        email:req.body.email,
        userName:req.body.userName
     })
    
     const order = await newOrder.save()

   //   let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type:'OAuth2',
      user:'jennieroopakumar@gmail.com' ,
      clientId:CLIENT_ID,
      clientSecret:CLIENT_SECRET,
      refreshToken:REFRESH_TOKEN,
      accessToken:accessToken
    },
  });

   // send mail with defined transport object
   let info = await  transporter.sendMail({
    from: 'jennieroopakumar@gmail.com', // sender address
    to: order.email, // list of receivers
    subject: "Order placed Successfuly🎉",
    text: "Hello world?", // Subject line
    html:emailTemplate(order), // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
res.status(201).send({message:'Order Placed !',order:order})

 }
}))

orderRouter.get('/:id',isAuth,expressAsyncHandler(async(req,res)=>{
    const {id} = req.params;
   const order =await Order.findById(id)
   if(order){
      res.send(order)
   }
   else{
    res.status(404).send({message:'Order Not Found'})
   }
}))


export default orderRouter;