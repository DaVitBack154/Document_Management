const rulecard = require('../model/rulecard.model');

module.exports.Getrulecard = async (req, res) => {
  let data = await rulecard.Getrulecard();
  if (data.length < 0) {
    return res.json({ status: false, message: 'Not found information' });
  }
  return res.json({ status: true, data: data });
};

module.exports.Createrulecard = async (req, res) => {
  let body = req.body;
  let regisdata = await rulecard.Createrulecard(body);
  if (regisdata == false)
    return res.json({ status: false, message: 'failed to insert' });
  return res.json({ status: true, message: 'successfully', data: regisdata });
};

module.exports.UpdaterulecardByID = async (req, res) => {
  let { id } = req.params;
  let body = req.body;
  let update = await rulecard.UpdaterulecardByID(id, body);
  if (update == false) {
    return res.json({ status: false, message: 'Update Failed' });
  }
  return res.json({ status: true, message: 'Update Successfuly' });
};

module.exports.GetrulecardID = async (req, res) => {
  let { id } = req.params;
  let data = await rulecard.GetrulecardID(id);
  if (data.length < 1) {
    return res.json({ status: false, message: 'Not found information' });
  }
  return res.json({ status: true, data: data[0] });
};
