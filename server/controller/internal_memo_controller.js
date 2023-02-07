const internalmodel = require('../model/internal.model')

module.exports.Getinternalmemo = async (req, res) => {
    let { year, month } = req.query;
    let data = await internalmodel.Getinternalmemo(year, month)
    return res.json({ status: true, data: data });
}


module.exports.Getdatainternalmemoall = async (req, res) => {
    let data = await internalmodel.Getdatainternalmemoall()
    if (data.length < 0) {
        return res.json({ status: false, message: 'Not found information' })
    }
    return res.json({ status: true, data: data });
}
module.exports.Createinternalmemo = async (req, res) => {
    let body = req.body;
    let duplicatenumber = await internalmodel.Lastnumberbook(body.number_book)
    if (duplicatenumber.length > 0) {
        return res.json({ status: false, message: "Dupliucate number" })
    }

    let memodata = await internalmodel.Createinternalmemo(body)
    if (memodata == false)
        return res.json({ status: false, message: "failed to insert" });
    return res.json({ status: true, message: 'successfully', data: memodata })
}
module.exports.Lastnumberbook = async (req, res) => {
    let query = req.query
    let data = await internalmodel.Lastnumberbook(query.number_book, query.type_data)
    return res.json({ status: true, data: data })
}


module.exports.GetinternalmemoID = async (req, res) => {
    let { id } = req.params;
    let data = await internalmodel.GetinternalmemoID(id)
    if (data.length < 1) {
        return res.json({ status: false, message: "Not found information" });
    }
    return res.json({ status: true, data: data[0] });
}

module.exports.UpdateinternalmemoID = async (req, res) => {
    let { id } = req.params;
    let body = req.body
    let update = await internalmodel.UpdateinternalmemoID(id, body);
    console.log(update)
    if (update == false) {
        return res.json({ status: false, message: "Update Failed" })
    }
    return res.json({ status: true, message: "Update Successfuly" })
}
