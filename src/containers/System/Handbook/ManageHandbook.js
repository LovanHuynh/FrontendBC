import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils'
import Lightbox from 'react-image-lightbox';
import { postCreateHandbook } from '../../../services/userService';
import { toast } from 'react-toastify';
import { getAllHandbook } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);
class Defaultt extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            name: '',
            image: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            isOpen: false,


        })
    }
    async componentDidMount() {



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
    handleCreateHandbook = async () => {
        let res = await postCreateHandbook({
            name: this.state.name,
            image: this.state.image,
            descriptionHTML: this.state.descriptionHTML,
            descriptionMarkdown: this.state.descriptionMarkdown
        })
        if (res && res.errCode === 0) {
            toast.success("create a new handbook success");
        } else {
            toast.error("create a new  handbook failed");

        }
    }


    render() {
        console.log(this.state)

        return (
            <>
                <div className='manage-specialty-container'>
                    <div className='title'>Quản lý cẩm nang</div>
                    <div className='add-new-specialty row'>
                        <div className='col-6 form-group'>
                            <label>Tên bài đăng</label>
                            <input className='form-control' type='text'
                                value={this.state.name}
                                onChange={(event) => this.handleOnChange(event, 'name')}
                            />
                        </div>
                        <div className='col-4 form-group'>

                            <label>Ảnh bài đăng</label>
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

                        <div className='col-12'>
                            <MdEditor style={{ height: '350px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}//truyen props xuong nen k su dung arrow fucion
                                value={this.state.descriptionMarkdown}
                            />
                        </div>
                        <div className='col-12'>
                            <button className='btn-save-specialty'
                                onClick={() => this.handleCreateHandbook()}
                            >Create</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Defaultt);
