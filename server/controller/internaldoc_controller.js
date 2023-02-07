const internaldocmodel = require('../model/internaldoc.model')

module.exports.Getinternaldoc = async (req, res) => {
    let { year, month } = req.query;
    let data = await internaldocmodel.Getinternaldoc(year, month)
    return res.json({ status: true, data: data });
}

module.exports.Getdatainternaldocall = async (req, res) => {
    let data = await internaldocmodel.Getdatainternaldocall()
    if (data.length < 0) {
        return res.json({ status: false, message: 'Not found information' })
    }
    return res.json({ status: true, data: data });
}

module.exports.Createinternaldoc = async (req, res) => {
    let body = req.body;
    let duplicatenumber = await internaldocmodel.Lastnumberbook(body.number_book)
    if (duplicatenumber.length > 0) {
        return res.json({ status: false, message: "Dupliucate number" })
    }

    let memodata = await internaldocmodel.Createinternaldoc(body)
    if (memodata == false)
        return res.json({ status: false, message: "failed to insert" });
    return res.json({ status: true, message: 'successfully', data: memodata })
}

module.exports.Lastnumberbook = async (req, res) => {
    let query = req.query
    let data = await internaldocmodel.Lastnumberbook(query.number_book, query.type_data)
    return res.json({ status: true, data: data })
}

module.exports.GetinternaldocID = async (req, res) => {
    let { id } = req.params;
    let data = await internaldocmodel.GetinternaldocID(id)
    if (data.length < 1) {
        return res.json({ status: false, message: "Not found information" });
    }
    return res.json({ status: true, data: data[0] });
}
module.exports.UpdateinternaldocID = async (req, res) => {
    let { id } = req.params;
    let body = req.body
    let update = await internaldocmodel.UpdateinternaldocID(id, body);
    console.log(update)
    if (update == false) {
        return res.json({ status: false, message: "Update Failed" })
    }
    return res.json({ status: true, message: "Update Successfuly" })
}

module.exports.reportinternaldoc = async (req, res) => {

    let { year, month } = req.query;
    let details = await internaldocmodel.reportinternaldoc(year, month);
    if (details.length < 1) {
        return res.json({ status: false, message: "Not found information" })
    }
    return res.json({ status: true, data: details[0] })
}
