import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from 'react-intl';
import { getAllClinic } from '../../../services/userService';
import { withRouter } from 'react-router';



class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            dataClinic: [],
        })
    }
    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data ? res.data : []
            })
        }


    }
    async componentDidUpdate(preProps, prevState, snapshot) {

    }
    handleViewDetailClinic = (item) => {
        this.props.history.push(`/detail-clinic/${item.id}`)
    }
    render() {
        let { dataClinic } = this.state;
        //console.log("ceh", this.state)
        return (
            <div className="section-share section-medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Cơ sở y tế nổi bật</span>
                        <button className="btn-section">Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {dataClinic && dataClinic.length > 0 &&
                                dataClinic.map((item, index) => {
                                    return (
                                        <div className="section-customize" key={index} onClick={() => { this.handleViewDetailClinic(item) }}>
                                            <div className="bg-img section-medical-facility"
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            >
                                            </div>
                                            <div className='name'>{item.name}</div>
                                        </div>
                                    )
                                })}


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
        language: state.app.language

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
