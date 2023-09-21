import axios from "../axios";

const handleLoginApi = (emailUser, passwordUser) => {
  console.log(" da vao");
  return axios.post("/api/login", { email: emailUser, password: passwordUser });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};

const handleDeleteUserService = (userId) => {
  return axios.delete("/api/delete-users", {
    data: {
      id: userId,
    },
  });
};

const handleEditUserService = (userData) => {
  return axios.put("/api/edit-users", userData);
};

const getAllCodeType = (type) => {
  return axios.get(`/api/allcodes?type=${type}`);
};

const getTopDoctor = (limit) => {
  return axios.get(`/api/get-top-doctor?limit=${limit}`);
};

const getAllDoctor = () => {
  return axios.get(`/api/get-all-doctor`);
};

const createInfoDoctor = (doctorInfo) => {
  return axios.post(`/api/create-info-doctor`, doctorInfo);
};

const getDetailDoctor = (id) => {
  return axios.get(`/api/get-detail-doctor?id=${id}`);
};

const saveBulkScheduleDoctor = (data) => {
  return axios.post(`/api/bulk-create-schedule`, data);
};

const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};

const getExtraInforDoctorById = (doctorId) => {
  return axios.get(`api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};

const getProfileDoctorById = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};
const postPatientBookAppointment = (data) => {
  return axios.post(`api/patient-booking-appointment`, data);
};
const postVerifyPatientBookAppointment = (data) => {
  return axios.post(`/api/verify-booking-appointment`, data);
};

const createNewSpecialty = (data) => {
  return axios.post("/api/create-new-specialty", data);
};

const getAllSpecialtyService = () => {
  // return axios.delete('/api/delete-user',{id:userId})
  return axios.get(`/api/get-specialty`);
};
const getDetailSpecialtyService = (data) => {
  // return axios.delete('/api/delete-user',{id:userId})
  return axios.get(
    `/api/get-detail-specialty?id=${data.id}&location=${data.location}`
  );
};
const createClinicService = (data) => {
  // return axios.delete('/api/delete-user',{id:userId})
  return axios.post(`/api/create-new-clinic`, data);
};
const getAllClinicService = () => {
  // return axios.delete('/api/delete-user',{id:userId})
  return axios.get(`/api/get-clinic`);
};
const getDetailClinicService = (data) => {
  // return axios.delete('/api/delete-user',{id:userId})
  return axios.get(`/api/get-detail-clinic?id=${data.id}`);
};
const getAllPatientForDoctorService = (data) => {
  // return axios.delete('/api/delete-user',{id:userId})
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
  );
};
const postSendRemedyService = (data) => {
  // return axios.delete('/api/delete-user',{id:userId})
  return axios.post(`/api/send-remedy`, data);
};

export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  handleDeleteUserService,
  handleEditUserService,
  getAllCodeType,
  getTopDoctor,
  getAllDoctor,
  createInfoDoctor,
  getDetailDoctor,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
  getExtraInforDoctorById,
  getProfileDoctorById,
  postPatientBookAppointment,
  postVerifyPatientBookAppointment,
  createNewSpecialty,
  getAllSpecialtyService,
  getDetailSpecialtyService,
  createClinicService,
  getAllClinicService,
  getDetailClinicService,
  getAllPatientForDoctorService,
  postSendRemedyService,
};
