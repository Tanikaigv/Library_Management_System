const express = require("express");

const {UserModel,BookModel} = require("../models/index");

const {GetAllBooks,GetBookById} = require("../controllers/book-controller");

// const { books } = require("../data/books.json");
// const { users } = require("../data/user.json");

const router = express.Router();


/* 
   Route : /books,
   Method : GET,
   Description : Getting all the books.
   Parameters : none.
*/

router.get("/",GetAllBooks);


/* 
   Route : /books/id,
   Method : GET,
   Description : Getting books by id.
   Parameters : Id.
*/

router.get("/:id",GetBookById);

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
   Route : /books,
   Method : POST,
   Description : Creating new books.
   Parameters : none.
*/

router.post("/",(req,res)=>{
    const {data} = req.body;
    const book = books.find((each)=> each.id === data.id)
    if(book){
        return res.status(400).json({
            success:false,
            message:"Book with this ID already Exists",
        })
    }
    const allBooks = {...books,data};
    return res.status(200).json({
        success:true,
        message:"Book Created Successfully",
        data:allBooks
    })
})

/* 
   Route : /books/id,
   Method : PUT,
   Description : Updating the Books.
   Parameters : id.
   datas: id,name,author,genre,price,publisher
*/

router.put('/updateBooks/:id',(req,res)=>{
    const {id} = req.params;
    const book = books.find((each)=>each.id === id);
    const {data} = req.body;
    if(!data){
        return res.status(400).json({
            success:false,
            message:"No datas to Update"
        })
    }
    if(!book){
        return res.status(400).json({
            success:false,
            message:"Book with this Id doesn't exists"
        })
    }
    const updateBook = books.map((each)=>{
        if(each.id === id){
            return{
                ...each,
                ...data
            }
        }
        return each;
    })
    return res.status(201).json({
        succes:true,
        message:"Book Updated Successfully",
        data:updateBook
    })
})
module.exports = router;