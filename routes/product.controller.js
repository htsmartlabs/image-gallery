//Useing the system libraries
const express = require('express');
const router = express.Router();
const path = require('path');
const connection = require('../config/environment.variable');

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = new aws.S3({ accessKeyId: connection.awsS3Access, secretAccessKey: connection.awsS3Secret });

const objId = require('mongoose').Types.ObjectId;
const authGuard = require('../config/auth.token');

const Product = require('../model/product.model');

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: connection.bucket,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
        cb(null, Date.now().toString() + path.extname(file.originalname));
        }
    })
});

//get all products
router.get('/',(req,res,next)=>{
    Product.find()
    .populate('user')
    .populate('category')
    .exec()
    .then(data =>{
        res.json({
            status: true,
            message: "All the products",
            product: data
        });
    })
    .catch(next);
});

//get all products
router.get('/:id',(req,res,next)=>{

    if(!objId.isValid(req.params.id))
    return res.json({status:false,message:"Invalid user id"});

    Product.findById({ _id: req.params.id})
    .populate('user')
    .populate('category')
    .exec()
    .then(data =>{
        res.json({
            status: true,
            message: "Details about the product",
            product: data
        });
    })
    .catch(next);
});


router.post('/',authGuard,upload.single('file'), (req, res, next) => {
   
    const product = new Product({
        user: req.body.user,
        category: req.body.category,
        image: req.file.location,
        name: req.body.name,
        description: req.body.description
    });

    product.save()
    .then(data =>{
        res.json({ success: true, message: 'Successfully Added the product' });    
    })
    .catch(next);
});

module.exports = router;