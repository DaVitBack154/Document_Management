const regismodel = require('../model/regisdoc.model')

module.exports.Getregisdoc = async (req, res) => {
    let data = await regismodel.Getregisdoc()
    if (data.length < 0) {
        return res.json({ status: false, message: 'Not found information' })
    }
    return res.json({ status: true, data: data });
}

module.exports.Createregisdoc = async (req, res) => {
    let body = req.body;
    let regisdata = await regismodel.Createregisdoc(body)
    if (regisdata == false)
        return res.json({ status: false, message: "failed to insert" });
    return res.json({ status: true, message: 'successfully', data: regisdata })
}

module.exports.UpdateregisdocByID = async (req, res) => {
    let { id } = req.params;
    let body = req.body
    let update = await regismodel.UpdateregisdocByID(id, body);
    if (update == false) {
        return res.json({ status: false, message: "Update Failed" })
    }
    return res.json({ status: true, message: "Update Successfuly" })
}

module.exports.GetregisdocID = async (req, res) => {
    let { id } = req.params;
    let data = await regismodel.GetregisdocID(id)
    if (data.length < 1) {
        return res.json({ status: false, message: "Not found information" });
    }
    return res.json({ status: true, data: data[0] });
}