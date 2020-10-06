
// 3Rd party for date
const monent=require('moment');
//Create middleware
const logger=(req,res,next)=>{
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${monent().format()}`);
    next();
}
module.exports=logger;