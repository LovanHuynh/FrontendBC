import React, { Component, Fragment, useEffect } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { postVerifyBookingAppointment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader'
import './VerifyEmail.scss'

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            statusVerify: false,
            errCode: 0
        })
    }
    async componentDidMount() {
        //console.log("location", this.props.location)
        if (this.props.location && this.props.location.search) {
            let urlParam = new URLSearchParams(this.props.location.search);
            let token = urlParam.get('token');
            let doctorId = urlParam.get('doctorId');
            //console.log("check", token, doctorId);
            let res = await postVerifyBookingAppointment({
                token: token,
                doctorId: doctorId
            })
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
        }
        //console.log(this.props)

    }

    async componentDidUpdate(preProps, prevState, snapshot) {

    }


    render() {
        let { errCode, statusVerify } = this.state;
        //console.log(this.state)
        return (
            <>
                <HomeHeader />
                <div className='verify-container'>
                    {statusVerify === false ?
                        <div>Loading data....</div>
                        :
                        <div >
                            {errCode === 0 ?
                                <div className='text-infor'>Xác nhận lịch hẹn thành công!</div>
                                :
                                <div className='text-infor'>Lịch hẹn không tồn tại hoặc đã được xác nhận!</div>
                            }
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
