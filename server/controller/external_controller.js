const externalmodel = require('../model/external.model')

module.exports.Getexternal = async (req, res) => {
    let { year, month } = req.query;
    let data = await externalmodel.Getexternal(year, month)
    return res.json({ status: true, data: data });
}
module.exports.Getdataexternalall = async (req, res) => {
    let data = await externalmodel.Getdataexternalall()
    if (data.length < 0) {
        return res.json({ status: false, message: 'Not found information' })
    }
    return res.json({ status: true, data: data });
}

module.exports.Createexternal = async (req, res) => {
    let body = req.body;
    let duplicatenumber = await externalmodel.Lastnumberbook(body.number_book)
    if (duplicatenumber.length > 0) {
        return res.json({ status: false, message: "Dupliucate number" })
    }

    let memodata = await externalmodel.Createexternal(body)
    if (memodata == false)
        return res.json({ status: false, message: "failed to insert" });
    return res.json({ status: true, message: 'successfully', data: memodata })
}
module.exports.Lastnumberbook = async (req, res) => {
    let query = req.query
    let data = await externalmodel.Lastnumberbook(query.number_book, query.type_data)
    return res.json({ status: true, data: data })
}

module.exports.GetexternalID = async (req, res) => {
    let { id } = req.params;
    let data = await externalmodel.GetexternalID(id)
    if (data.length < 1) {
        return res.json({ status: false, message: "Not found information" });
    }
    return res.json({ status: true, data: data[0] });
}
module.exports.UpdateexternalID = async (req, res) => {
    let { id } = req.params;
    let body = req.body
    let update = await externalmodel.UpdateexternalID(id, body);
    console.log(update)
    if (update == false) {
        return res.json({ status: false, message: "Update Failed" })
    }
    return res.json({ status: true, message: "Update Successfuly" })
}

module.exports.reportExternal = async (req, res) => {

    let { year, month } = req.query;
    let details = await externalmodel.reportExternal(year, month);
    if (details.length < 1) {
        return res.json({ status: false, message: "Not found information" })
    }
    return res.json({ status: true, data: details[0] })
}
