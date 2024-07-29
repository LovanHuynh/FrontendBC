import actionTypes from '../actions/actionTypes';

const initContentOfConfirmModal = {
    isOpen: false,
    messageId: "",
    handleFunc: null,
    dataFunc: null
}

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    schedule_doctor: [],
    allRequiredDoctor: [],


}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true;
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAIL:
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;


            return {
                ...state
            }
        case actionTypes.FETCH_PODITION_FAIL:
            state.positions = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAIL:
            state.roles = [];
            return {
                ...state
            }
        //user
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USER_FAIL:
            state.users = [];
            return {
                ...state
            }
        //doctors
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAIL:
            state.topDoctors = [];
            return {
                ...state
            }
        //all doctors
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAIL:
            state.allDoctors = [];
            return {
                ...state
            }
        //schedule doctors
        case actionTypes.FETCH_ALLCODE_SCHEDULE_DOCTOR_SUCCESS:
            state.schedule_doctor = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_DOCTOR_FAIL:
            state.schedule_doctor = [];
            return {
                ...state
            }
        //tiep
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START:
            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.allRequiredDoctor = action.data;

            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIL:
            state.allRequiredDoctor = [];
            return {
                ...state
            }





















        default:
            return state;
    }
}

export default adminReducer;