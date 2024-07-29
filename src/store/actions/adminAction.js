import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService, getAllUsers,
    deleteUserService, editUserService, getTopDoctorHomeService,
    getAllDoctors, saveDetalDoctor, getAllSpecialty, getAllClinic
} from '../../services/userService';
import { toast } from 'react-toastify';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService('GENDER');
            // console.log("check3", res);
            if (res && res.errCode === 0) {
                //console.log("check ai", res);
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFail());
            }
        } catch (error) {
            dispatch(fetchGenderFail());
            console.log("fetchGenderStart err: ", error);
        }
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('POSITION');
            //console.log("check2", res);
            if (res && res.errCode === 0) {
                //console.log("check ai", res);
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFail());
            }
        } catch (error) {
            dispatch(fetchPositionFail());
            console.log("fetchPositionStart err: ", error);
        }
    }
}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('ROLE');
            //console.log("check1", res);
            if (res && res.errCode === 0) {
                //console.log("check ai", res);
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFail());
            }
        } catch (error) {
            dispatch(fetchRoleFail());
            console.log("fetchPositionStart err: ", error);
        }
    }
}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})


export const creatNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            //console.log("Lo van Huynh: ", res)
            if (res && res.errCode === 0) {
                toast.success("Create a new user success");
                dispatch(createNewUserSuccess(res.data));
                dispatch(fetchAllUsers());
            } else {
                dispatch(createNewUserFailed());
            }
        } catch (error) {
            dispatch(createNewUserFailed());
            console.log("Create a new user failed: ", error);
        }
    }
}
export const createNewUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})
export const createNewUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUsers = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            //let res1 = await getTopDoctorHomeService(2);
            //console.log("check all user: ", res1)
            if (res && res.errCode === 0) {
                let users = res.users.reverse();
                dispatch(fetchAllUsersSuccess(res.users));

            } else {
                dispatch(fetchAllUsersFailed());
            }
        } catch (error) {
            dispatch(fetchAllUsersFailed());
            console.log("Create a new user failed: ", error);
        }
    }
}
export const fetchAllUsersSuccess = (inputData) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    data: inputData
})
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAIL
})

export const DeleteUsers = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Delete a new user success");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsers());// cap nhat du lieu sau khi xoa du lieu


            } else {
                toast.error("Delete a new user failed");
                dispatch(deleteUserFailed());
            }
        } catch (error) {
            dispatch(deleteUserFailed());
            console.log("Create a new user failed: ", error);
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})


export const updateUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            //console.log("Lo van Huynh abc: ", res)
            if (res && res.errCode === 0) {
                toast.success("Update user success");
                dispatch(updateUserSuccess(res.data));
                dispatch(fetchAllUsers());
            } else {
                dispatch(updateUserFailed());
            }
        } catch (error) {
            dispatch(updateUserFailed());
            console.log("Update user failed: ", error);
        }
    }
}
export const updateUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})
export const updateUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})
// load động thông tin bác sĩ vào trang homepage

export const fetchTopDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            //let res = await editUserService(data);
            let res = await getTopDoctorHomeService('');
            //console.log("Lo van Huynh: ", res)
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorsSuccess(res.data));
            } else {
                dispatch(fetchTopDoctorsSuccess());
            }
        } catch (error) {
            dispatch(fetchTopDoctorsSuccess());
            console.log("get top doctors failed: ", error);
        }
    }
}
export const fetchTopDoctorsSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
    data: data
})
export const fetchTopDoctorsFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTORS_FAIL
})

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllDoctors();
            //console.log("Lo van Huynh: ", res)
            if (res && res.errCode === 0) {
                dispatch(fetchAllDoctorsSuccess(res.data));
            } else {
                dispatch(fetchAllDoctorsFailed());
            }
        } catch (error) {
            dispatch(fetchAllDoctorsFailed());
            console.log("get all doctors failed: ", error);
        }
    }
}
export const fetchAllDoctorsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
    data: data
})
export const fetchAllDoctorsFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTORS_FAIL
})

export const saveDoctor = (data) => {
    return async (dispatch, getState) => {
        try {

            let res = await saveDetalDoctor(data);
            //console.log("Lo van Huynh: ", res)
            if (res && res.errCode === 0) {
                toast.success("save doctors success");
                dispatch(saveDetailDoctorSuccess());
            } else {
                dispatch(saveDetailDoctorFailed());
                toast.error("save doctors failed");

            }
        } catch (error) {
            dispatch(saveDetailDoctorFailed());
            toast.error("save doctors failed");
            console.log("save doctors failed: ", error);
        }
    }
}
export const saveDetailDoctorSuccess = () => ({
    type: actionTypes.FETCH_SAVE_DETAIL_DOCTOR_SUCCESS
})
export const saveDetailDoctorFailed = () => ({
    type: actionTypes.FETCH_SAVE_DETAIL_DOCTOR_FAIL
})


export const getAllcodeScheduleDoctor = (type) => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllCodeService('TIME');
            //console.log("Lo van Huynh: ", res)
            if (res && res.errCode === 0) {

                dispatch(getAllcodeScheduleDoctorSuccess(res.data));
            } else {
                dispatch(getAllcodeScheduleDoctorFailed());
            }
        } catch (error) {
            dispatch(getAllcodeScheduleDoctorFailed());
            console.log("save doctors failed: ", error);
        }
    }
}
export const getAllcodeScheduleDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_DOCTOR_SUCCESS,
    data: data
})
export const getAllcodeScheduleDoctorFailed = () => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_DOCTOR_FAIL
})


export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START
            })
            let resPrice = await getAllCodeService('PRICE');
            let resPayment = await getAllCodeService('PAYMENT');
            let resProvince = await getAllCodeService('PROVINCE');
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();
            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0
                && resClinic && resClinic.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }
                dispatch(fetchAllRequiredDoctorInforSuccess(data));
            } else {
                dispatch(fetchAllRequiredDoctorInforFailed());
            }
        } catch (error) {
            dispatch(fetchAllRequiredDoctorInforFailed());
            console.log("fetch all required doctor infor failed: ", error);
        }
    }
}
export const fetchAllRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
})
export const fetchAllRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIL
})