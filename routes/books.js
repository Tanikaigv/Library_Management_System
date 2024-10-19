const express = require("express");
const { books } = require("../data/books.json");
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

/* 
   Route : /books/issued,
   Method : GET,
   Description : Getting all the issued books.
   Parameters : None.
*/

router.get("/issued",(req,res)=>{
    const userWithIssuedBooks = users.filter((each)=>{
        if(each.issuedbook) return each;
    });
    const booksIssued = [];
    userWithIssuedBooks.forEach((each)=>{
        const book = books.find((book)=>book.id === each.issuedbook);
        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        booksIssued.push(book);
    });
    res.status(200).json({
        success:"true",
        message:"All Issued Books are displayed",
        data:booksIssued
    });
})



/* 
   Route : /books/id,
   Method : GET,
   Description : Getting books by id.
   Parameters : Id.
*/

router.get("/:id",(req,res)=>{
    const { id } = req.params;
    const book = books.find((each)=> each.id === id);
    if(!book){
        return res.status(404).json({
            success: false,
            message: "Book with this id doesn't exists"
        })
    }
    return res.status(200).json({
        success:true,
        message: "Book exists",
        data: book
    });
})

/* 
   Route : /books/id,
   Method : POST,
   Description : Creating new books.
   Parameters : none.
*/

router.post("/",(req,res)=>{
    const { id,name,author,genre,price,publisher} = req.body;
    books.push({
        id,
        name,
        author,
        genre,
        price,
        publisher
    })
    return res.status(200).json({
        success: true,
        message: "Book created successfully",
        data: books
    })
});


module.exports = router;