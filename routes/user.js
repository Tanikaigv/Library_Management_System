const express = require("express");
const { users } = require("../data/user.json");

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
            ...data   // here accessing the only datas which the user need to update (which we give in body section).
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

module.exports = router;