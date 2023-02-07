const express = require('express');
const router = express.Router();
const doc_controll = require('../controller/doc_controller.js');
const internal_controller = require('../controller/internal_memo_controller');
const external_controller = require('../controller/external_controller');
const internaldoc_controller = require('../controller/internaldoc_controller');
const uploadController = require('../controller/upload.controller');
const reportInternalController = require('../controller/report_internal_controller');
const upload = require('../middleware/multerRepair');
const auth = require('../middleware/auth');
const regisdoc_controller = require('../controller/regisdoc');
const certificate_controller = require('../controller/certificate');
const financial_controller = require('../controller/financial');
const docmeet_controller = require('../controller/docmeet');
const organizational_controller = require('../controller/organizational');
const docpower_controller = require('../controller/docpower');
const rulecard_controller = require('../controller/rulecard');
const ethics_controller = require('../controller/ethics');
const manual_controller = require('../controller/manual');
const docout_controller = require('../controller/docout');
const sealcom_controller = require('../controller/sealcom');
const property_controller = require('../controller/property');

// =================authen==================================
router.post('/register', doc_controll.register);
router.post('/login', doc_controll.login);
router.post('/logout', doc_controll.logout);
router.get('/profile', auth.auth, doc_controll.Getprofile);
// =================authen==================================

// =============================internalmemo======================================
router.get('/internalmemo', internal_controller.Getinternalmemo);
router.get('/internalmemo-alldata', internal_controller.Getdatainternalmemoall);
router.post('/internalmemo-insert', internal_controller.Createinternalmemo);
router.get('/internalmemo/lastnumberbook', internal_controller.Lastnumberbook);
router.get('/internalmemo-get/:id', internal_controller.GetinternalmemoID);
router.put(
  '/internalmemo-update/:id',
  internal_controller.UpdateinternalmemoID
);
// ===========================report internal====================================
router.get('/report-internal', reportInternalController.reportInternal);
// ===========================report internal====================================
// =============================internalmemo======================================

// =============================externalmemo==========================================
router.get('/external', external_controller.Getexternal);
router.get('/external-alldata', external_controller.Getdataexternalall);
router.post('/external-insert', external_controller.Createexternal);
router.get('/external/lastnumberbook', external_controller.Lastnumberbook);
router.get('/external-get/:id', external_controller.GetexternalID);
router.put('/external-update/:id', external_controller.UpdateexternalID);
router.get('/report-external', external_controller.reportExternal);
// =============================externalmemo==========================================

// =============================internaldoc==========================================
router.get('/internaldoc', internaldoc_controller.Getinternaldoc);
router.get(
  '/internaldoc-alldata',
  internaldoc_controller.Getdatainternaldocall
);
router.post('/internaldoc-insert', internaldoc_controller.Createinternaldoc);
router.get(
  '/internaldoc/lastnumberbook',
  internaldoc_controller.Lastnumberbook
);
router.get('/internaldoc-get/:id', internaldoc_controller.GetinternaldocID);
router.put(
  '/internaldoc-update/:id',
  internaldoc_controller.UpdateinternaldocID
);
router.get('/report-internaldoc', internaldoc_controller.reportinternaldoc);
// =============================internaldoc==========================================

// =============================เอกสารทางทะเบียน==========================================
router.get('/regisdoc', regisdoc_controller.Getregisdoc);
router.post('/regisdoc-insert', regisdoc_controller.Createregisdoc);
router.put('/regisdoc-update/:id', regisdoc_controller.UpdateregisdocByID);
router.get('/regisdoc-get/:id', regisdoc_controller.GetregisdocID);
// =============================เอกสารทางทะเบียน==========================================

// =============================ใบอนุยาติหนังสือรับรอง==========================================
router.get('/certificate', certificate_controller.Getcertificate);
router.post('/certificate-insert', certificate_controller.Createcertificate);
router.put(
  '/certificate-update/:id',
  certificate_controller.UpdatecertificateByID
);
router.get('/certificate-get/:id', certificate_controller.GetcertificateID);
// =============================ใบอนุยาติหนังสือรับรอง==========================================

// =============================การเงิน==========================================
router.get('/financial', financial_controller.Getfinancial);
router.post('/financial-insert', financial_controller.Createfinancial);
router.put('/financial-update/:id', financial_controller.UpdatefinancialByID);
router.get('/financial-get/:id', financial_controller.GetfinancialID);
// =============================การเงิน==========================================

// =============================เอกสารการประชุม==========================================
router.get('/docmeet', docmeet_controller.Getdocmeet);
router.post('/docmeet-insert', docmeet_controller.Createdocmeet);
router.put('/docmeet-update/:id', docmeet_controller.UpdatedocmeetByID);
router.get('/docmeet-get/:id', docmeet_controller.GetdocmeetID);
// =============================เอกสารการประชุม==========================================

// =============================โครงสร้างองค์กร==========================================
router.get('/organizational', organizational_controller.Getorganizational);
router.post(
  '/organizational-insert',
  organizational_controller.Createorganizational
);
router.put(
  '/organizational-update/:id',
  organizational_controller.UpdateorganizationalByID
);
router.get(
  '/organizational-get/:id',
  organizational_controller.GetorganizationalID
);
// =============================โครงสร้างองค์กร==========================================

// =============================คู่มือมอบอำนาจ==========================================
router.get('/docpower', docpower_controller.Getdocpower);
router.post('/docpower-insert', docpower_controller.Createdocpower);
router.put('/docpower-update/:id', docpower_controller.UpdatedocpowerByID);
router.get('/docpower-get/:id', docpower_controller.GetdocpowerID);
// =============================คู่มือมอบอำนาจ==========================================

// =============================กฏบัตร-ขอบเขตอำนาจ==========================================
router.get('/rulecard', rulecard_controller.Getrulecard);
router.post('/rulecard-insert', rulecard_controller.Createrulecard);
router.put('/rulecard-update/:id', rulecard_controller.UpdaterulecardByID);
router.get('/rulecard-get/:id', rulecard_controller.GetrulecardID);
// =============================กฏบัตร-ขอบเขตอำนาจ==========================================

// =============================จรรยาบรรณธุรกิจ==========================================
router.get('/ethics', ethics_controller.Getethics);
router.post('/ethics-insert', ethics_controller.Createethics);
router.put('/ethics-update/:id', ethics_controller.UpdateethicsByID);
router.get('/ethics-get/:id', ethics_controller.GetethicsID);
// =============================จรรยาบรรณธุรกิจ==========================================

// =============================คู่มือ==========================================
router.get('/manual', manual_controller.Getmanual);
router.post('/manual-insert', manual_controller.Createmanual);
router.put('/manual-update/:id', manual_controller.UpdatemanualByID);
router.get('/manual-get/:id', manual_controller.GetmanualID);
// =============================คู่มือ==========================================

// =============================เอกสารที่ได้รับจากภายนอก==========================================
router.get('/docout', docout_controller.Getdocout);
router.post('/docout-insert', docout_controller.Createdocout);
router.put('/docout-update/:id', docout_controller.UpdatedocoutByID);
router.get('/docout-get/:id', docout_controller.GetdocoutID);
// =============================เอกสารที่ได้รับจากภายนอก==========================================

// =============================คู่มือ==========================================
router.get('/sealcom', sealcom_controller.Getsealcom);
router.post('/sealcom-insert', sealcom_controller.Createsealcom);
router.put('/sealcom-update/:id', sealcom_controller.UpdatesealcomByID);
router.get('/sealcom-get/:id', sealcom_controller.GetsealcomID);
// =============================คู่มือ==========================================

// =============================ทรัพย์สิน==========================================
router.get('/property', property_controller.Getproperty);
router.post('/property-insert', property_controller.Createproperty);
router.put('/property-update/:id', property_controller.UpdatepropertyByID);
router.get('/property-get/:id', property_controller.GetpropertyID);
// =============================ทรัพย์สิน==========================================

router.post(
  '/upload/repair',
  upload.single('image'),
  uploadController.uploadImage
);

module.exports = router;
