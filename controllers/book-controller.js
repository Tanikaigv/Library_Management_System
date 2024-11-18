const {UserModel,BookModel} = require("../models/index");

exports.GetAllBooks = async(req,res) => {
    const book = await BookModel.find();
    if(book.length === 0){
        return res.status(404).json({
            success: false,
            message:"No Books Found"
        })
    }
    res.status(200).json({
        success:true,
        message:"Books Found",
        data: book
    })
}

exports.GetBookById = async(req,res) => {
    const { id } = req.params;
    const book = await BookModel.findById(id);
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
}