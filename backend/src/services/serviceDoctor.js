import db from "../models/index";
import { isEqual, differenceWith, _ } from "lodash";
require("dotenv").config();

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

const getTopDoctorService = (limit) => {
  return new Promise(async (resolve, reject) => {
    if (!limit) {
      return resolve({
        errCode: -1,
        errMessage: "Missing parameter",
      });
    }

    const doctorData = await db.User.findAll({
      limit: +limit,

      order: [["createdAt", "DESC"]],
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: db.Allcode,
          as: "positionData",
          attributes: ["valueEn", "valueVi"],
        },
        {
          model: db.Allcode,
          as: "genderData",
          attributes: ["valueEn", "valueVi"],
        },
      ],
      raw: true,
      nest: true,
    });

    resolve({
      doctorData,
      errCode: 0,
      errMessage: "Lay limit doctor thanh cong",
    });

    try {
    } catch (error) {
      reject(error);
    }
  });
};

const getAllDoctorService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: {
          exclude: ["password", "image"],
        },
      });

      resolve({
        errCode: 0,
        errMessage: "Lay danh sach bac si thanh cong",
        data,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let checkRequiredFields = (inputData) => {
  let arrFields = [
    "doctorId",
    "contentHTML",
    "contentMarkdown",
    "action",
    "selectedPrice",
    "selectedPayment",
    "selectedProvince",
    "selectedSpecialty",
    "selectedClinic",
    "nameClinic",
    "addressClinic",
    "note",
  ];
  let isValid = true;
  let element = "";
  for (let i = 0; i < arrFields.length; i++) {
    if (!inputData[arrFields[i]]) {
      isValid = false;
      element = arrFields[i];
      break;
    }
  }
  return {
    isValid,
    element,
  };
};

const createInfoDoctorService = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = checkRequiredFields(inputData);
      if (!check.isValid) {
        return resolve({
          errCode: -1,
          errMessage: "Missing parameter",
        });
      }

      if (inputData.action === "CREATE") {
        await db.Markdown.create({
          contentHTML: inputData.contentHTML,
          contentMarkdown: inputData.contentMarkdown,
          doctorId: inputData.doctorId,
          description: inputData.description,
        });
      }

      if (inputData.action === "UPDATE") {
        const doctorMarkdown = await db.Markdown.findOne({
          where: { doctorId: inputData.doctorId },
          raw: false,
        });
        doctorMarkdown.contentHTML = inputData.contentHTML;
        doctorMarkdown.contentMarkdown = inputData.contentMarkdown;
        doctorMarkdown.description = inputData.description;
        doctorMarkdown.updateAt = new Date();

        await doctorMarkdown.save();
      }
      let doctorInfor = await db.Doctor_Info.findOne({
        where: {
          doctorId: inputData.doctorId,
        },
        raw: false,
      });
      if (doctorInfor) {
        doctorInfor.doctorId = inputData.doctorId;
        doctorInfor.priceId = inputData.selectedPrice;
        doctorInfor.provinceId = inputData.selectedProvince;
        doctorInfor.paymentId = inputData.selectedPayment;
        doctorInfor.nameClinic = inputData.nameClinic;
        doctorInfor.addressClinic = inputData.addressClinic;
        doctorInfor.note = inputData.note;
        doctorInfor.specialtyId = inputData.specialtyId;
        doctorInfor.clinicId = inputData.clinicId;

        await doctorInfor.save();
      } else {
        await db.Doctor_Info.create({
          doctorId: inputData.doctorId,
          priceId: inputData.selectedPrice,
          provinceId: inputData.selectedProvince,
          paymentId: inputData.selectedPayment,
          nameClinic: inputData.nameClinic,
          addressClinic: inputData.addressClinic,
          note: inputData.note,
          specialtyId: inputData.specialtyId,
          clinicId: inputData.clinicId,
        });
      }

      resolve({
        errCode: 0,
        errMessage: "Lưu thông tin bác sĩ thành công",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getDetailDoctorService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        return resolve({
          errCode: -1,
          errMessage: "Missing parameter",
        });
      }

      const doctor = await db.User.findOne({
        where: { id: id },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Markdown,
            attributes: ["contentHTML", "contentMarkdown", "description"],
          },
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Doctor_Info,
            attributes: {
              exclude: ["id", "doctorId"],
            },
            include: [
              {
                model: db.Allcode,
                as: "priceTypeData",
                attributes: ["valueVi", "valueEn"],
              },
              {
                model: db.Allcode,
                as: "provinceTypeData",
                attributes: ["valueVi", "valueEn"],
              },
              {
                model: db.Allcode,
                as: "paymentTypeData",
                attributes: ["valueVi", "valueEn"],
              },
            ],
          },
        ],
        raw: false,
        nest: true,
      });

      if (doctor && doctor.image) {
        doctor.image = new Buffer(doctor.image, "base64").toString("binary");
      }

      if (doctor) {
        resolve({
          errCode: 0,
          errMessage: "Tim bac si thanh cong",
          doctor,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const bulkCreateScheduleService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let schedule;
      if (!data.arrSchedule || !data.doctorId || !data.formatedDate) {
        return resolve({
          errCode: -1,
          errMessage: "Missing require parameter",
        });
      } else {
        schedule = data.arrSchedule;

        if (schedule && schedule.length > 0) {
          schedule = schedule.map((item) => {
            item.maxNumber = +MAX_NUMBER_SCHEDULE;
            return item;
          });
        }
      }

      // Trong cùng 1 ngày 1 bác sĩ:
      let existing = await db.Schedule.findAll({
        where: { doctorId: data.doctorId, date: data.formatedDate },
        attributes: ["timeType", "date", "doctorId", "maxNumber"],
        raw: true,
      });

      // if (existing && existing.length > 0) {
      //   existing = existing.map((item) => {
      //     item.date = new Date(item.date).getTime();
      //     return item;
      //   });
      // }

      // let toCreate = differenceWith(schedule, existing, _.isEqual);
      let toCreate = _.differenceWith(schedule, existing, (a, b) => {
        return a.timeType === b.timeType && +a.date === +b.date;
      });

      if (toCreate && toCreate.length > 0) {
        await db.Schedule.bulkCreate(toCreate);
      }
      resolve({
        errCode: 0,
        errMessage: "Luu thanh cong",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getScheduleByDateService = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataSchedule;

      if (!doctorId || !date) {
        return resolve({
          errCode: -1,
          errMessage: "Missing required parameter",
        });
      } else {
        dataSchedule = await db.Schedule.findAll({
          where: {
            doctorId: doctorId,
            date: date,
          },

          include: [
            {
              model: db.Allcode,
              as: "timeTypeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.User,
              as: "doctorData",
              attributes: ["firstName", "lastName"],
            },
          ],
          raw: false,
          nest: true,
        });

        if (!dataSchedule) dataSchedule = [];

        return resolve({
          errCode: 0,
          data: dataSchedule,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getExtraInforDoctorByIdService = (idInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!idInput) {
        return resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        let data = await db.Doctor_Info.findOne({
          where: {
            doctorId: idInput,
          },
          attributes: {
            exclude: ["id", "doctorId"],
          },
          include: [
            {
              model: db.Allcode,
              as: "priceTypeData",
              attributes: ["valueVi", "valueEn"],
            },
            {
              model: db.Allcode,
              as: "provinceTypeData",
              attributes: ["valueVi", "valueEn"],
            },
            {
              model: db.Allcode,
              as: "paymentTypeData",
              attributes: ["valueVi", "valueEn"],
            },
          ],
          raw: false,
          nest: true,
        });

        if (!data) data = [];
        return resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getProfileDoctorByIdService = (idInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!idInput) {
        return resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        let data = await db.User.findOne({
          where: {
            id: idInput,
          },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["contentHTML", "contentMarkdown", "description"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Doctor_Info,
              attributes: {
                exclude: ["id", "doctorId"],
              },
              include: [
                {
                  model: db.Allcode,
                  as: "priceTypeData",
                  attributes: ["valueVi", "valueEn"],
                },
                {
                  model: db.Allcode,
                  as: "provinceTypeData",
                  attributes: ["valueVi", "valueEn"],
                },
                {
                  model: db.Allcode,
                  as: "paymentTypeData",
                  attributes: ["valueVi", "valueEn"],
                },
              ],
            },
          ],
          raw: false,
          nest: true,
        });

        if (data && data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }

        if (!data) data = [];

        return resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getPatientForDoctorService = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId || !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing requiter parameters!",
        });
      } else {
        let data = await db.Booking.findAll({
          where: {
            statusId: "S2",
            date: date,
          },
          include: [
            {
              model: db.User,
              as: "patientData",
              attributes: [
                "email",
                "firstName",
                "address",
                "gender",
                "phoneNumber",
              ],
              include: [
                {
                  model: db.Allcode,
                  as: "genderData",
                  attributes: ["valueVi", "valueEn"],
                },
              ],
            },
            {
              model: db.Allcode,
              as: "timeTypeDataPatient",
              attributes: ["valueVi", "valueEn"],
            },
          ],

          raw: false,
          nest: true,
        });

        if (!data) data = [];

        resolve({
          errCode: 0,
          errMessage: "ok",
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let sendRemedyService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.doctorId ||
        !data.patientId ||
        !data.timeType ||
        !data.imageBase64
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing requiter parameters!",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            patientId: data.patientId,
            timeType: data.timeType,
            statusId: "S2",
          },
          raw: false,
        });
        if (appointment) {
          appointment.statusId = "S3";
          await appointment.save();
        }

        await emailService.sendAttachments(data);

        resolve({
          errCode: 0,
          errMessage: "ok",
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getTopDoctorService: getTopDoctorService,
  getAllDoctorService: getAllDoctorService,
  createInfoDoctorService: createInfoDoctorService,
  getDetailDoctorService: getDetailDoctorService,
  bulkCreateScheduleService: bulkCreateScheduleService,
  getScheduleByDateService: getScheduleByDateService,
  getExtraInforDoctorByIdService: getExtraInforDoctorByIdService,
  getProfileDoctorByIdService: getProfileDoctorByIdService,
  getPatientForDoctorService: getPatientForDoctorService,
  sendRemedyService: sendRemedyService,
};
