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

const Product = require('../model/product.model');

const upload = multer({
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

router.get('/',(req,res,next)=>{
    Product.find()
    .populate('user')
    .populate('category')
    .exec()
    .then(data =>{
        res.json(data);
    })
    .catch(next);
});

router.post('/',upload.single('image'), (req, res, next) => {
    console.log(req.file);
    console.log("Hello");
    console.log(req.body);
    const product = new Product({
        user: req.body.owner,
        category: req.body.category,
        image: req.file.location,
        title: req.body.title,
        description: req.body.description
    });
    console.log(product);
    product.save()
    .then(data =>{
        res.json({ success: true, message: 'Successfully Added the product' });    
    })
    .catch(next);
});

module.exports = router;