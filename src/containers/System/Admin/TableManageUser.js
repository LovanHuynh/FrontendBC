import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions'

import * as ReactDOM from 'react-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}
class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRedux: [],
        }
    }
    componentDidMount() {
        this.props.getAllUser();

    }
    componentDidUpdate(preProps, prevState, snapshot) {
        if (preProps.listUsers !== this.props.listUsers) {
            let arrUsers = this.props.listUsers;
            this.setState({
                userRedux: arrUsers
            })
        }
    }
    handleDeleteUser = (user) => {
        this.props.deleteUser(user.id);
    }
    handleEditUser = (user) => {
        //console.log("haha", user)
        this.props.handleEditUserFromParent(user);
    }



    render() {
        //console.log("abc: ", this.props.listUsers)
        let arrUsers = this.state.userRedux;
        return (
            <React.Fragment>
                <table id="TableManageUser" className='mt-4 mx-1 userRedux'>
                    <tbody>
                        <tr className="">
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        {
                            arrUsers && arrUsers.length > 0 &&
                            arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className="btn-edit"
                                                onClick={() => this.handleEditUser(item)}
                                            ><i className="fas fa-pencil-alt"></i></button>
                                            <button className="btn-delete"
                                                onClick={() => this.handleDeleteUser(item)}
                                            ><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>


                </table>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUser: () => dispatch(actions.fetchAllUsers()),
        deleteUser: (id) => dispatch(actions.DeleteUsers(id)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
