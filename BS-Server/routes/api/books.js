var express = require("express");
var router = express.Router();

var bookService = require("../../services/book-service");

var Book = require("../../models/book");


//Setting up Image Uploader
var multer = require("multer");
var publicImage = './public/images';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, publicImage)
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+".jpg")
  }
})

var upload = multer({ storage: storage }).single('file');


router.get('/', function(req, res, next){
    var page = Number(req.query.page);
    var limit = Number(req.query.limit);

    if(!page>0)page = 1;
    if(!limit>0)limit = 10;

    var authorId = req.query.authorId;
    if(authorId && authorId.length > 0){
        bookService.getBooksByAuthor({author: authorId}, page,limit, function(err, results){
        if(err){
            console.log(err);
            return res.json({success: false, err: err});
        }
        return res.json({success:true, results })
    })
    }else{
        bookService.getBooks({}, page,limit, function(err, results){
        if(err){
            console.log(err);
            return res.json({success: false, err: err});
        }
        return res.json({success:true, results })
    })
    }  
})

router.post('/', function(req, res, next){

    var newBook = new Book({
        title: req.body.title,
        isbn: Number(req.body.isbn),
        pub_date: new Date(req.body.pub_date),
        price: Number(req.body.price),
        pub_house: req.body.pub_house,
        author: req.body.authorId
    })

    if(!newBook.isbn>0){
        newBook.isbn = 0;
    }
    if(!newBook.price>0){
        newBook.price = 0;
    }

    if(!newBook.pub_date > new Date(0) ){
        newBook.pub_date = new Date();
    }

    // console.log(newBook);

    bookService.addBook(newBook, function(err){
        if(err){
            console.log(err);
            return res.json({success: false, err: err});
        }
        return res.json({success: true });
    })
})


router.get('/:id', function(req, res, next){
    var id = req.params.id;
    bookService.getBookById(id, function(err, results){
        if(err){
            console.log(err);
            return res.json({success: false, err: err});
        }
        return res.json({success:true, results })
    })
})

router.put('/:id', function(req, res, next){
    var id = req.params.id;

    var newBook = new Book({
        title: req.body.title,
        isbn: Number(req.body.isbn),
        pub_date: new Date(req.body.pub_date),
        price: Number(req.body.price),
        pub_house: req.body.pub_house,
        author: req.body.authorId
    })

    if(!newBook.isbn>0){
        newBook.isbn = 0;
    }
    if(!newBook.price>0){
        newBook.price = 0;
    }

    if(!newBook.pub_date > new Date(0) ){
        newBook.pub_date = new Date();
    }

    // console.log(newBook);

    //Setting the id
    newBook._id = id;

    bookService.updateBookById(id, newBook, function(err){
        if(err){
            console.log(err);
            return res.json({success: false, err: err});
        }
        return res.json({success: true });
    })
});

router.post('/upload/:id', function(req, res) {
    console.log("Upload REQ");
    var id = req.params.id;
    upload(req,res,function(err){
        console.log("UPLOAD");
        console.log(req.file);
        if(err){
            console.log(err);
            return res.json({error_code:1,err_desc:err});
        }
        console.log(req.file.filename);

        bookService.updateBookImage(id, req.file.filename, function(err){
            if(err){
                console.log(err);
                return res.json({success: false, err: "Cover Image Data could not be updated. "});
            }
            return res.json({success:true});    
        })
    });
});


module.exports = router;