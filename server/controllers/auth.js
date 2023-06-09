const jwt = require("jsonwebtoken");

class AuthController {
  verifyToken(req, res, next) {
    // nếu có token hợp lệ thì tạo req.user = thông tin người dùng và đưa cho middware khác xử lí
    // Lấy header Authorization từ yêu cầu
    const tokenHeader = req.headers["authorization"];
    // Kiểm tra xem header Authorization có tồn tại hay không
    if (tokenHeader) {
      // Tách header Authorization ra và lấy token
      const token = tokenHeader.split(" ")[1];
      try {
        // Giải mã token
        const decoded = jwt.verify(token, "mk");
        // Lưu thông tin của người dùng vào request để sử dụng ở các middleware khác
        req.user = decoded;
        // Chuyển tiếp request đến middleware tiếp theo
        next();
      } catch (err) {
        // Token không hợp lệ
        return res.json({ success: false, message: "yêu cầu đăng nhập" });
      }
    } else {
      // Header Authorization không tồn tại
      return res.json({ success: false, message: "yêu cầu đăng nhập" });
    }
  }
  isAdmin(req, res, next) {
    if (req.user.role === "ADMIN") {
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "yêu cầu đăng nhập là admin" });
    }
  }
  isStaff(req, res, next) {
    if (req.user.role === "STAFF") {
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "yêu cầu đăng nhập là staff" });
    }
  }
  isCustomer(req, res, next) {
    if (req.user.role === "CUSTOMMER") {
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "yêu cầu đăng nhập là customer" });
    }
  }
  isAdminOrStaff(req, res, next) {
    if (req.user.role === "STAFF" || req.user.role === "ADMIN") {
      next();
    } else {
      return res
        .status(401)
        .json({
          success: false,
          message: "yêu cầu đăng nhập là nhân viên hoặc Admin",
        });
    }
  }
}

module.exports = new AuthController();
