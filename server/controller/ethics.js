const ethics = require('../model/ethics.model');

module.exports.Getethics = async (req, res) => {
  let data = await ethics.Getethics();
  if (data.length < 0) {
    return res.json({ status: false, message: 'Not found information' });
  }
  return res.json({ status: true, data: data });
};

module.exports.Createethics = async (req, res) => {
  let body = req.body;
  let regisdata = await ethics.Createethics(body);
  if (regisdata == false)
    return res.json({ status: false, message: 'failed to insert' });
  return res.json({ status: true, message: 'successfully', data: regisdata });
};

module.exports.UpdateethicsByID = async (req, res) => {
  let { id } = req.params;
  let body = req.body;
  let update = await ethics.UpdateethicsByID(id, body);
  if (update == false) {
    return res.json({ status: false, message: 'Update Failed' });
  }
  return res.json({ status: true, message: 'Update Successfuly' });
};

module.exports.GetethicsID = async (req, res) => {
  let { id } = req.params;
  let data = await ethics.GetethicsID(id);
  if (data.length < 1) {
    return res.json({ status: false, message: 'Not found information' });
  }
  return res.json({ status: true, data: data[0] });
};
