const organizational = require('../model/organizational.model')

module.exports.Getorganizational = async (req, res) => {
    let data = await organizational.Getorganizational()
    if (data.length < 0) {
        return res.json({ status: false, message: 'Not found information' })
    }
    return res.json({ status: true, data: data });
}

module.exports.Createorganizational = async (req, res) => {
    let body = req.body;
    let regisdata = await organizational.Createorganizational(body)
    if (regisdata == false)
        return res.json({ status: false, message: "failed to insert" });
    return res.json({ status: true, message: 'successfully', data: regisdata })
}

module.exports.UpdateorganizationalByID = async (req, res) => {
    let { id } = req.params;
    let body = req.body
    let update = await organizational.UpdateorganizationalByID(id, body);
    if (update == false) {
        return res.json({ status: false, message: "Update Failed" })
    }
    return res.json({ status: true, message: "Update Successfuly" })
}

module.exports.GetorganizationalID = async (req, res) => {
    let { id } = req.params;
    let data = await organizational.GetorganizationalID(id)
    if (data.length < 1) {
        return res.json({ status: false, message: "Not found information" });
    }
    return res.json({ status: true, data: data[0] });
}