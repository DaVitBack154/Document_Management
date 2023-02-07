const manual = require('../model/manual.model');

module.exports.Getmanual = async (req, res) => {
  let data = await manual.Getmanual();
  if (data.length < 0) {
    return res.json({ status: false, message: 'Not found information' });
  }
  return res.json({ status: true, data: data });
};

module.exports.Createmanual = async (req, res) => {
  let body = req.body;
  let regisdata = await manual.Createmanual(body);
  if (regisdata == false)
    return res.json({ status: false, message: 'failed to insert' });
  return res.json({ status: true, message: 'successfully', data: regisdata });
};

module.exports.UpdatemanualByID = async (req, res) => {
  let { id } = req.params;
  let body = req.body;
  let update = await manual.UpdatemanualByID(id, body);
  if (update == false) {
    return res.json({ status: false, message: 'Update Failed' });
  }
  return res.json({ status: true, message: 'Update Successfuly' });
};

module.exports.GetmanualID = async (req, res) => {
  let { id } = req.params;
  let data = await manual.GetmanualID(id);
  if (data.length < 1) {
    return res.json({ status: false, message: 'Not found information' });
  }
  return res.json({ status: true, data: data[0] });
};
