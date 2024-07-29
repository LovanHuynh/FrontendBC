import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import "./DoctorExtralInfor.scss"
import moment from 'moment';
import 'moment/locale/vi';
import { LANGUAGES } from '../../../utils'
import { getExtralInforDoctorById } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import NumberFormat, { NumericFormat } from 'react-number-format';


class DoctorExtralInfor extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isShowdetailInfor: false,
            extralInfor: {}
        })
    }
    async componentDidMount() {
        //
        if (this.props.doctorIdFromParents) {
            let res = await getExtralInforDoctorById(this.props.doctorIdFromParents);
            if (res && res.errCode === 0) {
                this.setState({
                    extralInfor: res.data,
                })
            }
        }




    }

    async componentDidUpdate(preProps, prevState, snapshot) {
        if (this.props.doctorIdFromParents !== preProps.doctorIdFromParents) {
            let res = await getExtralInforDoctorById(this.props.doctorIdFromParents);
            if (res && res.errCode === 0) {
                this.setState({
                    extralInfor: res.data,
                })
            }



        }
    }
    showHideDetailInfor = (status) => {
        this.setState({
            isShowdetailInfor: status
        })
    }

    render() {

        let { language } = this.props;
        let { isShowdetailInfor, extralInfor } = this.state;
        //console.log("data: ", this.state.extralInfor)

        return (
            <>
                <div className='doctor-extral-infor-container'>
                    <div className='content-up'>
                        <div className='text-address'>
                            <FormattedMessage id="patient.extralinfodoctor.textaddress" />
                        </div>
                        <div className='name-clinic'>
                            {
                                extralInfor && extralInfor.nameClinic ? extralInfor.nameClinic : ''
                            }
                        </div>
                        <div className='detail-address'>
                            {
                                extralInfor && extralInfor.addressClinic ? extralInfor.addressClinic : ''
                            }
                        </div>
                    </div>

                    <div className='content-down'>
                        {isShowdetailInfor === false ?
                            <div className='short-infor'>
                                <FormattedMessage id="patient.extralinfodoctor.price" />

                                {
                                    extralInfor && extralInfor.PriceData && language === LANGUAGES.VI
                                    &&

                                    <NumberFormat
                                        className='currentcy'
                                        value={extralInfor.PriceData.valueVi}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix='VND'
                                    />


                                }
                                {
                                    extralInfor && extralInfor.PriceData && language === LANGUAGES.EN
                                    &&

                                    <NumberFormat
                                        className='currentcy'
                                        value={extralInfor.PriceData.valueEn}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix='$'
                                    />


                                }
                                <span className='detail'
                                    onClick={() => this.showHideDetailInfor(true)}
                                >
                                    <FormattedMessage id="patient.extralinfodoctor.detail" />
                                </span>
                            </div>
                            :
                            <>
                                <div className='title-price'><FormattedMessage id="patient.extralinfodoctor.price" /></div>
                                <div className='detail-infor'>
                                    <div className='price'>
                                        <span className='left'>
                                            <FormattedMessage id="patient.extralinfodoctor.price" /> </span>
                                        <span className='right'>

                                            {
                                                extralInfor && extralInfor.PriceData && language === LANGUAGES.VI
                                                &&

                                                <NumberFormat
                                                    className='currentcy'
                                                    value={extralInfor.PriceData.valueVi}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix='VND'
                                                />
                                            }
                                            {
                                                extralInfor && extralInfor.PriceData && language === LANGUAGES.EN
                                                &&

                                                <NumberFormat
                                                    className='currentcy'
                                                    value={extralInfor.PriceData.valueEn}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix='$'
                                                />
                                            }


                                        </span>
                                    </div>
                                    <div className='note'>
                                        {
                                            extralInfor && extralInfor.note ? extralInfor.note : ''
                                        }
                                    </div>
                                </div>
                                <div className='payment'>
                                    <FormattedMessage id="patient.extralinfodoctor.payment" />
                                    {
                                        extralInfor && extralInfor.PaymentData && language && language === LANGUAGES.EN
                                            ? extralInfor.PaymentData.valueEn : ''
                                    }
                                    {
                                        extralInfor && extralInfor.PaymentData && language && language === LANGUAGES.VI
                                            ? extralInfor.PaymentData.valueVi : ''
                                    }

                                </div>
                                <div className='hiden'>
                                    <span
                                        onClick={() => this.showHideDetailInfor(false)}
                                    >
                                        <FormattedMessage id="patient.extralinfodoctor.hiden" />
                                    </span>
                                </div>
                            </>
                        }


                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtralInfor);
