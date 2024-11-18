const express = require("express");

const {UserModel,BookModel} = require("../models/index");

const { users } = require("../data/user.json");  //This line is for handling the user datas

const router = express.Router();

/* 
   Route : /users,
   Method : GET,
   Description : Get all the users
   Access : Public,
   Parameters : none
*/

router.get("/",(req,res)=>{
    res.status(200).json({
        success: true,
        data : users
    })
})

/* 
   Route : /users,
   Method : POST,
   Description : Creating new user
   Parameters : none
*/

router.post("/",(req,res)=>{
    const { id,name,surname,email,subscriptionType,subscriptionDate } = req.body;
    const user = users.find((each)=> each.id === id);
    if(user){
        return res.status(404).json({
            success:false,
            message:"User Id Already Exists"
        });
    }
    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate
    })
    return res.status(201).json({
        success:true,
        message:"User created successfully",
        data: users
    })
})

/* 
   Route : /users/:id,
   Method : GET,
   Description : Getting user by their ID.
   Parameters : ID.
*/

//Here ":id" is way of getting any params in route
router.get("/:id",(req,res)=>{
    const {id} = req.params;
    const user = users.find((each)=> each.id === id);
    if(!user){
        res.status(404).json({
            success:false,
            message:"User id doesn't exists"
        });
    }
    res.status(200).json({
        success:true,
        data: user
    })
});

/* 
   Route : /users/:id,
   Method : PUT,
   Description : Updating user by their ID.
   Parameters : ID.
*/

router.put("/:id",(req,res)=>{
    const { id } = req.params;    // Request to the server to check the id
    const { data } = req.body     // Request the data to the server which i need to update.
    
    const user = users.find((each)=> each.id === id)

    if(!user){
     return res.status(404).json({
            success:false,
            message: "User Id dosen't exists"
        })
    }
    const updateUserData = users.map((each)=>{
        if(each.id === id){
        return{
            ...each,  // '...' is the spread operator used in JS arrays to access all the elements (here accessing each elements) 
            ...data   // here accessing only the datas which the user need to update (which we give in body section).
          }
        }
        return each;
    })
    res.status(200).json({
        success:true,
        message:"Updated user data successfully",
        data: updateUserData
    })

})

/* 
   Route : /users/:id,
   Method : DELETE,
   Description : Deleting user by their ID.
   Parameters : ID.
*/

router.delete("/:id",(req,res)=>{
    const { id } = req.params
    const user = users.find((each)=> each.id === id)
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User ID doesn't exists"
        })
    }
    const index = users.indexOf(user)
    users.splice(index,1);

    return res.status(200).json({success:true,message:"User deleted succesfully",data: users});
});

/* 
   Route : /users/subscription-details/:id,
   Method : GET,
   Description : Getting the users' subscription details.
   Parameters : ID.
*/
router.get("/subscription-details/:id",(req,res)=>{
    const {id} = req.params;
    const user = users.find((each)=> each.id === id);
    if(!user){
        res.status(400).json({
            success:false,
            message:"User with this ID not found"
        });
    }
    const DateinDays = (data = "") =>{
        let date;
        if(data == ""){
            date = new Date();  
        }
        else{
            date = new Date(data);
        }
        let days = Math.floor(date/(1000*60*60*24));
        return days;
    }
    const subscriptionType = (date)=>{
        if(user.subscriptionType === "Basic"){
            date += 90;
        }
        else if(user.subscriptionType === "Standard"){
            date += 180;
        }
        else if(user.subscriptionType === "Premium"){
            date += 365;
        }
        return date;
    }
    const returnDate = DateinDays(user.returnDate);
    const currDate = DateinDays();
    const subscriptionDate = DateinDays(user.subscriptionDate);
    const subscriptionExpire = subscriptionType(subscriptionDate);

    const data = {
        ...user,
        isSubscriptionEnd : subscriptionExpire <= currDate,
        daysLeftForExpire:
        subscriptionExpire <= currDate ? 0 : subscriptionExpire - currDate,
        fine : 
        returnDate <= currDate ? 
            subscriptionExpire <= currDate
               ?100
               :50
        :0
    }
    return res.status(200).json({
        success:true,
        message:"Subscription details for user is:",
        data,
    })
})


module.exports = router;