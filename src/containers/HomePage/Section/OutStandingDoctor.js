import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { getAllSpecialty } from '../../../services/userService';

class OutStandingDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
        }
    }
    componentDidMount() {
        this.props.loadTopDoctor();

    }
    componentDidUpdate(preProps, prevState, snapshot) {
        if (preProps.topDoctors !== this.props.topDoctors) {
            this.setState({
                arrDoctors: this.props.topDoctors,
            })
        }
    }
    handleviewDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }
    render() {
        let arrDoctors = this.state.arrDoctors;
        let { language } = this.props;
        console.log("check alldoctor", this.state)
        return (
            <div className="section-share section-outstandingdoctor">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">
                            <FormattedMessage id="homepage.outstanding-doctor" />
                        </span>
                        <button className="btn-section">
                            <FormattedMessage id="homepage.more-info" />
                        </button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>

                            {arrDoctors && arrDoctors.length > 0 &&
                                arrDoctors.map((item, index) => {
                                    let imagebase64 = '';
                                    if (item.image) {
                                        imagebase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    let nameVi = `${item.positionData.valueVi}, ${item.lastName}  ${item.firstName}`;
                                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                    return (
                                        <div className="section-customize" key={index} onClick={() => { this.handleviewDetailDoctor(item) }}>
                                            <div className="customize-bd">
                                                <div className="outer-bg">
                                                    <div className="bg-img section-outstandingdoctor"
                                                        style={{ backgroundImage: `url(${imagebase64})` }}
                                                    >
                                                    </div>
                                                </div>
                                                <div className="position text-center">
                                                    <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                    <div>Khoa thần kinh</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>


                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctors: state.admin.topDoctors,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor()),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
