import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
require("dotenv").config();

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const registerService = ({
  fullname,
  phone,
  address,
  username,
  password,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const responseUser = await db.User.findOrCreate({
        where: { username },
        defaults: {
          username,
          password: hashPassword(password),
        },
      });
      const responseInfor = await db.InforUser.findOrCreate({
        where: { phone },
        defaults: {
          fullname,
          phone,
          address,
        },
      });
      const token =
        responseUser[1] &&
        jwt.sign(
          {
            id: responseUser[0].id,
            phone: responseInfor[0].phone,
            username: responseUser[0].username,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "2d",
          }
        );
      resolve({
        err: token ? 0 : 2,
        msg: token
          ? "Register is successfully"
          : "Phone number has been already used",
        token: token || null,
      });
    } catch (error) {
      reject(error);
    }
  });

export const loginService = ({ username, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { username },
        raw: true,
      });
      const isCorrectPassword =
        response && bcrypt.compareSync(password, response.password);
      const token =
        isCorrectPassword &&
        jwt.sign(
          { id: response.id, username: response.username },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );
      resolve({
        err: token ? 0 : 2,
        msg: token
          ? "Login is successfully !"
          : response
          ? "Password is wrong !"
          : "username number not found !",
        token: token || null,
      });
    } catch (error) {
      reject(error);
    }
  });
