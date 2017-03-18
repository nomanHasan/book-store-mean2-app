var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

var Schema = mongoose.Schema;

var BookSchema = new Schema({
    title: {type: String, required: "Title is required"},
    isbn : {type: Number },
    pub_date: {type: Date},
    price: {type: Number},
    pub_house: {type: String},
    author: {type: Schema.Types.ObjectId, ref: 'Author'},
    coverImage: {type: String}
})

BookSchema.plugin(mongoosePaginate);

var Book = mongoose.model('Book', BookSchema);

module.exports = Book;