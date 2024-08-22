const express = require("express");

const { users } = require("./data/user.json");

const app = express();

const PORT = 8081;
app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Server is up and running :-)"
    });
})

/* 
   Route : /users,
   Method : GET,
   Description : Get all the users
   Access : Public,
   Parameters : none
*/

app.get("/users",(req,res)=>{
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

app.post("/users",(req,res)=>{
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

//Here ":id" is way of getting any params in route
app.get("/users/:id",(req,res)=>{
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
})

app.get("*",(req,res)=>{
    res.status(404).json({
        message:"This route does not exist"
    })
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})