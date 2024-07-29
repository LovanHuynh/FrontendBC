import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './DetailClinic.scss'
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctors/DoctorSchedule';
import DoctorExtralInfor from '../Doctors/DoctorExtralInfor';
import ProfileDoctor from '../Doctors/ProfileDoctor';
import { getDetailSpecialtyById, getAllCodeService, getDetailClinicById } from '../../../services/userService';
import _ from 'lodash'
import { LANGUAGES } from '../../../utils';


class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            arrDoctorId: [],
            dataDetailClinic: [],

        })
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getDetailClinicById({
                id: id,
            });


            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorClinic;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,


                })
            }
        }
    }

    async componentDidUpdate(preProps, prevState, snapshot) {

    }



    render() {
        let { dataDetailClinic, arrDoctorId, } = this.state;

        let { language } = this.props;
        return (
            <div className='detail-specialty-container'>
                <HomeHeader />
                <div className='detail-specialty-body'>
                    <div className='description-specialty'>
                        {dataDetailClinic && !_.isEmpty(dataDetailClinic) &&

                            <>
                                <div className='name-clinic'>{dataDetailClinic.name}</div>
                                <div className='address-clinic'>{dataDetailClinic.address}</div>

                                <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }} />
                            </>
                        }
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
