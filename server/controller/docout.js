const docout = require('../model/docout.model');

module.exports.Getdocout = async (req, res) => {
  let data = await docout.Getdocout();
  if (data.length < 0) {
    return res.json({ status: false, message: 'Not found information' });
  }
  return res.json({ status: true, data: data });
};

module.exports.Createdocout = async (req, res) => {
  let body = req.body;
  let regisdata = await docout.Createdocout(body);
  if (regisdata == false)
    return res.json({ status: false, message: 'failed to insert' });
  return res.json({ status: true, message: 'successfully', data: regisdata });
};

module.exports.UpdatedocoutByID = async (req, res) => {
  let { id } = req.params;
  let body = req.body;
  let update = await docout.UpdatedocoutByID(id, body);
  if (update == false) {
    return res.json({ status: false, message: 'Update Failed' });
  }
  return res.json({ status: true, message: 'Update Successfuly' });
};

module.exports.GetdocoutID = async (req, res) => {
  let { id } = req.params;
  let data = await docout.GetdocoutID(id);
  if (data.length < 1) {
    return res.json({ status: false, message: 'Not found information' });
  }
  return res.json({ status: true, data: data[0] });
};
