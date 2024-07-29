import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions'
import { getDetailDoctorInfor, savebulkscheduledoctor } from '../../../services/userService';
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from '../../../utils'
import DatePicker from '../../../components/Input/DatePicker';
import moment, { lang } from 'moment/moment';
import FormattedDate from '../../../components/Formating/FormattedDate'
import { toast } from 'react-toastify';
import _, { isElement } from "lodash"
class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: [],
        })
    }
    componentDidMount() {
        this.props.getAllDoctors();
        this.props.getScheduleTime();

    }
    componentDidUpdate(preProps, prevState, snapshot) {
        if (preProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect,
            })
        }
        if (preProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)

            this.setState({
                listDoctors: dataSelect,
            })
        }
        if (preProps.schedule_doctor !== this.props.schedule_doctor) {
            let data = this.props.schedule_doctor;
            if (data && data.length > 0) {
                data.map((item) => {
                    item.isSelected = false;
                    return item;
                })
            }
            //console.log("date data:", data)
            this.setState({
                rangeTime: data
            })
        }

    }
    buildDataInputSelect = (data) => {
        let result = [];
        let { language } = this.props;
        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            })
        }

        return result;
    }
    handleChangeSelected = async (selectedDoctor) => {
        this.setState({ selectedDoctor });

    }
    handleOnChangDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }
    handleClickButtonTime = (time) => {
        let { rangeTime } = this.state;
        // console.log(time);
        if (rangeTime && rangeTime.length > 0) {
            rangeTime.map((item) => {
                if (item.id === time.id) {
                    item.isSelected = !item.isSelected;
                }
            })
        }
        this.setState({
            rangeTime: rangeTime
        })
    }
    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let result = [];
        if (!currentDate) {
            toast.error("Invalid date!");
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Invalid selectedDoctor doctor!");
        }
        let formatedDate = new Date(currentDate).getTime();
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((item => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType = item.keyMap;
                    result.push(object);
                }))
            } else {
                toast.error("Invalid selected time!");

            }
        }
        let res = await savebulkscheduledoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            date: formatedDate
        });

        if (res && res.errCode == 0) {
            toast.success("save schedule success!")
        } else {
            toast.error("save schedule failed!");

        }

        console.log("check:", res)

    }
    render() {
        const { isLoggedIn, language } = this.props;
        //console.log("data:", this.state.rangeTime)
        let { rangeTime } = this.state;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return (
            <div className="manage-schedule-container">
                <div className='m-s-title'>
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>
                                <FormattedMessage id="manage-schedule.choose-doctor" />
                            </label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelected}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>
                                <FormattedMessage id="manage-schedule.choose-date" />
                            </label>
                            <DatePicker
                                onChange={this.handleOnChangDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                                minDate={yesterday}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button className={item.isSelected === false ? 'btn btn-schedule' : 'btn btn-schedule active'}
                                            key={index}
                                            onClick={() => { this.handleClickButtonTime(item) }}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })}
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary btn-save-schedule'

                                onClick={() => { this.handleSaveSchedule() }}>
                                <FormattedMessage id="manage-schedule.save-info" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        schedule_doctor: state.admin.schedule_doctor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getScheduleTime: () => dispatch(actions.getAllcodeScheduleDoctor())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
