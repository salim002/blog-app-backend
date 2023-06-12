import authModel from "../models/authModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


class AuthController 
{
    static userRegisteration = async (req, res)=>{
        const {username, email, password} = req.body;
        try{
            if(username && email && password){
                const isUser = await authModel.findOne({email: email});
                if(isUser){
                    res.status(400).json({message: "User already exists"});
                }
                else{
                    const genSalt = await bcryptjs.genSalt(10);
                    const hashedPassword = await bcryptjs.hash(password, genSalt);
                    const newUser = authModel({
                        username: username,
                        email: email,
                        password: hashedPassword
                    });
                    const savedUser = await newUser.save();
                    if(savedUser){
                        return res.status(201).json({message: "Registered successfully"});
                    }
                }
            }
            else{
                res.status(404).json({message: "All fields are required"});
            }

        } catch(error){
            res.status(400).json({message: error.message});
        }
    }
    static userLogin = async (req, res)=>{
        const {email, password} = req.body;
        try{
            if(email && password){
                const isUser = await authModel.findOne({email: email});
                if(isUser){
                    if(await bcryptjs.compare(password, isUser.password)){
                        const token = jwt.sign({userID: isUser._id}, "mdsalim", {expiresIn: "2d",});
                        return res.status(200).json({message: "Logged in successfully", token, name: isUser.username});
                    }
                    else{
                        return res.status(401).json({message: "Invalid credentials"})
                    }
                }
                else{
                    return res.status(404).json({message: "User not found"});
                }
            }
            else{
                res.status(400).json({message: "All fiels are required"});
            }
        } catch(error){
            return res.status(400).json({message: error.message});
        }
    }
}

export default AuthController;