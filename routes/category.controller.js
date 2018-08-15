const express = require('express');
const router = express.Router();

const Category = require('../model/category.model');

const objId = require('mongoose').Types.ObjectId;

//Get all categories
router.get('/',(req,res,next)=>{
    Category.find()
    .exec()
    .then(data => {
        res.json(data);
    })
    .catch(next);
});


//add a category
router.post('/',(req,res,next)=>{
    const category = new Category({
        name: req.body.name,
        products:req.body.products
    });
    category.save()
    .then( data => {
        res.json({ststus: true, message: "Category added successfully"});
    })
    .catch(next);
 
});


//update a category
router.put('/:id',(req,res,next)=>{
    if(!objId.isValid(req.params.id))
        return res.json({status:false,message:"Invalid user id"});
    
    const category = {
        name: req.body.name,
        products:req.body.products
    }
    Category.findByIdAndUpdate(req.params.id,category,{new:true})
    .exec()
    .then(data => {
        res.json({ststus: true, message: "Category updated successfully"});
    })
    .catch(next);
});


//Delete a category
router.delete('/:id',(req,res,next) => {
    if(!objId.isValid(req.params.id))
        return res.json({status:false,message:"Invalid user id"});
    Category.findByIdAndRemove(req.params.id)
    .exec()
    .then((data)=>{
        res.json({status:true,message:"Category deleted successfully"});
    })
    .catch(next);
});


module.exports = router;