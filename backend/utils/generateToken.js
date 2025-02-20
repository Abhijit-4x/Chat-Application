import jwt from "jsonwebtoken";


const generateTokenAndSetCookie = (userId, res)=>{
    const token = jwt.sign( {userId}, process.env.JWT_SECRET,{
        expiresIn: '15d'
    } );

    // console.log(process.env.NODE_ENV);
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15days in milliseconds
        httpOnly: true, // this prevents XSS or cross-site scripting attacks
        sameSite: "strict", // prevents CSRF attacks
        secure: process.env.NODE_ENV !== "development",
    });
};

export default generateTokenAndSetCookie;