const {UserModel,BookModel} = require("../models/index");
const mongoose = require("mongoose");

exports.getAllUsers = async(req,res)=>{
    const users = UserModel.find();
    if(!users){
        return res.status(404).json({
            success:false,
            message:"No users Found"
        })
    }
    return res.status(200).json({
        success:true,
        message:"Users Found",
        data:users
    })
}