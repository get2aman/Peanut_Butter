const jwt=require('jsonwebtoken')

const veryfy=(req,res,next)=>{
    const token=req.body.token
    if(token){
        jwt.verify(token,"secret",(err)=>{
           if(err){
            console.log(err)
            return res.sendStatus(403);
           }
           next()
        })
    }
    else{
        res.sendStatus(404)
        console.log("token is not available")
    }   
}
module.exports=veryfy