import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../models/User.model.js";


export const signIn = async (req,res) => {
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                message: "Please enter email and password"
            })
        }

        const user = await User.findOne({email}).select("+password");

        if(!user){
            return res.status(404).json({
                message:"User not found,Please sign up first."
            })
        }

        // comparing password
        const isPasswordMatch = await bcrypt.compare(password,user.password);

        if(!isPasswordMatch){
            return res.status(401).json({
                message:"Invalid credentials"
            });
        }

        // everything verify now,build jwt token
        const token = jwt.sign(
            {id: user._id,
             role: user.role
            },
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );
                console.log("hlw");

        user.lastLogin = new Date();
        await user.save();

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    }catch(error){
        return res.status(500).json({
            message: error.message
        });
    }
}