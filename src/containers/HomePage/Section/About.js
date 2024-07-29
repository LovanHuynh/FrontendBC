import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Speciality.scss';




class About extends Component {

    render() {


        return (
            <div className="section-share section-about">
                <div className="section-about-header">
                    BookingCare: Hệ thống đặt khám trực tuyến
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                        {/* <iframe width="100%" height="500px" src="https://youtu.be/OASGscJQXp0?si=_ZiiIBF2ROlltx38"
                            title="SƠN TÙNG M-TP | ĐỪNG LÀM TRÁI TIM ANH ĐAU | OFFICIAL MUSIC VIDEO"
                            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                        </iframe> */}
                        <iframe width="100%" height="500px" src="https://www.youtube.com/embed/OASGscJQXp0?si=I15hSea3MJ1gYAfq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

                    </div>
                    <div className="content-right">
                        <p>Đúng bệnh nhân - Đúng bác sĩ</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
