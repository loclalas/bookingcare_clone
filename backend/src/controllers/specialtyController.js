import serviceSpecialty from "../services/serviceSpecialty";

let createSpecialty = async (req, res) => {
  try {
    let doctors = await serviceSpecialty.createSpecialtyService(req.body);
    return res.status(200).json(doctors);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server",
    });
  }
};
let getAllSpecialty = async (req, res) => {
  try {
    let doctors = await serviceSpecialty.getAllSpecialtyService();
    return res.status(200).json(doctors);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server",
    });
  }
};
let getDetailSpecialty = async (req, res) => {
  try {
    let doctors = await serviceSpecialty.getDetailSpecialtyService(
      req.query.id,
      req.query.location
    );
    return res.status(200).json(doctors);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  createSpecialty: createSpecialty,
  getAllSpecialty: getAllSpecialty,
  getDetailSpecialty: getDetailSpecialty,
};
