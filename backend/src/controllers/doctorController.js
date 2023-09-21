import serviceDoctor from "../services/serviceDoctor";

const getTopDoctor = async (req, res) => {
  try {
    let limit = req.query.limit;

    if (!limit) limit = 1;

    const response = await serviceDoctor.getTopDoctorService(limit);

    return res.status(200).json({
      response,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Eror from server",
    });
  }
};

const getAllDoctor = async (req, res) => {
  try {
    const response = await serviceDoctor.getAllDoctorService();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

const createInfoDoctor = async (req, res) => {
  try {
    const response = await serviceDoctor.createInfoDoctorService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

const getDetailDoctor = async (req, res) => {
  try {
    const id = req.query.id;

    const response = await serviceDoctor.getDetailDoctorService(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

const bulkCreateSchedule = async (req, res) => {
  try {
    let info = await serviceDoctor.bulkCreateScheduleService(req.body);
    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      error: -1,
      errMessage: "Error from the server",
    });
  }
};

const getScheduleByDate = async (req, res) => {
  try {
    let info = await serviceDoctor.getScheduleByDateService(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json({
      info,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const getExtraInforDoctorById = async (req, res) => {
  try {
    let infor = await serviceDoctor.getExtraInforDoctorByIdService(
      req.query.doctorId
    );

    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      error: -1,
      errMessage: "Error from server",
    });
  }
};
const getProfileDoctorById = async (req, res) => {
  try {
    let infor = await serviceDoctor.getProfileDoctorByIdService(
      req.query.doctorId
    );

    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      error: -1,
      errMessage: "Error from server",
    });
  }
};
let getPatientForDoctor = async (req, res) => {
  try {
    let doctors = await serviceDoctor.getPatientForDoctorService(
      req.query.doctorId,
      req.query.date
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
let sendRemedy = async (req, res) => {
  try {
    let doctors = await serviceDoctor.sendRemedyService(req.body);
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
  getTopDoctor: getTopDoctor,
  getAllDoctor: getAllDoctor,
  createInfoDoctor: createInfoDoctor,
  getDetailDoctor: getDetailDoctor,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleByDate: getScheduleByDate,
  getExtraInforDoctorById: getExtraInforDoctorById,
  getProfileDoctorById: getProfileDoctorById,
  getPatientForDoctor: getPatientForDoctor,
  sendRemedy: sendRemedy,
};
