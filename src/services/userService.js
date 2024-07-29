import axios from "../axios";

//api xu li ben phia front-end
const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
}
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}

const createNewUserService = (data) => {
    //console.log('serveice', data);
    return axios.post('/api/create-new-user', data)
}
const deleteUserService = (userId) => {
    //  return axios.del(ete('/api/delete-user', { id: userId })
    return axios.delete(
        '/api/delete-user', {
        data: { id: userId }
    }
    )
}
const editUserService = (inputData) => {
    return axios.put(
        '/api/edit-user', inputData
    )
}
const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
}
const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
}
const getAllDoctors = () => {
    return axios.get(`/api/all-doctors`);
}
const saveDetalDoctor = (data) => {
    return axios.post('/save-infor-doctors', data)
}
const getDetailDoctorInfor = (id) => {
    return axios.get(`/get-detail-doctor-by-id?id=${id}`);
}
const savebulkscheduledoctor = (data) => {
    return axios.post("/api/bulk-create-schedule", data);
}
const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
}
const getExtralInforDoctorById = (doctorId) => {
    return axios.get(`/api-extral-infor-doctor-by-id?doctorId=${doctorId}`);
}

const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api-profile-doctor-by-id?doctorId=${doctorId}`);
}
const postPatientBookingAppointment = (data) => {
    return axios.post('/api-patient-book-appointment', data);
}

const postVerifyBookingAppointment = (data) => {
    return axios.post('/api-verify-book-appointment', data);
}
const createNewSpecialty = (data) => {
    return axios.post('/api-create-new-specialty', data);
}
const updateSpecialty = (data) => {
    return axios.post('/api-update-specialty', data);
}
const getAllSpecialty = () => {
    return axios.get("/get-all-specialty");
}
const getDetailSpecialtyById = (data) => {
    return axios.get(`/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
}
const createNewClinic = (data) => {
    return axios.post('/api-create-new-clinic', data);
}
const updateClinic = (data) => {
    return axios.post('/api-update-clinic', data);
}
const getAllClinic = () => {
    return axios.get("/get-all-clinic");
}
const getDetailClinicById = (data) => {
    return axios.get(`/get-detail-clinic-by-id?id=${data.id}`);
}
const getAllPatientForDoctor = (data) => {
    return axios.get(`/api-get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`);
}

const postSendRemedy = (data) => {
    return axios.post('/api/send-remedy', data);
}

const postCreateHandbook = (data) => {
    return axios.post('/api-create-handbook', data);
}
const getAllHandbook = () => {
    return axios.get("/get-all-handbook");
}
export {
    handleLoginApi, getAllUsers,
    createNewUserService, deleteUserService,
    editUserService, getAllCodeService,
    getTopDoctorHomeService, getAllDoctors,
    saveDetalDoctor, getDetailDoctorInfor,
    savebulkscheduledoctor, getScheduleDoctorByDate,
    getExtralInforDoctorById, getProfileDoctorById,
    postPatientBookingAppointment, postVerifyBookingAppointment,
    createNewSpecialty, getAllSpecialty, updateSpecialty, getDetailSpecialtyById,
    createNewClinic, updateClinic, getAllClinic, getDetailClinicById, getAllPatientForDoctor, postSendRemedy, postCreateHandbook,
    getAllHandbook
}
