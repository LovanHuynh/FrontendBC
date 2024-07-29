import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import "./DoctorSchedule.scss"
import moment from 'moment';
import 'moment/locale/vi';
import { LANGUAGES } from '../../../utils'
import { getScheduleDoctorByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';


class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            allDays: [],
            allAvalableTime: [],
            isOpenModal: false,
            dataScheduleModalTime: {}

        })
    }
    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrdays(language);
        if (this.props.doctorIdFromParents) {
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParents, allDays[0].value);
            this.setState({
                allAvalableTime: res.data ? res.data : []
            })
        }

        this.setState({
            allDays: allDays
        })



    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    getArrdays = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language == LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today;
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi);
                }

            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    object.label = today;
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }
            object.value = moment(new Date()).add(i, 'day').startOf('day').valueOf();
            allDays.push(object);
        }
        return allDays;
    }
    async componentDidUpdate(preProps, prevState, snapshot) {
        if (preProps.language !== this.props.language) {
            let allDays = this.getArrdays(this.props.language);
            this.setState({
                allDays: allDays,
            })
        }
        if (this.props.doctorIdFromParents !== preProps.doctorIdFromParents) {
            let allDays = this.getArrdays(this.props.language);
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParents, allDays[0].value);
            this.setState({
                allAvalableTime: res.data ? res.data : []
            })
        }
    }
    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParents && this.props.doctorIdFromParents !== -1) {
            let doctorId = this.props.doctorIdFromParents;
            let date = event.target.value;

            let res = await getScheduleDoctorByDate(doctorId, date);
            let allTime = [];
            if (res && res.errCode === 0) {
                this.setState({
                    allAvalableTime: res.data ? res.data : [],
                })
            }
            //console.log("check api:", res);
        }
    }
    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModal: true,
            dataScheduleModalTime: time
        })
    }
    closeBookingModal = () => {
        this.setState({
            isOpenModal: false
        })
    }
    render() {
        let { allDays, allAvalableTime, isOpenModal, dataScheduleModalTime } = this.state;
        let { language } = this.props;


        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => { this.handleOnChangeSelect(event) }}>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option
                                            value={item.value}
                                            key={index}
                                        >{item.label}</option>

                                    )
                                })
                            }


                        </select>
                    </div>
                    <div className='all-valiable-time'>
                        <div className='text-calendar'>
                            <span><i className='fas fa-calendar-alt'></i>
                                <FormattedMessage id="patient.detail-doctor.schedule" />
                            </span>
                        </div>
                        <div className="time-content">
                            {allAvalableTime && allAvalableTime.length > 0 ?
                                <>
                                    <div className='time-content-btns'>
                                        {
                                            allAvalableTime.map((item, index) => {
                                                let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                                return (
                                                    <button key={index} className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}
                                                        onClick={() => this.handleClickScheduleTime(item)}
                                                    >{timeDisplay}</button>
                                                )
                                            })
                                        }
                                    </div>

                                    <div className='book-free'>
                                        <span>
                                            <FormattedMessage id="patient.detail-doctor.choose" />
                                            <i className='far fa-hand-point-up'></i>
                                            <FormattedMessage id="patient.detail-doctor.book-free" />

                                        </span>

                                    </div>
                                </>

                                :
                                <div className='no-schedule'>
                                    <FormattedMessage id="patient.detail-doctor.no-schedule" />
                                </div>
                            }

                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpenModal={isOpenModal}
                    closeBookingModal={this.closeBookingModal}
                    dataTime={dataScheduleModalTime}
                />
            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
