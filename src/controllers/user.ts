import express from 'express'
import {user, userservices } from "../models/user";
import bodyParser from 'body-parser';
import  Jwt  from 'jsonwebtoken';
import database from '../database';
const userser=new userservices();
const index=async(req:express.Request,res:express.Response)=>{
    try{const authHeader:string = req.get('Authorization')as unknown as string;
       const token=authHeader.split(' ')[1];
       Jwt.verify(token,database.TOKEN_SECRET as unknown as string);
    

    }
    catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    try{
    const result=await userser.index();
    res.json(result);
    }
    catch(err){
        res.status(400);
        console.log(err);
    }

}
const show=async(req:express.Request,res:express.Response)=>{
    try{
    const authHeader:string = req.get('Authorization')as unknown as string;
    const token = authHeader.split(' ')[1];
    Jwt.verify(token,database.TOKEN_SECRET as unknown as string);
} catch(err) {
    res.status(401)
    res.json('Access denied, invalid token')
    return
}
    
    try{
const result=await userser.show(parseInt(req.params.id));
res.json(result);
    }
catch(err){
    res.status(400);
    console.log(err);
}
}


const create=async(req:express.Request,res:express.Response)=>{
    
    try{
   const u:user={
       username:req.body.username,
     firstname:req.body.firstname,
     lastname:req.body.lastname,
     password:req.body.password
    }
    
    const result=await userser.create(u);
    if(result===null){
        res.json('chose another pass');
    }
    else res.json(result);
        }
    catch(err){
        console.log(err);
}
}
const authenticate=async(req:express.Request,res:express.Response)=>{
    try{
    const result=await userser.authenticate(req.body.username,req.body.password);
    if(result!==null){
        const token=Jwt.sign({result},database.TOKEN_SECRET as unknown as string);
        res.json(
            {
                status:'success',
                data:{...result,token},
                message:'user authenticated'
            }
        );
    }
    else{
        res.status(401).json({
            status:'error',
            message:'pass and username not match'
        });
        

    }

    }
    catch(err){
        console.log(err);
}
}
const userroutes=(app:express.Application)=>{
    app.use(express.json());
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());
    app.get('/users',index);
    app.get('/users/:id',show);
    app.post('/users/create',create);
    app.post('/authenticate',authenticate);
}
export default userroutes;
