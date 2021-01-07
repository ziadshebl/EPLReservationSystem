const jwt = require('jsonwebtoken')
const User = require('../models/user')
const checkAccessToken = async (req, res, next, getUser) => {

    try{

        //Check if access token is sent
        const accessToken =  req.cookies.accessToken || req.header('Authorization').replace('Bearer ','')  

        
        //If no access Token exits throw an error
        if(!accessToken) throw new Error('Authentication Error')

        
        //verify token
        let user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        
        //Fetch user from database
        if(getUser)
            user = await User.findById(user._id).lean()
        
        
        //Throw error if no user is found
        if(!user) throw new Error('Authentication Error')
        console.log(user)
        //Set user in req
        req.user = user
    
        next()
    }catch(e) {
        res.status(401).send({
            error: 'Authentication Error'
        })
    }

}



const HasRole = function (role) {
    return HasRole[role] || (HasRole[role] = function(req, res, next) {
        try{
            if (role !== req.user.role) throw new Error("Not Authorized");
            else next();
        }catch(e){
            res.status(401).send({
                error: 'Authentication Error'
            })
        }
      
    })
  }

const checkAccessTokenAndGetUser =async (req, res, next) => {

    checkAccessToken(req,res,next,true);
}
const checkAccessTokenOnly =async (req, res, next) => {

    checkAccessToken(req,res,next,false);
}
module.exports = {
    checkAccessTokenAndGetUser,
    checkAccessTokenOnly,
    HasRole
}