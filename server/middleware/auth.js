const jwt=require('jsonwebtoken');
exports.auth=async(req,res,next)=>{
    const {authorization}=req.headers;
    const token=authorization.split(" ")[1];
    if(!token){
        res.json({
            status:1,
            message:"UnAuhorized"
        })
    }
    const verifyToken=jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if(!verifyToken){
        res.json({
            status:1,
            message:"Invalid token"
        })
    }
    req.user=verifyToken;
    next();
}