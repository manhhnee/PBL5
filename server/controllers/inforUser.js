const inforUser = require("../models/inforUser");
const InforUserModel = require("../models/inforUser");
class InforUserController {
  getInforUser(req, res, next) {
    InforUserModel.findWithAccountId(req.user.id, function (data) {
      res.json({ user: data, role: req.user.role, success: true });
    });
  }
  getListStaff(req, res, next) {
    InforUserModel.getListStaff(function (data) {
      res.json(data);
    });
  }
  deleteStaff(req, res, next) {
    InforUserModel.deleteStaff(req.params.idAccount, function (data) {
      res.json(data);
    });
  }
  addStaff(req, res, next) {
    const avatarPath = req.file
      ? `https://pbl5-server-shpk.onrender.com/${req.file.path}`
      : null;
    InforUserModel.addStaff(req.body, avatarPath, function (data) {
      res.json(data);
    });
  }
  updateStaff(req, res, next) {
    const id_Account = req.params.id_Account;
    const avatarPath = req.file
      ? `https://pbl5-server-shpk.onrender.com/${req.file.path}`
      : null;
    const data = req.body;
    InforUserModel.update(id_Account, avatarPath, data, function (data) {
      res.json(data);
    });
  }
  FindInforUser(req, res, next) {
    InforUserModel.findWithAccountId(req.params.id, function (data) {
      res.json(data);
    });
  }
  update(req, res, next) {
    const id_Account = req.user.id;
    const avatarPath = req.file
      ? `https://pbl5-server-shpk.onrender.com/${req.file.path}`
      : null;
    const data = req.body;
    InforUserModel.update(id_Account, avatarPath, data, function (data) {
      res.json(data);
    });
  }
}
module.exports = new InforUserController();
