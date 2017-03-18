var Author = require("../models/author");

exports.getAuthors = function(page, limit, next){
    Author.paginate({}, {page: page, limit: limit}, function(err, results){
        if(err){
            console.log(err);
            return next(err, null);
        }
        return next(null, results);
    })
}

exports.getAuthorById = function(id, next){
    Author.findById(id, function(err, author){
        if(err){
            console.log(err);
            return next(err, null);
        }
        return next(null, author);
    })
}

exports.addAuthor = function(author, next){
    author.save(function(err){
        if(err){
            return next(err);
        }
        return next(null);
    })
}

exports.updateAuthorById = function(id, author, next){
    Author.findByIdAndUpdate(id, author, function(err){
        if(err){
            return next(err);
        }
        return next(null);
    })
}

exports.updateAuthorImage = function(id, filename, next){
    Author.update({_id: id}, {profilePhoto: filename}, function(err){
        if(err){
            console.log(err);
            return next(err);
        }
        return next(null);
    })
}