import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss'
import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor, postSendRemedy } from '../../../services/userService';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false,
        })
    }
    async componentDidMount() {

        this.getDataPatient();
        //console.log("data", response)
    }

    async componentDidUpdate(preProps, prevState, snapshot) {

    }
    handleOnChangDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient();
        })
    }
    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formattedDate = new Date(currentDate).getTime();
        let response = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formattedDate,
        })
        if (response && response.errCode === 0) {
            this.setState({
                dataPatient: response.data
            })
        }
    }
    handleConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
        //console.log(data)
    }
    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }
    sendRemedy = async (dataChild) => {
        let { dataModal, dataPatient } = this.state;
        this.setState({
            isShowLoading: true,
        })
        let res = await postSendRemedy({
            email: dataChild.email,
            imgbase64: dataChild.imgbase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName
        })
        if (res && res.errCode === 0) {
            toast.success("success")
            this.setState({
                isShowLoading: false,
            })
            this.closeRemedyModal();
            await this.getDataPatient();
        } else {
            toast.error("error")
            this.setState({
                isShowLoading: false,
            })
        }
        // console.log('check', res)

    }


    render() {
        // let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
        let { language } = this.props;
        console.log(this.state.dataPatient)

        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading.....'>
                    <div className='manage-patient-container'>
                        <div className='m-p-title'>Quản lý bệnh nhân khám bệnh</div>
                        <div className='manage-patient-body row'>
                            <div className='col-4 form-group'>
                                <label>CHon ngay kham</label>
                                <DatePicker
                                    onChange={this.handleOnChangDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                                //minDate={yesterday}
                                />
                            </div>
                            <div className='col-12 table-manage-patient'>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <th>Thời gian</th>
                                            <th>Họ và tên</th>
                                            <th>Địa chỉ</th>
                                            <th>Giới tính</th>

                                            <th>Actions</th>
                                        </tr>


                                        {
                                            dataPatient && dataPatient.length > 0 ?
                                                dataPatient.map((item, index) => {
                                                    let gender = language === LANGUAGES.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn;
                                                    let time = language === LANGUAGES.VI ? item.timeTypeDataBook.valueVi : item.timeTypeDataBook.valueEn;
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{time}</td>
                                                            <td>{item.patientData.firstName}</td>
                                                            <td>{item.patientData.address}</td>
                                                            <td>{gender}</td>

                                                            <td>
                                                                <button className="btn-confirm"
                                                                    onClick={() => this.handleConfirm(item)}
                                                                >Xác nhận</button>

                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                                :
                                                <tr>
                                                    <td colSpan="6" style={{ textAlign: 'center' }}>Bác sĩ không có lịch hẹn trong khoảng thời gian này</td>
                                                </tr>
                                        }

                                    </tbody>


                                </table>
                            </div>
                        </div>
                    </div>

                    <RemedyModal
                        isOpenModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />
                </LoadingOverlay>

            </>


        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
