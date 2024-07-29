import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import "./RemedyModal.scss"

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { CommonUtils } from '../../../utils';
import 'moment/locale/vi';

class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            email: props.dataModal ? props.dataModal.email : '',
            imgbase64: '',

        })
    }
    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,

            })
        }


    }

    async componentDidUpdate(preProps, prevState, snapshot) {
        if (preProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,

            })
        }
        if (preProps.language !== this.props.language) {
            this.setState({

            })
        }

    }
    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            //console.log("base64", base64);
            //let ObjectUrl = URL.createObjectURL(file);
            this.setState({
                imgbase64: base64,

            })
        }
    }
    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }

    render() {

        let { isOpenModal, dataModal, closeRemedyModal, sendRemedy } = this.props;
        // console.log("state", this.state.email)
        // console.log("state", this.props.dataModal)

        return (
            <>
                <Modal
                    isOpen={isOpenModal}
                    className={"booking-modal-container"}
                    size="md"
                    centered
                >

                    <div className='modal-header'>
                        <h5 className='modal-title'>Gửi hóa đơn khám bệnh thành công</h5>
                        <button type='button' className='close' aria-label='close' onClick={closeRemedyModal}>
                            <span aria-hidden="true">x</span>
                        </button>
                    </div>
                    <ModalBody>
                        <div className='row'>
                            <div className='col-6 form-group'>

                                <label>Email benh nhan</label>
                                <input className='form-control' type='email' value={this.state.email}
                                    onChange={(event) => this.handleOnChangeEmail(event)}
                                />

                            </div>
                            <div className='col-6 form-group'>

                                <label>Chon hoa don</label>
                                <input className='form-control-file' type='file'
                                    onChange={(event) => this.handleOnchangeImage(event)}
                                />

                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={() => this.handleSendRemedy()}>Send</Button>
                        <Button color='secondary' onClick={closeRemedyModal}> Cancel</Button>
                    </ModalFooter>





                </Modal>
            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //getGender: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
