import servicePatient from "../services/servicePatient";

const postBookAppointment = async (req, res) => {
  try {
    console.log("req.body-------------", req.body);
    let infor = await servicePatient.postBookAppointmentService(req.body);
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

const postVerifyBookAppointment = async (req, res) => {
  try {
    let infor = await servicePatient.postVerifyBookAppointmentService(req.body);
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

module.exports = {
  postBookAppointment,
  postVerifyBookAppointment,
};
