const docmeet = require('../model/docmeet.model')

module.exports.Getdocmeet = async (req, res) => {
    let data = await docmeet.Getdocmeet()
    if (data.length < 0) {
        return res.json({ status: false, message: 'Not found information' })
    }
    return res.json({ status: true, data: data });
}

module.exports.Createdocmeet = async (req, res) => {
    let body = req.body;
    let regisdata = await docmeet.Createdocmeet(body)
    if (regisdata == false)
        return res.json({ status: false, message: "failed to insert" });
    return res.json({ status: true, message: 'successfully', data: regisdata })
}

module.exports.UpdatedocmeetByID = async (req, res) => {
    let { id } = req.params;
    let body = req.body
    let update = await docmeet.UpdatedocmeetByID(id, body);
    if (update == false) {
        return res.json({ status: false, message: "Update Failed" })
    }
    return res.json({ status: true, message: "Update Successfuly" })
}

module.exports.GetdocmeetID = async (req, res) => {
    let { id } = req.params;
    let data = await docmeet.GetdocmeetID(id)
    if (data.length < 1) {
        return res.json({ status: false, message: "Not found information" });
    }
    return res.json({ status: true, data: data[0] });
}