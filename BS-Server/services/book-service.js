var Book = require('../models/book');
var fs = require("fs");

exports.getBooks = function(query, page, limit, next){
    Book.paginate(query, {populate: {path: 'author', select: 'firstName lastName'}, page:page, limit: limit}, function(err, results){
        if(err){
            console.log(err);
            return next(err, null);
        }
        next(null, results);
    })
}

exports.getBookById = function(id, next){
    Book.findById(id)
    .populate('author', 'firstName lastName')
    .exec(function(err, book){
        if(err){
            console.log(err);
            return next(err, null);
        }
        return next(null, book);
    })
}

exports.getBooksByAuthor = function(query, page, limit, next){
    Book.paginate(query, { page:page, limit: limit}, function(err, results){
        if(err){
            console.log(err);
            return next(err, null);
        }
        next(null, results);
    })
}

exports.addBook = function(book, next){
    book.save(function(err){
        if(err){
            return next(err);
        }
        return next(null);
    })
}

exports.updateBookById = function(id, newBook, next){
    Book.findByIdAndUpdate(id, newBook, function(err){
        if(err){
            return next(err);
        }
        return next(null);
    })
}

exports.updateBookImage = function(id, filename, next){

    Book.findById(id, function(err, book){
        if(book.coverImage){
            fs.unlinkSync(__dirname+"/../public/images/"+book.coverImage);
        }
        book.coverImage = filename;
        book.save(function(err){
            if(err){
                console.log(err);
                return next(err);
            }
            return next(null);
        })
    })
}