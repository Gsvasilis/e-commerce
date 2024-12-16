import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,unique:true},
    cartItems:[
        {
            quantity:{
                type:String,
                default:1
            },
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"product"
            }
        }
    ],
    role:{
        type:String,
        enum:["customer","admin"],
        default:"customer"
    },
},{timestamps:true})

const User = mongoose.model("User",userSchema)

export default User