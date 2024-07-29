import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './ManageClinic.scss'
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils'
import Lightbox from 'react-image-lightbox';
import { createNewClinic, getAllClinic, updateClinic } from '../../../services/userService';
import { toast } from 'react-toastify';


const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            name: '',
            image: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            isOpen: false,
            arrClinic: [],
            id: '',
            address: '',
        })
    }
    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                arrClinic: res.data ? res.data : []
            })
        }


    }
    async componentDidUpdate(preProps, prevState, snapshot) {

    }
    handleOnChange = (event, id) => {
        let copySate = { ...this.state };
        copySate[id] = event.target.value;
        this.setState({
            ...copySate
        })
        //console.log("checl", this.state.name)
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({

            descriptionHTML: html,
            descriptionMarkdown: text,
        })
        //console.log('handleEditorChange', html, text);
    }
    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            //console.log("base64", base64);
            let ObjectUrl = URL.createObjectURL(file);
            this.setState({
                image: base64,

            })
        }
    }
    previewOpentImage = () => {
        if (!this.state.image) return;
        this.setState({
            isOpen: true
        })
    }
    handleCreateClinic = async () => {
        let res = await createNewClinic({
            name: this.state.name,
            address: this.state.address,
            image: this.state.image,
            descriptionHTML: this.state.descriptionHTML,
            descriptionMarkdown: this.state.descriptionMarkdown
        })
        if (res && res.errCode === 0) {
            toast.success("create a new Clinic success");
        } else {
            toast.error("create a new  Clinic failed");

        }
    }
    handleSaveClinic = async () => {

        let res = await updateClinic({
            id: this.state.id,
            name: this.state.name,
            address: this.state.address,
            image: this.state.image,
            descriptionHTML: this.state.descriptionHTML,
            descriptionMarkdown: this.state.descriptionMarkdown
        })
        if (res && res.errCode === 0) {
            toast.success("create a new Clinic success");
        } else {
            toast.error("create a new  Clinic failed");

        }
    }
    handleEditUser = (item) => {
        this.setState({
            name: item.name,
            image: item.image,
            address: item.address,
            descriptionHTML: item.descriptionHTML,
            descriptionMarkdown: item.descriptionMarkdown,
            id: item.id

        })

    }
    handleDeleteUser = () => {

    }



    render() {
        //console.log("check list: ", this.state.arrClinic)
        let { arrClinic } = this.state;
        return (
            <>
                <div className='manage-specialty-container'>
                    <div className='title'>Quản lí phòng khám</div>
                    <div className='add-new-specialty row'>
                        <div className='col-6 form-group'>
                            <label>Tên Phòng Khám</label>
                            <input className='form-control' type='text'
                                value={this.state.name}
                                onChange={(event) => this.handleOnChange(event, 'name')}
                            />
                        </div>
                        <div className='col-4 form-group'>

                            <label>Ảnh Phòng Khám</label>
                            <div className="preview-img-container">
                                <input id="prevImg" type="file" hidden
                                    onChange={(event) => this.handleOnchangeImage(event)}
                                />
                                <label className="label-upload" htmlFor="prevImg">
                                    <FormattedMessage id="manage-user.uploadImg" />
                                    <i className="fas fa-upload"></i></label>
                                <div className="preview-image"
                                    style={{ backgroundImage: `url(${this.state.image})` }}
                                    onClick={() => this.previewOpentImage()}
                                ></div>
                            </div>
                        </div>
                        <div className='col-6 form-group'>
                            <label>Dai chi phong kham</label>
                            <input className='form-control' type='text'
                                value={this.state.address}
                                onChange={(event) => this.handleOnChange(event, 'address')}
                            />
                        </div>
                        <div className='col-12'>
                            <MdEditor style={{ height: '350px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}//truyen props xuong nen k su dung arrow fucion
                                value={this.state.descriptionMarkdown}
                            />
                        </div>
                        <div className='col-12'>
                            <button className='btn-save-specialty'
                                onClick={() => this.handleCreateClinic()}
                            >Create</button>

                            <button className='btn-save-specialty'
                                onClick={() => this.handleSaveClinic()}
                            >Save</button>
                        </div>
                        <div className='col-12 mb-5'>
                            <div className='list-specialty'>list specialty</div>
                            <table id="TableManageUser">
                                <tbody>
                                    <tr className="">
                                        <th>list clinic</th>

                                        <th>Actions</th>
                                    </tr>
                                    {
                                        arrClinic && arrClinic.length > 0 &&
                                        arrClinic.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.name}</td>

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
                        </div>
                    </div>
                    {this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={this.state.image}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    }
                </div>


            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
// phút thứ 10
