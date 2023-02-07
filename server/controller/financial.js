const financial = require('../model/financial.model')

module.exports.Getfinancial = async (req, res) => {
    let data = await financial.Getfinancial()
    if (data.length < 0) {
        return res.json({ status: false, message: 'Not found information' })
    }
    return res.json({ status: true, data: data });
}

module.exports.Createfinancial = async (req, res) => {
    let body = req.body;
    let regisdata = await financial.Createfinancial(body)
    if (regisdata == false)
        return res.json({ status: false, message: "failed to insert" });
    return res.json({ status: true, message: 'successfully', data: regisdata })
}

module.exports.UpdatefinancialByID = async (req, res) => {
    let { id } = req.params;
    let body = req.body
    let update = await financial.UpdatefinancialByID(id, body);
    if (update == false) {
        return res.json({ status: false, message: "Update Failed" })
    }
    return res.json({ status: true, message: "Update Successfuly" })
}

module.exports.GetfinancialID = async (req, res) => {
    let { id } = req.params;
    let data = await financial.GetfinancialID(id)
    if (data.length < 1) {
        return res.json({ status: false, message: "Not found information" });
    }
    return res.json({ status: true, data: data[0] });
}