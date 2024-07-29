import React, { Component, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from "../../services/userService";
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenEditModalUser: false,
            userEdit: {}
        }
    }
    async componentDidMount() {
        await this.getAllUserFromReat();
    }
    getAllUserFromReat = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
            //  console.log("Ibrastore2 : ", this.state.arrUsers);

        }
        // console.log("Ibrastore: ", response);
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }
    toggleEditUserModal = () => {
        //console.log("toggle: ", this.state.isOpenEditModalUser)
        this.setState({
            isOpenEditModalUser: !this.state.isOpenEditModalUser,
        })
    }
    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessa);

            } else {
                await this.getAllUserFromReat();
                this.setState({
                    isOpenModalUser: false,
                })

                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }


        } catch (error) {
            console.log(error);
        }
    }
    handleDeleteUser = async (user) => {
        try {
            let response = await deleteUserService(user.id);
            if (response && response.errCode === 0) {
                await this.getAllUserFromReat();

            } else {
                // console.log("du lieu chay vao day")
                alert(response.errMessa);

            }
        } catch (error) {
            console.log(error);
        }
    }
    handleEditUser = async (user) => {
        this.setState({
            isOpenEditModalUser: true,
            userEdit: user
        });

    }
    doEditUser = async (user) => {

        try {
            let response = await editUserService(user);
            if (response && response.errCode === 0) {
                this.setState({
                    isOpenEditModalUser: false
                })
                await this.getAllUserFromReat();

            } else {
                // console.log("du lieu chay vao day")
                alert(response.errMessa);

            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="user-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />

                {
                    this.state.isOpenEditModalUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenEditModalUser}
                        toggleFromParent={this.toggleEditUserModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }
                <div className="title text-center">LO VAN HUYNH</div>
                <div className="mx-1">
                    <button className="btn btn-primary px-3"
                        onClick={() => this.handleAddNewUser()}>
                        <i className="fas fa-plus"></i>
                        AddNewUser
                    </button>
                </div>
                <div className="users-table mt-4 mx-1 manageuser">
                    <table>
                        <tbody>
                            <tr className="">
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>


                            {
                                arrUsers && arrUsers.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className="btn-edit" onClick={() => this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
                                                <button className="btn-delete" onClick={() => this.handleDeleteUser(item)} ><i className="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>


                    </table>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
