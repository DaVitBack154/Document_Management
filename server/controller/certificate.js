const certificate = require('../model/certificate.model')

module.exports.Getcertificate = async (req, res) => {
    let data = await certificate.Getcertificate()
    if (data.length < 0) {
        return res.json({ status: false, message: 'Not found information' })
    }
    return res.json({ status: true, data: data });
}

module.exports.Createcertificate = async (req, res) => {
    let body = req.body;
    let regisdata = await certificate.Createcertificate(body)
    if (regisdata == false)
        return res.json({ status: false, message: "failed to insert" });
    return res.json({ status: true, message: 'successfully', data: regisdata })
}

module.exports.UpdatecertificateByID = async (req, res) => {
    let { id } = req.params;
    let body = req.body
    let update = await certificate.UpdatecertificateByID(id, body);
    if (update == false) {
        return res.json({ status: false, message: "Update Failed" })
    }
    return res.json({ status: true, message: "Update Successfuly" })
}

module.exports.GetcertificateID = async (req, res) => {
    let { id } = req.params;
    let data = await certificate.GetcertificateID(id)
    if (data.length < 1) {
        return res.json({ status: false, message: "Not found information" });
    }
    return res.json({ status: true, data: data[0] });
}