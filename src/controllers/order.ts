import express from 'express'
import bodyParser from 'body-parser';
import database from '../database';
import { order,order_product,orderservices} from '../models/order';
import  Jwt  from 'jsonwebtoken';
const services=new orderservices();
const current=async (req:express.Request,res:express.Response)=>{
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
       
        const uID:number=parseInt(req.params.id);
        
         const result=await services.current(uID);
         if(result===null) {res.send('no current order');}
         else res.json(result);
             }
         catch(err){
             console.log(err);
     }


}
const orderroute=(app:express.Application)=>{
    app.use(express.json());
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());
    app.get('/order/:id',current);

}
export default orderroute;
