import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  roles: [],
  positions: [],
  user: [],
  topDoctors: [],
  allDoctors: [],
  allScheduleTime: [],
  allRequiredDoctorInfo: [],

  isLoading: false,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      return {
        ...state,
        state: true,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      return {
        ...state,
        genders: action.data,
        isLoading: false,
      };

    case actionTypes.FETCH_GENDER_FAIL:
      return {
        ...state,
        genders: [],
        isLoading: false,
      };

    case actionTypes.FETCH_ROLE_SUCCESS:
      return {
        ...state,
        roles: action.data,
        isLoading: false,
      };

    case actionTypes.FETCH_ROLE_FAIL:
      return {
        ...state,
        roles: [],
        isLoading: false,
      };

    case actionTypes.FETCH_POSITION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        positions: action.data,
      };

    case actionTypes.FETCH_POSITION_FAIL:
      return {
        ...state,
        isLoading: false,
        positions: [],
      };

    case actionTypes.CREATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.CREATE_USER_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.data,
      };

    case actionTypes.FETCH_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        user: [],
      };

    case actionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.UPDATE_USER_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.FETCH_DOCTOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        topDoctors: action.data,
      };

    case actionTypes.FETCH_DOCTOR_FAIL:
      return {
        ...state,
        isLoading: false,
        topDoctors: [],
      };

    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allDoctors: action.data,
      };

    case actionTypes.FETCH_ALL_DOCTOR_FAIL:
      return {
        ...state,
        allDoctors: [],
      };

    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
      return {
        ...state,
        allScheduleTime: action.data,
      };

    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAIL:
      return {
        ...state,
        allScheduleTime: [],
      };

    case actionTypes.FECTH_REQUIRED_DOCTOR_INFOR_SUCCESS:
      return {
        ...state,
        allRequiredDoctorInfo: action.data,
      };

    case actionTypes.FECTH_REQUIRED_DOCTOR_INFOR_FAIL:
      return {
        ...state,
        allRequiredDoctorInfo: [],
      };
    default:
      return state;
  }
};

export default adminReducer;
