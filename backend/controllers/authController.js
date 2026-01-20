const User=require('../models/User')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const userSignup = async(req,res)=>{
    try{
        const {email,password}=req.body;
        
        if(!email || !password)
        {
            return res.status(400).json({message:"this fields can't be empty"})
        }
        
        let existUser=await User.findOne({email});
        
        if(existUser)
        {
            return res.status(400).json({message:"user already exits"});
        }
        
        let hashPass= await bcrypt.hash(password,10);
        const user=await User.create({
            email,password:hashPass
        })
        
        res.status(201).json({message:"User registered successfully",user:{
            _id:user._id,
            email:user.email
        }})
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }

}

const userLogin = async(req,res)=>{
    try{
        const {email,password}=req.body;

        if(!email || !password)
        {
            return res.status(400).json({message:"Email and password are required"})
        }

        const user=await User.findOne({email});

        if(!user)
        {
            return res.status(401).json({message:"Invalid credentials"})
        }

        const isMatch= await bcrypt.compare(password,user.password);

        if(!isMatch)
        {
            return res.status(401).json({message:"Invalid credentials"})
        }

        const token= jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})

        res.status(200).json({message: "Login successful",token,
      user: {
        _id: user._id,
        email: user.email
      }
    });
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
}

module.exports={userSignup,userLogin};