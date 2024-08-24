const express = require("express");

const { users } = require("./data/user.json");
const { books } = require("./data/books.json");

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

/* 
   Route : /users/:id,
   Method : GET,
   Description : Getting user by their ID.
   Parameters : ID.
*/

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
});

/* 
   Route : /users/:id,
   Method : PUT,
   Description : Updating user by their ID.
   Parameters : ID.
*/

app.put("/users/:id",(req,res)=>{
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
   Route : /books,
   Method : GET,
   Description : Getting all the books.
   Parameters : none.
*/

app.get("/books",(req,res)=>{
    res.status(200).json({
        success:true,
        bookData:books 
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