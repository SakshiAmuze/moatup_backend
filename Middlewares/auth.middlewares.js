import jwt from "jsonwebtoken";

const isAuthenticated = async (req,res,next) =>{

    try {
     const {token} = req.cookies;
     console.log(token);
     if(!token){
        return res.status(401).json({
            message: "User not Authenticated",
            success:false
        })
     }
       const decode = await jwt.verify(token,process.env.TOKEN_SECRET);
       console.log(decode);
       req.user = decode.id;
       next();
             
    } 
    catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Authentication failed",
            success: false
        });
    }
};
export default isAuthenticated