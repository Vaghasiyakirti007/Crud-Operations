const table = require('../modals/table');
const ObjectId = require('mongoose').Types.ObjectId;


module.exports.Seen = async function (req, res) {
    try {
        var objModal = new table(req.body);
        await objModal.save()
        var check = await table.find({});
        res.send({ status: "success", data: check });
    } catch (error) {
        console.log(error, 'error add data');
    }
};


// AA BE LINE BADHA MA AAVSE UPDATE DATA AAPSE

// var check = await table.find({});
// res.send({ status: "success", data: check });


module.exports.page = async function (req, res) {
    try {
        var check = await table.find({});
        if (check) {
            res.send({ status: "success", data: check });
        } else {
            res.send({ status: "data not found" });
        }
    } catch (error) {
        console.log(error, 'error add data');
    }
};

module.exports.update = async function (req, res) {
    try {
        // var objModal = new Seen(req.body);
        // await objModal.save()
        await table.updateOne({ "_id": new ObjectId(req.body._id) }, { $set: { "email": req.body.email, "pass": req.body.pass, "PN": req.body.PN, "C": req.body.C, "nm": req.body.nm } });
        var check = await table.find({});
        res.send({ status: "success", data: check });
    } catch (error) {
        console.log(error, 'error add data');
    }
};


module.exports.delete = async function (req, res) {
    try {
        // var objModal = new Seen(req.body);
        // await objModal.save()
        await table.deleteOne({ "_id": new ObjectId(req.query._id) });
        var check = await table.find({});
        res.send({ status: "success", data: check });
    } catch (error) {
        console.log(error, 'error add data');
    }
};