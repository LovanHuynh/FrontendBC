import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { every } from 'lodash';
import { handleLoginApi } from '../../services/userService';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPasswrord: false,
            errMessage: '',
        }
    }


    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleLogin = async () => {
        // truoc moi lan login xoa ma loi 
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message,
                })
            } else {
                this.props.userLoginSuccess(data.user);
                console.log('login ok')
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message,
                    })
                }
            }
            console.log(e)

        }

    }
    handleShowHiddenPassword = () => {
        this.setState({
            isShowPasswrord: !this.state.isShowPasswrord
        })
    }
    handleOnKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.handleLogin();
        }
    }
    render() {

        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12  login-text">Login</div>
                        <div className="col-12 form-group login-input" >
                            <label>Username:</label>
                            <input type="text" className="form-control" placeholder="Enter your Username" value={this.state.username}
                                onChange={(event) => this.handleOnChangeUsername(event)}
                            />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password:</label>
                            <div className="custom-input-password">
                                <input type={this.state.isShowPasswrord ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Enter your Password"
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangePassword(event)}
                                    onKeyDown={(event) => { this.handleOnKeyDown(event) }}
                                />
                                <span onClick={() => { this.handleShowHiddenPassword() }}>
                                    <i className={this.state.isShowPasswrord ? "far fa-eye" : "far fa-eye-slash"}></i>
                                </span>
                            </div>

                        </div>
                        <div className="col-12" style={{ color: "red" }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12">
                            <button className="btn-login" onClick={() => { this.handleLogin() }}>Login</button>
                        </div>

                        <div className="col-12">
                            <span className="forgot-password">Forgot your Password?</span>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <span className="text-other-login">Or Login with:</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        //userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
