//Useing the system libraries
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const objId = require('mongoose').Types.ObjectId;

const User = require('../model/user.model');
const Product = require('../model/product.model');
const connection = require('../config/environment.variable');
const authGuard = require('../config/auth.token');


//get all user
router.get('/',authGuard,(req,res,next)=>{
    User.find()
    .select('-password')
    .exec()
    .then((data)=>{
        res.json({
            status: true,
            message: "All the users",
            user: data
        });
    })
    .catch(next);
});

//get all product for a specific user
router.get('/:id',authGuard,(req,res,next)=>{
    if(!objId.isValid(req.params.id))
        return res.json({status:false,message:"Invalid user id"});

    Product.find({user: req.params.id})
    .populate('user')
    .populate('category')
    .exec()
    .then(data =>{
        res.json({
            status: true,
            message: "All the products for the user",
            product: data
        });
    })
    .catch(next);
});


//add a user registration
router.post('/',(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then((data)=>{
        if(data.length >= 1){
            res.json({status: false, message: 'Email already in use'});
        }else{
            bcrypt.genSalt(10,(err,salt)=>{
                if(err){
                    res.json({status:false,message: "Error try again"});
                }else{
                    bcrypt.hash(req.body.password,salt,(err,hashPassword)=>{
                        if(err){
                            res.json({status:false,message: "Error try again"});
                        }else{
                            const user = new User({
                                name: req.body.name,
                                email: req.body.email,
                                password: hashPassword,
                                isSeller:req.body.isSeller,
                            }); 
                            user.save()
                            .then((data)=>{
                                res.json({status:true,message:'User added successfully'});
                            })
                            .catch(next);                
                        }
                    });    
                }
            });
        }
    });
});

//Update a User
router.put('/:id',authGuard,(req,res,next)=>{
    if(!objId.isValid(req.params.id))
        return res.json({status:false,message:"Invalid user id"});
    User.findById(req.params.id)
    .exec()
    .then((data)=>{
        if(data.length < 1){
            res.json({status:false,message:"No user found"});
        }else{
            bcrypt.hash(req.body.password,10,(err,hashPassword)=>{
                if(err){
                    res.json({status:false,message:err});
                }else{
                    const user = {
                        name: req.body.name,
                        email:req.body.email,
                        password:hashPassword,
                        isSeller:req.body.isSeller,
                    };
                    User.findByIdAndUpdate(req.params.id,{$set:user},{new:true})
                    .exec()
                    .then((data)=>{
                        res.json({status:true,message:"User updated successfully"})
                    })
                    .catch(next);    
                }
            });
        }
    }).catch(next);
});

//Delete a User
router.delete('/:id',authGuard,(req,res,next)=>{
    if(!objId.isValid(req.params.id))
        return res.json({status:false,message:"Invalid user id"});
    User.findByIdAndRemove(req.params.id)
    .exec()
    .then((data)=>{
        res.json({status:true,message:"user Deleted successfully"});
    })
    .catch(next);
});


//login route to Authanticationarize the user and get token the token secreat is citicollege and expirse in 1hr
router.post("/login",(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then((user)=>{
        if(user.length < 1){
            return res.json({status:false,message:"Authantication failed"});
        }
        bcrypt.compare(req.body.password,user[0].password,(err,data)=>{
            if(err){
                return res.json({status:false,message:err});
            }else{
                if(data){
                    //the token secreat key is created and set expire timeing encrypted by citicollege
                    const token = jwt.sign({id:user[0]._id},connection.secret,{expiresIn:'1hr'});
                    const client = {
                        _id: user[0]._id,
                        name: user[0].name,
                        email: user[0].email,
                        isSeller: user[0].isSeller
                    }
                    return res.json({status:true,message:'Authantication successful',token: token, user: client});
                }else{
                    return res.json({status:false,message:"Authantication failed"});
                }    
            }
        });
    })
    .catch(next)
});


module.exports = router;