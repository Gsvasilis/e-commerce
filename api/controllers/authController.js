import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const signToken = (id) => {
	// jwt token
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});
};


export const signup = async (req,res)=>{
    try {
        const {name,email,password} = req.body

        if(!email || !name || !password){
            return res.status(400).json({success:false,message:"All fields required"})
        }

        const exists = await User.findOne({email})
        if(exists){
            return res.status(400).json({success:false,message:"User already exists"})
        }
        if(password.lenght < 8 ){
            return res.status(400).json({success:false,message:"Passworgs must be at least 8 characters"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        const user = new User({
            name,
            email,
            password:hashPassword
        })

        const token = signToken(user._id)

        res.cookie("jwt", token, {
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
			httpOnly: true, // prevents XSS attacks
			sameSite: "strict", // prevents CSRF attacks
			secure: process.env.NODE_ENV === "production",
		});

        await user.save()
        
        res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
		});

    } catch (error) {
        console.log("Error in signup controller", error.message);
		res.status(500).json({ message: error.message });
    }
}
export const login = async (req,res)=>{
    try {
        const {email,password} = req.body
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({success:false,message:"Wrong credentials"})
        }
        const isPassCorrect  = await bcrypt.compare(password,user.password)
        if(!isPassCorrect){
            return res.status(400).json({success:false,message:"Wrong Password"})
        }
    	const token = signToken(user._id);

		res.cookie("jwt", token, {
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
			httpOnly: true, // prevents XSS attacks
			sameSite: "strict", // prevents CSRF attacks
			secure: process.env.NODE_ENV === "production",
		});

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });


    } catch (error) {
        console.log("Error in login controller", error.message);
		res.status(500).json({ message: error.message });
    }
}
export const logout = async (req, res) => {
	res.clearCookie("jwt");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};



