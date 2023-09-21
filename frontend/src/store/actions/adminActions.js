import actionTypes from "./actionTypes";
import {
  getAllCodeType,
  createNewUserService,
  getAllUsers,
  handleEditUserService,
  handleDeleteUserService,
  getTopDoctor,
  getAllDoctor,
  createInfoDoctor,
  getAllSpecialtyService,
  getAllClinicService,
} from "../../services/userService";

import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

<ToastContainer
  position="bottom-left"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"
/>;
{
  /* Same as */
}
<ToastContainer />;

// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// });

// GENDER:
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      const { response } = await getAllCodeType("gender");
      if (response && response.data) {
        dispatch(fetchGenderSuccess(response.data));
      } else {
        dispatch(fetchGenderFail());
      }
    } catch (error) {
      dispatch(fetchGenderFail());
      console.log("fail", error);
    }
  };
};

export const fetchGenderSuccess = (genders) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genders,
});

export const fetchGenderFail = () => ({
  type: actionTypes.FETCH_GENDER_FAIL,
});

// ROLE:
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      const { response } = await getAllCodeType("role");
      if (response && response.data) {
        dispatch(fetchRoleSuccess(response.data));
      } else {
        dispatch(fetchRoleFail());
      }
    } catch (error) {
      dispatch(fetchRoleFail());
      console.log("fail", error);
    }
  };
};

export const fetchRoleSuccess = (roles) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roles,
});

export const fetchRoleFail = () => ({
  type: actionTypes.FETCH_ROLE_FAIL,
});

// POSITION:
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      const { response } = await getAllCodeType("position");

      if (response && response.data) {
        dispatch(fetchPositionSuccess(response.data));
      } else {
        dispatch(fetchPositionFail());
      }
    } catch (error) {
      dispatch(fetchPositionFail());
      console.log("fail", error);
    }
  };
};

export const fetchPositionSuccess = (positions) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positions,
});

export const fetchPositionFail = () => ({
  type: actionTypes.FETCH_POSITION_FAIL,
});

// CREATE USER:
export const createUserStart = (userData) => {
  return async (dispatch, getState) => {
    try {
      const { message } = await createNewUserService(userData);
      console.log(message);
      if (message && message.errCode === 0) {
        console.log("tao thanh cong nguoi dung");
        dispatch(createUserSuccess());
        dispatch(fetchAllUserStart());

        toast.success("Create User Success", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        dispatch(createUserFail());
        console.log("tao nguoi dung that bai");
        toast.error(message.message, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      dispatch(createUserFail());
    }
  };
};

export const createUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const createUserFail = () => ({
  type: actionTypes.CREATE_USER_FAIL,
});

// READ USER:
export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      const data = await getAllUsers("ALL");

      if (data && data.user) {
        dispatch(fetchAllUserSuccess(data.user));
      } else {
        dispatch(fetchAllUserFail());
      }
    } catch (error) {
      dispatch(fetchAllUserFail());
      console.log("loi: ", error);
    }
  };
};

export const fetchAllUserSuccess = (userData) => ({
  type: actionTypes.FETCH_USER_SUCCESS,
  data: userData,
});

export const fetchAllUserFail = () => ({
  type: actionTypes.FETCH_USER_FAIL,
});

//DELETE USER:
export const deleteUserStart = (userID) => {
  return async (dispatch, getState) => {
    try {
      const { message } = await handleDeleteUserService(userID);

      if (message && message.errCode === 0) {
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUserStart());
        toast.success("Delete User Success", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        dispatch(deleteUserFail());
      }
    } catch (error) {
      dispatch(deleteUserFail());
      console.log("loi: ", error);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFail = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

// UPDATE USER:

export const updateUserStart = (userData) => {
  return async (dispatch, getState) => {
    try {
      console.log("update thanh cong");
      const { message } = await handleEditUserService(userData);
      console.log(message);

      if (message && message.errCode === 0) {
        dispatch(updateUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        dispatch(updateUserFail());
      }
    } catch (error) {
      console.log("loi: ", error);
      dispatch(updateUserFail());
    }
  };
};

export const updateUserSuccess = () => ({
  type: actionTypes.UPDATE_USER_SUCCESS,
});

export const updateUserFail = () => ({
  type: actionTypes.UPDATE_USER_FAIL,
});

//TOP DOCTOR

export const getTopDoctorStart = (limit) => {
  return async (dispatch, getState) => {
    try {
      const { response } = await getTopDoctor(limit);
      const { doctorData } = response;

      if (response && response.errCode === 0) {
        dispatch(getTopDoctorSuccess(doctorData));
      } else {
        dispatch(getTopDoctorFail());
      }
    } catch (error) {
      dispatch(getTopDoctorFail());
      console.log("Loi: ", error);
    }
  };
};

const getTopDoctorSuccess = (doctorData) => ({
  type: actionTypes.FETCH_DOCTOR_SUCCESS,
  data: doctorData,
});

const getTopDoctorFail = () => ({
  type: actionTypes.FETCH_DOCTOR_FAIL,
});

export const getAllDoctorStart = () => {
  return async (dispatch, getState) => {
    try {
      const response = await getAllDoctor();
      if (response && response.errCode === 0) {
        dispatch(getAllDoctorSuccess(response.data));
      } else {
        dispatch(getAllDoctorFail());
      }
    } catch (error) {
      console.log("loi: ", error);
      dispatch(getAllDoctorFail());
    }
  };
};

const getAllDoctorSuccess = (doctorData) => ({
  type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
  data: doctorData,
});

const getAllDoctorFail = () => ({
  type: actionTypes.FETCH_ALL_DOCTOR_FAIL,
});

export const createInfoDoctorStart = (doctorInfo) => {
  return async (dispatch, getState) => {
    try {
      const response = await createInfoDoctor(doctorInfo);
      if (response && response.errCode === 0) {
        dispatch(createInfoDoctorSuccess());
        toast.success(response.errMessage, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        dispatch(createInfoDoctorFail());
        toast.error(response.errMessage, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error);
      dispatch(createInfoDoctorFail());
    }
  };
};

const createInfoDoctorSuccess = () => ({
  type: actionTypes.CREATE_DOCTOR_SUCCESS,
});

const createInfoDoctorFail = () => ({
  type: actionTypes.CREATE_DOCTOR_FAIL,
});

export const fetchAllScheduleTimeStart = () => {
  return async (dispatch, getState) => {
    try {
      let { response } = await getAllCodeType("TIME");

      console.log("response time:   ", response);
      if (response && response.errCode === 0) {
        dispatch(fetchAllScheduleTimeSuccess(response.data));
      } else {
        dispatch(fetchAllScheduleTimeFail());
      }
    } catch (error) {
      console.log("Loi: ", error);
      dispatch(fetchAllScheduleTimeFail());
    }
  };
};

const fetchAllScheduleTimeSuccess = (data) => ({
  type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
  data: data,
});

const fetchAllScheduleTimeFail = () => ({
  type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL,
});

export const getAllRequiredDoctorInfo = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FECTH_REQUIRED_DOCTOR_INFOR_START });

      let resPrice = await getAllCodeType("PRICE");
      resPrice = resPrice.response;

      let resPayment = await getAllCodeType("PAYMENT");
      resPayment = resPayment.response;

      let resProvince = await getAllCodeType("PROVINCE");
      resProvince = resProvince.response;

      let resSpecialty = await getAllSpecialtyService();
      let resClinic = await getAllClinicService();

      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0 &&
        resSpecialty &&
        resSpecialty.errCode === 0 &&
        resClinic &&
        resClinic.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
          resSpecialty: resSpecialty.data,
          resClinic: resClinic.data,
        };
        console.log("data from admin action:  ", data);
        dispatch(getAllRequiredDoctorInfoSuccess(data));
      } else {
        dispatch(getAllRequiredDoctorInfoFail());
      }
    } catch (error) {
      console.log("loi: ", error);
      getAllRequiredDoctorInfoFail();
    }
  };
};

const getAllRequiredDoctorInfoSuccess = (data) => ({
  type: actionTypes.FECTH_REQUIRED_DOCTOR_INFOR_SUCCESS,
  data: data,
});
const getAllRequiredDoctorInfoFail = (data) => ({
  type: actionTypes.FECTH_REQUIRED_DOCTOR_INFOR_FAIL,
});
