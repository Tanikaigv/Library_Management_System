const express = require("express");

// const { users } = require("./data/user.json");
// const { books } = require("./data/books.json");

const  userRouter  = require("./routes/user.js");
const  booksRouter = require("./routes/books.js");

const app = express();

const PORT = 8081;
app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Server is up and running :-)"
    });
});

app.use("/users",userRouter);
// app.use("/books",booksRouter);


app.get("*",(req,res)=>{
    res.status(404).json({
        message:"This route does not exist"
    })
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})