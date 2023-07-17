const express = require("express");
const route = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
route.post("/register",async(req,res)=>{
    const {name,email,gender,password} = req.body
    
    try {
        const newpass = await bcrypt.hash(password,10)
      const user =  await User.create({...req.body,password:newpass});
    
      res.send({'mesg':user})

    } catch (error) {
        
        res.send({'mesg':"error"})
    }
})

route.post("/login",async(req,res)=>{

    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});

        if(user){

            const verify = await bcrypt.compare(password,user.password);
   
            if(verify){

                const token = await jwt.sign({userid:user.id,username:user.name},"pravin");

                res.send({token})
            }
            else{

                res.send({"error":"error"})
            }

            
        }

    } catch (error) {
        
        res.send({'mesg':"error"})
    }
})

module.exports = route