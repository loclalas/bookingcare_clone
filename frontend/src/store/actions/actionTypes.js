const actionTypes = Object.freeze({
  //app
  APP_START_UP_COMPLETE: "APP_START_UP_COMPLETE",
  SET_CONTENT_OF_CONFIRM_MODAL: "SET_CONTENT_OF_CONFIRM_MODAL",
  CHANGE_LANGUAGE: "CHANGE_LANGUAGE",

  //user
  ADD_USER_SUCCESS: "ADD_USER_SUCCESS",
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAIL: "USER_LOGIN_FAIL",
  PROCESS_LOGOUT: "PROCESS_LOGOUT",

  //gender
  FETCH_GENDER_START: "FETCH_GENDER_START",
  FETCH_GENDER_SUCCESS: "FETCH_GENDER_SUCCESS",
  FETCH_GENDER_FAIL: "FETCH_GENDER_FAIL",

  //role
  FETCH_ROLE_SUCCESS: "FETCH_ROLE_SUCCESS",
  FETCH_ROLE_FAIL: "FETCH_ROLE_FAIL",

  //positions
  FETCH_POSITION_SUCCESS: "FETCH_POSITION_SUCCESS",
  FETCH_POSITION_FAIL: "FETCH_POSITION_FAIL",

  //create user
  CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS",
  CREATE_USER_FAIL: "CREATE_USER_FAIL",

  //read user:
  FETCH_USER_SUCCESS: "FETCH_USER_SUCCESS",
  FETCH_USER_FAIL: "FETCH_USER_FAIL",

  //delete user
  DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
  DELETE_USER_FAIL: "DELETE_USER_FAIL",

  //update user:
  UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS",
  UPDATE_USER_FAIL: "UPDATE_USER_FAIL",

  //fetch doctor:
  FETCH_DOCTOR_SUCCESS: "FETCH_DOCTOR_SUCCESS",
  FETCH_DOCTOR_FAIL: "FETCH_DOCTOR_FAIL",

  //fetch all doctor:
  FETCH_ALL_DOCTOR_SUCCESS: "FETCH_ALL_DOCTOR_SUCCESS",
  FETCH_ALL_DOCTOR_FAIL: "FETCH_ALL_DOCTOR_FAIL",

  //create infomation doctor:
  CREATE_DOCTOR_SUCCESS: "CREATE_DOCTOR_SUCCESS",
  CREATE_DOCTOR_FAIL: "CREATE_DOCTOR_FAIL",

  //fetch all rangetime:
  FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS: "FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS",
  FETCH_ALLCODE_SCHEDULE_TIME_FAIL: "FETCH_ALLCODE_SCHEDULE_TIME_FAIL",

  //
  FECTH_REQUIRED_DOCTOR_INFOR_START: "  FECTH_REQUIRED_DOCTOR_INFOR_START",
  FECTH_REQUIRED_DOCTOR_INFOR_SUCCESS: "  FECTH_REQUIRED_DOCTOR_INFOR_SUCCESS",
  FECTH_REQUIRED_DOCTOR_INFOR_FAIL: "  FECTH_REQUIRED_DOCTOR_INFOR_FAIL",
});

export default actionTypes;
