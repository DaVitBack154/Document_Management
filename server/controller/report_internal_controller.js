const report_internal_model = require('../model/report_internal_model')

module.exports.reportInternal = async (req, res) => {

    let { year, month } = req.query;
    let details = await report_internal_model.reportInternal(year, month);
    if (details.length < 1) {
        return res.json({ status: false, message: "Not found information" })
    }
    return res.json({ status: true, data: details[0] })
}