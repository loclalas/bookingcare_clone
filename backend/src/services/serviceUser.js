import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

const handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      const isExist = await checkUserEmail(email);

      // if (isExist) {
      //   //Check Lại một lần nữa nếu không may user bị xóa:
      //   const user = await db.User.findOne({
      //     attributes: ["email", "roleId", "password"],
      //     where: { email: email },
      //     raw: true,
      //   });

      //   if (user) {
      //     const check = await bcrypt.compareSync(password, user.password);

      //     if (check) {
      //       userData.errCode = 0;
      //       userData.message = "";
      //       delete user.password;
      //       userData.user = user;
      //     } else {
      //       userData.errCode = 3;
      //       userData.message =
      //         "Khong nhap dung mat khau, vui long dang nhap lai";
      //       userData.user = {};
      //     }
      //   }
      // } else {
      //   userData.errCode = 2;
      //   userData.message = "Email khong ton tai, vui long kiem tra lai";
      // }

      if (!isExist) {
        userData.errCode = 2;
        userData.message = "Email khong ton tai, vui long kiem tra lai";
        return resolve(userData);
      }

      const user = await db.User.findOne({
        attributes: [
          "id",
          "email",
          "roleId",
          "password",
          "firstName",
          "lastName",
        ],
        where: { email: email },
        raw: true,
      });

      if (!user) {
        return;
      }

      const check = await bcrypt.compareSync(password, user.password);

      if (!check) {
        userData.errCode = 3;
        userData.message = "Khong nhap dung mat khau, vui long dang nhap lai";
        userData.user = {};
        return resolve(userData);
      }

      userData.errCode = 0;
      userData.message = "";
      delete user.password;
      userData.user = user;

      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

const checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
        raw: true,
      });

      if (user) {
        return resolve(true);
      }

      resolve(false);
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

const getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = "";

      if (userId === "ALL") {
        user = await db.User.findAll();
      }

      if (userId && userId !== "ALL") {
        user = await db.User.findOne({
          where: { id: userId },
        });
      }

      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

const createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const check = await checkUserEmail(data.email);

      if (check) {
        return resolve({
          errCode: 1,
          message: "Email nay da ton tai",
        });
      }
      const hashPasswordFromBcryt = await hasdUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcryt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        gender: data.gender,
        positionId: data.position,
        roleId: data.role,
        phonenumber: data.phoneNumber,
        image: data.avatar,
      });

      resolve({
        errCode: 0,
        message: "tao tai khoan thanh cong",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: userId },
      });

      if (!user) {
        return resolve({
          errCode: 1,
          message: "Tai khoan khong ton tai",
        });
      }

      await db.User.destroy({
        where: { id: userId },
      });

      resolve({
        errCode: 0,
        message: "Xoa tai khoan thanh cong",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.userID || !data.role || !data.position) {
        return resolve({
          errCode: 2,
          messageL: "Missing required parameter!",
        });
      }

      const user = await db.User.findOne({
        where: { id: data.userID },
        raw: false,
      });

      if (!user) {
        return resolve({
          errCode: 1,
          message: "Tai khoan khong ton tai",
        });
      }

      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.phonenumber = data.phoneNumber;
      user.address = data.address;
      user.gender = data.gender;
      user.positionId = data.position;
      user.roleId = data.role;
      if (data.avatar) {
        user.image = data.avatar;
      }

      const userData = {
        user,
        errCode: 0,
        message: "Update user success",
      };

      await user.save();
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

const getAllCodeService = async (type) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = {};

      if (!type) {
        res.errCode = -1;
        res.errMessage = "Missing parameter";
        return resolve(res);
      }

      const dataAllCode = await db.Allcode.findAll({
        where: { type: type },
      });

      res.data = dataAllCode;
      res.errCode = 0;
      res.errMessage = "Lay data thanh cong";

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  updateUser: updateUser,
  getAllCodeService: getAllCodeService,
};
