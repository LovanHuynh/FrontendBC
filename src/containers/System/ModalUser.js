import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: ""
        }
        this.listenToEmitter();
    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                address: ""
            });
        })

    }
    componentDidMount() {

    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    handleOnChangeInput = (event, id) => {

        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        }, () => {
            // check console.log(this.state);
        })
        //modifire gian tiep
    }
    checkValidateInput = () => {
        let isValidate = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValidate = false;
                //alert('cham hi');
                break;
            }
        }
        return isValidate;
    }
    handleAddNewUser = () => {

        let isVali = this.checkValidateInput();
        //console.log(isVali);
        if (isVali === true) {
            //console.log('data: ', this.state)
            this.props.createNewUser(this.state);
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className="modalUserContainer"
                size="lg"

            >
                <ModalHeader toggle={() => { this.toggle() }}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input type="text"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "email")
                                }}
                                value={this.state.email}
                            />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input type="password"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "password")
                                }}
                                value={this.state.password}

                            />
                        </div>
                        <div className="input-container">
                            <label>First Name</label>
                            <input type="text"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "firstName")
                                }}
                                value={this.state.firstName}

                            />
                        </div>
                        <div className="input-container">
                            <label>Last Name</label>
                            <input type="text"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "lastName")
                                }}
                                value={this.state.lastName}

                            />
                        </div>
                        <div className="input-container">
                            <label>Address</label>
                            <input type="text"
                                onChange={(event) => {
                                    this.handleOnChangeInput(event, "address")
                                }}
                                value={this.state.address}

                            />
                        </div>
                    </div>


                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="px-3" onClick={() => { this.handleAddNewUser() }}>
                        Add new
                    </Button>{' '}
                    <Button color="secondary" className="px-3" onClick={() => { this.toggle() }}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
