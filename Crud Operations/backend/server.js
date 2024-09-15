const express = require("express");
const app = express();
const port = 1000;
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
// const table = require("./modals/table");

// const fileupload = require("express-fileupload");

// app.use(fileupload({ createParentPath: true }));
// app.use(express.static("files"));
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(function (req, res, next) {
    console.info(`${req.method} ${req.originalUrl}`)
    next();
})
main().catch(err => console.log(err, 'err'));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/table');
}

app.use(cors());
app.listen(port, () => console.log(`server running in port ${port}`));

app.use(express.static(__dirname));
app.use('/files', express.static('public'))


app.use(require('./routes/table_Route'));



