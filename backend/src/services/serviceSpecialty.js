import db from "../models/index";

let createSpecialtyService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing requiter parameters!",
        });
      } else {
        let specialty = await db.Specialty.create({
          name: data.name,
          image: data.imageBase64,
          descriptionMarkdown: data.descriptionMarkdown,
          descriptionHTML: data.desciptionHTML,
        });

        resolve({
          errCode: 0,
          errMessage: "ok",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getAllSpecialtyService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let specialty = await db.Specialty.findAll();
      if (specialty && specialty.length > 0) {
        specialty.map((item) => {
          item.image = new Buffer.from(item.image, "base64").toString("binary");
          return item;
        });
      }

      resolve({
        errCode: 0,
        errMessage: "ok",
        data: specialty,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getDetailSpecialtyService = (inputId, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId || !location) {
        resolve({
          errCode: 1,
          errMessage: "Missing requiter parameters!",
        });
      } else {
        let specialty = await db.Specialty.findOne({
          where: {
            id: inputId,
          },
          attributes: ["contentMarkdown", "contentHTML"],
        });
        if (specialty) {
          let doctorSpecialty = [];
          if (location === "ALL") {
            doctorSpecialty = await db.Doctor_Info.findAll({
              where: {
                specialtyId: inputId,
              },
              attributes: ["doctorId", "provinceId"],
            });
          } else {
            doctorSpecialty = await db.Doctor_Info.findAll({
              where: {
                specialtyId: inputId,
                provinceId: location,
              },
              attributes: ["doctorId", "provinceId"],
            });
          }

          specialty.doctorSpecialty = doctorSpecialty;
        } else {
          specialty = {};
        }

        resolve({
          errCode: 0,
          errMessage: "ok",
          data: specialty,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createSpecialtyService: createSpecialtyService,
  getAllSpecialtyService: getAllSpecialtyService,
  getDetailSpecialtyService: getDetailSpecialtyService,
};
