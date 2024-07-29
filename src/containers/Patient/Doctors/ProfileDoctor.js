import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss'
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { getProfileDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import NumberFormat, { NumericFormat } from 'react-number-format';
import _ from 'lodash'
import moment from 'moment';
import 'moment/locale/vi';



class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            dataProfile: {},
        })
    }
    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId)
        this.setState({
            dataProfile: data
        })



    }
    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        //console.log("data", result)
        return result;
    }

    async componentDidUpdate(preProps, prevState, snapshot) {
        if (preProps.language !== this.props.language) {

        }
        if (preProps.doctorId === this.props.doctorId) {
            this.getInforDoctor(this.props.doctorId)
        }
    }
    renderDataTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;

            let date = language === LANGUAGES.VI ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY') :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY');
            return (
                <>
                    <div>{time} - {date}</div>
                    <div>
                        <FormattedMessage id="patient.booking-modal.freebooking" />
                    </div>
                </>
            )
        }
        return <></>

    }
    handleviewDetailSpecialty = (id) => {
        this.props.history.push(`/detail-doctor/${id}`)
    }

    render() {
        let { dataProfile } = this.state;
        let { language, isShowDescription, dataTime, isShowLinkDetail, isShowPrice, doctorId } = this.props;
        let nameEn = '', nameVi = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName}  ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        //console.log(dataTime)
        return (
            <>
                <div className='profile-doctor'>
                    <div className='intro-doctor'>
                        <div className="content-left"
                            style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ""})` }}
                        >
                        </div>
                        <div className="content-right">
                            <div className="up">
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='down'>
                                {
                                    isShowDescription === true ?
                                        <>
                                            {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description &&
                                                <span>
                                                    {dataProfile.Markdown.description}
                                                </span>
                                            }
                                        </>
                                        :
                                        <>
                                            {this.renderDataTimeBooking(dataTime)}
                                        </>

                                }

                            </div>
                        </div>

                    </div>
                    {isShowPrice === true &&
                        <div className='price'>
                            <FormattedMessage id="patient.extralinfodoctor.price" />
                            {dataProfile && dataProfile.DoctorInfor && language === LANGUAGES.VI ?
                                <NumberFormat
                                    className='currentcy'
                                    value={dataProfile.DoctorInfor.PriceData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix='VND'
                                />
                                : ''
                            }
                            {dataProfile && dataProfile.DoctorInfor && language === LANGUAGES.EN ?
                                <NumberFormat
                                    className='currentcy'
                                    value={dataProfile.DoctorInfor.PriceData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix='$'
                                />
                                : ''
                            }
                        </div>
                    }
                    {isShowLinkDetail === true &&
                        <div className='more-infor'><span
                            onClick={() => { this.handleviewDetailSpecialty(doctorId) }}
                        >Xem thêm</span></div>
                    }

                </div>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor));
