import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../assets/bookingcare-2020.svg';
import '@fortawesome/fontawesome-free/css/all.min.css';


class HomeFooter extends Component {

    render() {


        return (
            <div className="home-footer">
                {/* <p>&copy;2024 Lo Van Huynh. <a target="_blank" href="https://www.youtube.com/watch?v=abPmZCZZrFA">More Information</a></p> */}
                <div className='footer-left'>
                    <h2>Công ty công nghệ cổ phần bookingcare</h2>
                    <p>
                        <i className="fa-solid fa-location-dot"></i>
                        Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam</p>
                    <p><i class="fa-solid fa-shield-halved"></i>
                        ĐKKD số. 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015</p>
                    <p>
                        <i className="fa-solid fa-phone"></i>
                        024-7301-2468 (7h - 18h)</p>
                    <p><i class="fa-solid fa-envelope"></i>
                        support@bookingcare.vn (7h - 18h)</p>
                </div>
                <div className='footer-center'>
                    <div>
                        <div className="logo">
                            <img src={logo}
                            />
                        </div>
                    </div>
                    <p>Tuyển dụng</p>
                    <p>Chính sách bảo mật</p>
                    <p>Quy chế hoạt động</p>
                    <p>Liên hệ hợp tác</p>
                    <p>Điều khoản sử dụng</p>
                    <p>Câu hỏi thường gặp</p>
                </div>
                {/* <div className='footer-right'>Đối tác bảo trợ nội dung</div>
                <div>
                    <h2></h2>
                    <p></p>
                </div> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
