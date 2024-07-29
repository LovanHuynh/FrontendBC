import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './DetailSpecialty.scss'
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctors/DoctorSchedule';
import DoctorExtralInfor from '../Doctors/DoctorExtralInfor';
import ProfileDoctor from '../Doctors/ProfileDoctor';
import { getDetailSpecialtyById, getAllCodeService } from '../../../services/userService';
import _ from 'lodash'
import { LANGUAGES } from '../../../utils';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            arrDoctorId: [],
            dataDetailSpecialty: [],
            listProvince: [],
        })
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getDetailSpecialtyById({
                id: id,
                location: 'ALL'
            });
            let resProvin = await getAllCodeService('PROVINCE');

            if (res && res.errCode === 0 && resProvin && resProvin.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                let dataProvince = resProvin.data;

                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        keyMap: 'ALL',
                        type: 'PROVINCE',
                        valueVi: 'Toàn quốc',
                        valueEn: 'ALL'
                    })
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : []

                })
            }
        }
    }

    async componentDidUpdate(preProps, prevState, snapshot) {

    }

    handleOnchangeSelected = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value;
            let res = await getDetailSpecialtyById({
                id: id,
                location: location
            });

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,


                })
            }


        }
    }

    render() {
        let { dataDetailSpecialty, arrDoctorId, listProvince } = this.state;
        console.log("check data", this.state)
        let { language } = this.props;
        return (
            <div className='detail-specialty-container'>
                <HomeHeader />
                <div className='detail-specialty-body'>
                    <div className='description-specialty'>
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&

                            <div
                                dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}
                            />
                        }
                    </div>
                    <div className='search-doctor'>
                        <select
                            onChange={(event) => this.handleOnchangeSelected(event)}
                        >
                            {listProvince && listProvince.length > 0 &&
                                listProvince.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className='each-doctor' key={item}>
                                    <div className='dt-content-left' >
                                        <div>
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescription={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            //dataTime={dataTime}
                                            />
                                        </div>
                                    </div>
                                    <div className='dt-content-right' >
                                        <div className='up'>
                                            <DoctorSchedule
                                                doctorIdFromParents={item}
                                            />
                                        </div>
                                        <div className='down'>
                                            <DoctorExtralInfor
                                                doctorIdFromParents={item}
                                            />
                                        </div>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>

            </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
