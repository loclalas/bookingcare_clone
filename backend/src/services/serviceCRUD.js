import bcrypt from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPasswordFromBcryt = await hasdUserPassword(data.password);

      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcryt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
        phonenumber: data.phonenumber,
      });

      resolve("da tao thanh cong");
    } catch (error) {
      reject(error);
    }
  });
};

let hasdUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPassword = await bcrypt.hashSync(password, salt);

      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findAll({
        raw: true,
      });

      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

let getInfoById = (userID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userID },
        raw: true,
      });

      if (user) {
        resolve(user);
      }
      resolve("User not found");
    } catch (error) {
      reject(error);
    }
  });
};

let updateUserInfo = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });

      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phonenumber = data.phonenumber;

        await user.save();

        let allUsers = db.User.findAll();
        resolve(allUsers);
      }
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

let deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: userId },
      });

      if (user) {
        await user.destroy();

        let allUsers = await db.User.findAll();
        resolve(allUsers);
      }
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getInfoById: getInfoById,
  updateUserInfo: updateUserInfo,
  deleteUserById: deleteUserById,
};
