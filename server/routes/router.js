const express = require("express");
const router = new express.Router();
const userdb = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

//email config
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"devendra.img@gmail.com",
        pass: "qqalnrmynlglwaqg"
    }
})

const keysecret = "qwertyuytrewertyujbvcdrtyvdfg"


router.post("/register", async(req, res) => {
    
    const {fname, email, password, cpassword} = req.body;

    if(!fname || !email || !password || !cpassword){
        res.status(422).json({error: "fill all the details"})
    }
    try {
        const preuser = await userdb.findOne({email: email});

        if(preuser){
            res.status(422).json({error: "This Email is Already Exist"})
        }else if(password !== cpassword){
            res.status(422).json({error:"Password and Confirm Password Not Match"})
        }
        else{
            const finalUser = new userdb({
                fname,email,password,cpassword
            });

            //here password hasing

            const storeData = await finalUser.save();

            // console.log(storeData);
            res.status(201).json({status:201,storeData});
        }
    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error")
    }
});

router.post("/login", async(req, res)=> {
    // console.log(req.body);

    const {email, password} = req.body;

    if(!email || !password){
        res.status(422).json({error:"fill all the details"})
    }

    try {
        const userValid = await userdb.findOne({email: email});

        if(userValid){
            const isMatch = await bcrypt.compare(password, userValid.password);

            if(!isMatch){
                res.status(422).json({ error: "invalid details"})
            }else{

                // token generate
                const token = await userValid.generateAuthtoken();
                //console.log(token);

                //cookiegenerate
                res.cookie("usercookie",token,{
                    expires: new Date(Date.now()+9000000),
                    httpOnly: true
                });

                const result = {
                    userValid,
                    token
                }
                res.status(201).json({status:201, result})
            }
        }
    } catch(error){
        res.status(422).json(error);
    }
})


router.post("/sendpasswordlink", async(req, res) => {
    console.log(req.body)

    const {email} = req.body;

    if(!email){
        res.status(401).json({status:401, message:"Enter Your Email"})
    }

    try {
        const userfind = await userdb.findOne({email:email});
        
        //token generate for reset password
        const token = jwt.sign({_id:userfind._id},keysecret,{
            expiresIn:"120s"
        });
        const setusertoken = await userdb.findByIdAndUpdate({_id:userfind._id},{verifytoken:token},{new:true});
        
        if(setusertoken){
            const mailOptions = {
                from:"devendra.img@gmail.com",
                to:email,
                subject:"Sending Email For password Reset",
                text:`This Link Valid For 2 MINUTES http://localhost:3000/forgotpassword/${userfind.id}/${setusertoken.verifytoken}`
            }
            transporter.sendMail(mailOptions,(error, info)=>{
                if(error){
                    console.log("error", error);
                    res.status(401).json({status:401, message:"email not send"})
                }else{
                    console.log("Email sent", info.response);
                    res.status(201).json({status:201, message:"Email sent Successfully"})
                }
            })
        }
    } catch (error) {
        res.status(401).json({status:401, message:"invalid user"})
    }
});

// verify user for forgot password time
router.get("/forgotpassword/:id/:token",async(req,res) => {
    const {id, token} = req.params;
    
    try {
        const validuser = await userdb.findOne({_id:id, verifytoken:token});
        
        const verifyToken = jwt.verify(token, keysecret);

        console.log(verifyToken);

        if(validuser && verifyToken._id){
            res.status(201).json({status:401,validuser})
        }else{
            res.status(401).json({status:401, message:"user not exist"})
        }
    } catch (error) {
        res.status(401).json({status:401, error})
    }
});

// change password

router.post("/:id/:token", async(req,res) => {
    const {id, token} = req.params;

    const {password} = req.body;

    try {
        const validuser = await userdb.findOne({_id:id, verifytoken:token});
        
        const verifyToken = jwt.verify(token, keysecret);

        if(validuser && verifyToken._id){
            const newpassword = await bcrypt.hash(password, 12);

            const setnewuserpass = await userdb.findByIdAndUpdate({_id:id},{password:newpassword});

            setnewuserpass.save();
            res.status(201).json({status:201, setnewuserpass})
            
        }else{
            res.status(401).json({status:401, message:"user not exist"})
        }
    } catch (error) {
        res.status(401).json({status:401, error })
    }
})

module.exports = router;