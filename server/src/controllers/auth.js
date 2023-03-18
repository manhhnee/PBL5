import * as authService from "../services/auth";

export const register = async (req, res) => {
  const { name, phone, address, userName, password } = req.body;
  try {
    if (!name || !phone || !address || !userName || !password)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs !",
      });

    const response = await authService.registerService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at auth controller " + error,
    });
  }
};

export const login = async (req, res) => {
  const { userName, password } = req.body;
  try {
    if (!userName || !password)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs !",
      });

    const response = await authService.loginService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at auth controller " + error,
    });
  }
};
