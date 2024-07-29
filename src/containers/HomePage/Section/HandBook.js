import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Speciality.scss';
import Slider from "react-slick";
import { withRouter } from 'react-router';
import { getAllHandbook } from '../../../services/userService';


class HandBook extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            dataHanbook: [],
        })
    }
    async componentDidMount() {
        let res = await getAllHandbook();
        if (res && res.errCode === 0) {
            this.setState({
                dataHanbook: res.data ? res.data : []
            })
        }


    }
    async componentDidUpdate(preProps, prevState, snapshot) {

    }
    handleViewDetailClinic = (item) => {
        this.props.history.push(`/detail-handbook/${item.id}`)
    }
    render() {
        let { dataHanbook } = this.state;

        return (
            <div className="section-share section-handbook">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Cẩm nang</span>
                        <button className="btn-section">Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {/* <div className="section-customize">
                                <div className="bg-img section-handbook"></div>
                                <div>Cơ xương khớp 1</div>
                            </div> */}
                            {dataHanbook && dataHanbook.length > 0 &&
                                dataHanbook.map((item, index) => {
                                    return (
                                        <div className="section-customize" key={index} onClick={() => { this.handleViewDetailClinic(item) }}>
                                            <div className="bg-img section-handbook"
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandBook));
