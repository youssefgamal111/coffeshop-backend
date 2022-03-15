import express from 'express'
import bodyParser from 'body-parser';
import database from '../database';
import { product, productStore } from '../models/product';
import  Jwt  from 'jsonwebtoken';
const services=new productStore();
const create=async (req:express.Request,res:express.Response)=>{
    try{
const AuthorizationHeader:string=req.get('Authorization')as unknown as string;
const token:string=AuthorizationHeader.split(' ')[1];
Jwt.verify(token,database.TOKEN_SECRET as unknown as string);
    }
    catch(err){
        res.status(401)
        res.json('Access denied, invalid token')
        return
    
    }
    try{
        const p:product={
            name:req.body.name,
           price:req.body.price as unknown as number,
         }
         
         const result=await services.create(p);
         res.json(result);
             }
         catch(err){
             console.log(err);
     }

}
const index=async(req:express.Request,res:express.Response)=>{
   
    try{
    const result=await services.index();
    res.json(result);
    }
    catch(err){
        res.status(400);
        console.log(err);
    }

}
const show=async(req:express.Request,res:express.Response)=>{
   
    try{
const result=await services.show(req.params.name);
res.json(result);
    }
catch(err){
    res.status(400);
    console.log(err);
}
}
const productsRoutes=(app:express.Application)=>{
    app.use(express.json());
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());
    app.get('/products',index);
    app.get('/products/:name',show);
    app.post('/products/create',create);

}
export default productsRoutes;
