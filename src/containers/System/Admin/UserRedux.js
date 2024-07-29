import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils'
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import * as actions from '../../../store/actions'
import TableManageUser from './TableManageUser';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImage: "",
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            action: '',
            userEditId: ''

        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();

    }

    componentDidUpdate(preProps, prevState, snapshot) {
        if (preProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }
        if (preProps.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.positionRedux;
            this.setState({
                positionArr: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : ''
            })
        }
        if (preProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux;
            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : ''
            })
        }
        if (preProps.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.genderRedux;
            let arrPosition = this.props.positionRedux;
            let arrRole = this.props.roleRedux;
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '',
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                previewImage: ''
            })
        }
    }
    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            //console.log("base64", base64);
            let ObjectUrl = URL.createObjectURL(file);
            this.setState({
                previewImage: ObjectUrl,
                avatar: base64
            })
        }
    }
    previewOpentImage = () => {
        if (!this.state.previewImage) return;
        this.setState({
            isOpen: true
        })
    }
    checkValidateInput = () => {
        let isVali = true;
        let arrcheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];
        for (let i = 0; i < arrcheck.length; i++) {
            if (!this.state[arrcheck[i]]) {
                isVali = false;
                alert("Missing input: " + arrcheck[i]);
                break;
            }
        }
        // if (isVali && !this.state.email.includes('@')) { // Kiểm tra email có chứa ký tự '@'
        //     isVali = false;
        //     alert("Email must contain @");
        // }
        return isVali;
    }
    handleonchangeInput = (event, id) => {
        //alert("saya");
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }, () => {
            //console.log("Lo van Huynh:", this.state)
        })
    }
    handleEditUserFromParent = (user) => {
        let imagebase64 = '';
        if (user.image) {
            imagebase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        this.setState({
            email: user.email,
            password: 'hardcode',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',
            previewImage: imagebase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id,
        })


    }
    handleSaveUser = () => {
        let isvali = this.checkValidateInput();
        if (isvali === false) return;
        //fire redux action
        //console.log("check data submit: ", this.state)
        let { action } = this.state;
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            });
            // setTimeout(() => {
            //     this.props.getAllUser();
            // }, 1000);
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editUser({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,
            })
        }


    }
    render() {
        //console.log("check state: ", this.state);
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;
        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar } = this.state;
        //console.log("check potition: ", this.props.positionRedux);

        return (
            <div className="user-redux-container">
                <div className="title">
                    USER REDUX WITH BBC
                </div>
                <div className="user-redux-body" >
                    <div className="container">
                        <div className="row">
                            <div className="col-12 my-3">
                                <FormattedMessage id="manage-user.add" />
                            </div>
                            <div className="col-12">{isLoadingGender === true ? 'Loading Gender' : ''}</div>

                            <div className="col-3">
                                <label> <FormattedMessage id="manage-user.email" /></label>
                                <input className="form-control" type="email"
                                    value={email}
                                    onChange={(event) => { this.handleonchangeInput(event, 'email') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className="col-3">
                                <label> <FormattedMessage id="manage-user.password" /></label>
                                <input className="form-control" type="password"
                                    value={password}
                                    onChange={(event) => { this.handleonchangeInput(event, 'password') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}

                                />
                            </div>
                            <div className="col-3">
                                <label> <FormattedMessage id="manage-user.firstName" /></label>
                                <input className="form-control" type="text"
                                    value={firstName}
                                    onChange={(event) => { this.handleonchangeInput(event, 'firstName') }}
                                />
                            </div>
                            <div className="col-3">
                                <label> <FormattedMessage id="manage-user.lastName" /></label>
                                <input className="form-control" type="text"
                                    value={lastName}
                                    onChange={(event) => { this.handleonchangeInput(event, 'lastName') }}
                                />
                            </div>
                            <div className="col-3">
                                <label> <FormattedMessage id="manage-user.phoneNumber" /></label>
                                <input className="form-control" type="text"
                                    value={phoneNumber}
                                    onChange={(event) => { this.handleonchangeInput(event, 'phoneNumber') }}
                                />
                            </div>
                            <div className="col-9">
                                <label> <FormattedMessage id="manage-user.address" /></label>
                                <input className="form-control" type="text"
                                    value={address}
                                    onChange={(event) => { this.handleonchangeInput(event, 'address') }}
                                />
                            </div>
                            <div className="col-3">
                                <label> <FormattedMessage id="manage-user.gender" /></label>
                                <select className="form-control"
                                    onChange={(event) => {
                                        this.handleonchangeInput(event, 'gender')
                                        // html select default
                                    }}
                                    value={genders}
                                >
                                    {
                                        genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label> <FormattedMessage id="manage-user.position" /></label>
                                <select className="form-control"
                                    onChange={(event) => { this.handleonchangeInput(event, 'position') }}
                                    value={position}
                                >
                                    {
                                        positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label> <FormattedMessage id="manage-user.roleId" /></label>
                                <select className="form-control"
                                    onChange={(event) => { this.handleonchangeInput(event, 'role') }}
                                    value={role}
                                >
                                    {
                                        roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label> <FormattedMessage id="manage-user.image" /></label>
                                <div className="preview-img-container">
                                    <input id="prevImg" type="file" hidden
                                        onChange={(event) => this.handleOnchangeImage(event)}
                                    />
                                    <label className="label-upload" htmlFor="prevImg">
                                        <FormattedMessage id="manage-user.uploadImg" />
                                        <i className="fas fa-upload"></i></label>
                                    <div className="preview-image"
                                        style={{ backgroundImage: `url(${this.state.previewImage})` }}
                                        onClick={() => this.previewOpentImage()}
                                    ></div>
                                </div>

                            </div>
                            <div className="col-2 my-3">
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? "btn-warning form-control" : "btn-primary form-control"}
                                    onClick={() => this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id="manage-user.edit" /> :
                                        <FormattedMessage id="manage-user.save" />
                                    }
                                </button>
                            </div>
                            <div className="col-12 mb-5">
                                <TableManageUser
                                    handleEditUserFromParent={this.handleEditUserFromParent}
                                    action={this.state.action}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImage}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.creatNewUser(data)),
        editUser: (data) => dispatch(actions.updateUser(data)),
        //getAllUser: () => dispatch(actions.fetchAllUsers()), cap nhat lai danh sach user sau khi tao moi

        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageApp: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
