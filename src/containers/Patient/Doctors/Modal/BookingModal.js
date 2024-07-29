import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import "./BookingModal.scss"
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _, { isElement } from 'lodash'
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import { postPatientBookingAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';
import 'moment/locale/vi';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            doctorId: '',
            genders: [],
            timeType: ''
        })
    }
    async componentDidMount() {
        this.props.getGender();


    }

    async componentDidUpdate(preProps, prevState, snapshot) {
        if (preProps.genders !== this.props.genders) {
            this.setState({
                genders: this.biuldDataGender(this.props.genders),
            })
        }
        if (preProps.language !== this.props.language) {
            this.setState({
                genders: this.biuldDataGender(this.props.genders),
            })
        }
        if (preProps.dataTime !== this.props.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                this.setState({
                    doctorId: doctorId,
                    timeType: this.props.dataTime.timeType
                })
            }
        }
    }
    biuldDataGender = (data) => {
        let result = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            })
        }
        //console.log("data", result)
        return result;
    }
    toggle = () => {

    }
    handleOnchange = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        })
        //modifire gian tiep

    }
    handleOnChangDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }
    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        })
    }

    biuldTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            //let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            let name = language === LANGUAGES.VI ? `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}` :
                `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`;

            return name;
        }
        return ''

    }
    biuldDoctorName = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;

            let date = language === LANGUAGES.VI ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY') :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY');
            return `${time} - ${date}`
        }
        return ''

    }

    handleConfirmBooking = async () => {
        //validate input
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.biuldTimeBooking(this.props.dataTime)
        let doctorName = this.biuldDoctorName(this.props.dataTime)
        let res = await postPatientBookingAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            birthday: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName

        })
        if (res && res.errCode === 0) {
            toast.success("Booking a new appointment success!")
            this.props.closeBookingModal();
            this.setState({
                fullName: '',
                phoneNumber: '',
                email: '',
                address: '',
                reason: '',
                birthday: '',
                selectedGender: '',
                doctorId: '',
                genders: '',
                timeType: ''
            })
        } else {
            toast.error("Booking a new appointment error!")
        }
    }


    render() {

        let { isOpenModal, closeBookingModal, dataTime } = this.props;
        let doctorId = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId;
        }
        //console.log("data: ", dataTime)
        return (
            <>
                <Modal
                    isOpen={isOpenModal}
                    toggle={() => { this.toggle() }}
                    className={"booking-modal-container"}
                    size="lg"
                    centered
                >
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <span className='left'>
                                <FormattedMessage id="patient.booking-modal.title" />
                            </span>
                            <span className='right'
                                onClick={closeBookingModal}
                            > <i className='fas fa-times'></i></span>
                        </div>
                        <div className='modal-body '>
                            {/* {JSON.stringify(dataTime)} */}
                            <div className='doctor-info'>
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowDescription={false}
                                    dataTime={dataTime}
                                    isShowPrice={true}
                                    isShowLinkDetail={false}


                                />
                            </div>
                            <div className='price'>

                            </div>
                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.fullName" />
                                    </label>
                                    <input className='form-control'
                                        value={this.state.fullName}
                                        onChange={(event) => this.handleOnchange(event, 'fullName')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.phoneNumber" />
                                    </label>
                                    <input className='form-control'
                                        value={this.state.phoneNumber}
                                        onChange={(event) => this.handleOnchange(event, 'phoneNumber')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.email" />
                                    </label>
                                    <input className='form-control'
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnchange(event, 'email')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.address" />
                                    </label>
                                    <input className='form-control'
                                        value={this.state.address}
                                        onChange={(event) => this.handleOnchange(event, 'address')}
                                    />
                                </div>
                                <div className='col-12 form-group'>
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.reason" />
                                    </label>
                                    <input className='form-control'
                                        value={this.state.reason}
                                        onChange={(event) => this.handleOnchange(event, 'reason')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.birthday" />
                                    </label>
                                    <DatePicker
                                        onChange={this.handleOnChangDatePicker}
                                        className="form-control"
                                        value={this.state.birthday}

                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.gender" />
                                    </label>
                                    <Select
                                        // dang bi sai sau khi luu
                                        value={this.state.selectedGender}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.genders}
                                    />

                                </div>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button className='btn-confirm' onClick={() => this.handleConfirmBooking()} >
                                <FormattedMessage id="patient.booking-modal.confirm" />
                            </button>
                            <button className='btn-cancel' onClick={closeBookingModal}>
                                <FormattedMessage id="patient.booking-modal.cancel" />
                            </button>
                        </div>
                    </div>





                </Modal>
            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGender: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
