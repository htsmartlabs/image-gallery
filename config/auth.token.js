const jwt = require('jsonwebtoken');
const connection = require('./environment.variable');

//this is the middleware validating the user
module.exports = (req,res,next)=>{
    try{
        if(req.headers.autharization){
            const token = req.headers.autharization.split(" ")[1];
            const decode = jwt.verify(token,connection.secret);    
            if(decode){
                next();
            }else{
                return res.json({status:false,msg:"Authantication Failed"});    
            }    
        }else{
            return res.json({status:false,msg:"Authantication Failed"});    
        }
    }catch(error){
        return res.json({status:false,msg:"Authantication Failed"});
    }
}