const sealcom = require('../model/sealcom.model');

module.exports.Getsealcom = async (req, res) => {
  let data = await sealcom.Getsealcom();
  if (data.length < 0) {
    return res.json({ status: false, message: 'Not found information' });
  }
  return res.json({ status: true, data: data });
};

module.exports.Createsealcom = async (req, res) => {
  let body = req.body;
  let regisdata = await sealcom.Createsealcom(body);
  if (regisdata == false)
    return res.json({ status: false, message: 'failed to insert' });
  return res.json({ status: true, message: 'successfully', data: regisdata });
};

module.exports.UpdatesealcomByID = async (req, res) => {
  let { id } = req.params;
  let body = req.body;
  let update = await sealcom.UpdatesealcomByID(id, body);
  if (update == false) {
    return res.json({ status: false, message: 'Update Failed' });
  }
  return res.json({ status: true, message: 'Update Successfuly' });
};

module.exports.GetsealcomID = async (req, res) => {
  let { id } = req.params;
  let data = await sealcom.GetsealcomID(id);
  if (data.length < 1) {
    return res.json({ status: false, message: 'Not found information' });
  }
  return res.json({ status: true, data: data[0] });
};
