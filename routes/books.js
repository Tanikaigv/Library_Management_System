const express = require("express");
const { users } = require("../data/user.json");

const router = express.Router();

/* 
   Route : /books,
   Method : GET,
   Description : Getting all the books.
   Parameters : none.
*/

router.get("/books",(req,res)=>{
    res.status(200).json({
        success:true,
        bookData:books 
    })
})

module.exports = router;