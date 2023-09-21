import db from "../models/index";
require("dotenv").config();
import serviceEmail from "./serviceEmail";
import { v4 as uuidv4 } from "uuid";

let buildUrlEmail = (doctorId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
  return result;
};

const postBookAppointmentService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.doctorId || !data.timeType || !data.date) {
        return resolve({
          errCode: 1,
          errMessage: "Missing Required Parameter",
        });
      } else {
        let token = uuidv4();

        await serviceEmail.sendEmail({
          receiverEmail: data.email,
          patientName: data.fullName,
          time: data.timeString,
          doctorName: data.doctorName,
          redirectLink: buildUrlEmail(data.doctorId, token),
        });

        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
            address: data.address,
            gender: data.selectedGender,
            phoneNumber: data.phoneNumber,
            firstName: data.fullName,
          },
        });

        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: { patientId: user[0].id },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              patientId: user[0].id,
              date: data.date,
              timeType: data.timeType,
              token: token,
            },
          });
        }

        return resolve({
          errCode: 0,
          errMessage: "Lưu thông tin thành công",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const postVerifyBookAppointmentService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.doctorId) {
        return resolve({
          errCode: 1,
          errMessage: "Missing Required Parameter",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });

        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();
          return resolve({
            errCode: 0,
            errMessage: "Cập nhật thông tin thành công",
          });
        } else {
          return resolve({
            errCode: 2,
            errMessage: "Lưu thông tin thất bại",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  postBookAppointmentService,
  postVerifyBookAppointmentService,
};
