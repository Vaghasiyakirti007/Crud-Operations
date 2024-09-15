const express = require('express');
var Ctrl = require('../controllers/table_Ctrl');
// var Ctrl = require('../controllers/page_Ctrl');



var app = module.exports = express.Router();
app.route('/api/Seen').post(Ctrl.Seen);

// update data
app.route('/api/update').post(Ctrl.update);
app.route('/api/delete').delete(Ctrl.delete);
app.route('/api/page').get(Ctrl.page);

