var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var mongoosePaginate = require('mongoose-paginate');


var AuthorSchema = new Schema({
    firstName: {type: String, required: "First Name is required"},
    lastName: {type: String, required: "Last Name is required"},
    initials: {type: String },
    address: {type: String},
    zip_code: {type: Number},
    country: {type: String},
    profilePhoto: {type: String}
})

AuthorSchema.plugin(mongoosePaginate);
var Author = mongoose.model('Author', AuthorSchema);

module.exports = Author ;