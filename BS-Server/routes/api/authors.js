var express = require("express");
var router = express.Router();

var Author = require('../../models/author');

var authorService = require("../../services/author-service");

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

    // console.log(page+" "+ limit);
    
    authorService.getAuthors(page,limit, function(err, results){
        if(err){
            console.log(err);
            return res.json({success: false, err: err});
        }
        return res.json({success:true, results })
    })
})

router.post('/', function(req, res, next){
    var newAuthor = new Author({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        initials: req.body.initials,
        address: req.body.address,
        zip_code: Number(req.body.zip_code),
        country: req.body.country
    })
    if(!newAuthor.zip_code>0){
        newAuthor.zip_code = 0;
    }
    authorService.addAuthor(newAuthor, function(err){
        if(err){
            console.log(err);
            return res.json({success: false, err: err});
        }
        return res.json({success: true });
    })
})


router.get('/:id', function(req, res, next){
    var id = req.params.id;
    authorService.getAuthorById(id, function(err, results){
        if(err){
            console.log(err);
            return res.json({success: false, err: err});
        }
        return res.json({success:true, results })
    })
})

router.put('/:id', function(req, res, next){
    var id = req.params.id;
    var newAuthor = new Author({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        initials: req.body.initials,
        address: req.body.address,
        zip_code: Number(req.body.zip_code),
        country: req.body.country
    })
    if(!newAuthor.zip_code>0){
        newAuthor.zip_code = 0;
    }
    newAuthor._id = id;
    authorService.updateAuthorById(id, newAuthor, function(err, results){
        if(err){
            return res.json({success: false, err: err});
        }
        return res.json({success: true });
    })
})

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

        authorService.updateAuthorImage(id, req.file.filename, function(err){
            if(err){
                console.log(err);
                return res.json({success: false, err: "Cover Image Data could not be updated. "});
            }
            return res.json({success:true});    
        })
    });
});


module.exports = router;