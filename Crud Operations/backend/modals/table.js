var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var self_modal = new Schema({
    email: String,
    pass: String,
    PN: String,
    C: String,
    nm: String

});

module.exports = mongoose.model('Seen', self_modal);
