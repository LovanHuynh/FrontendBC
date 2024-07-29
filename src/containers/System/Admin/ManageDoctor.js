import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions'
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils'

import * as ReactDOM from 'react-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getDetailDoctorInfor } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //save to markdown
            contentHTML: '',
            contentMarkdown: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            hasOldData: false,
            //save to infor tabel
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedSpecialty: '',
            selectedClinic: '',
            Clinic: '',
            AddressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: ''


        }
    }
    componentDidMount() {
        this.props.getAllDoctors();
        this.props.getRequiredDoctorInfor();

    }
    buildDataInputSelect = (data, type) => {
        let result = [];
        let { language } = this.props;
        if (data && data.length > 0) {
            if (type === 'USER') {
                data.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                })
            }
            if (type === 'PRICE') {
                data.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi} Vnd`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                data.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if (type === 'SPECIALTY') {
                data.map((item, index) => {
                    let object = {};

                    object.label = item.name
                    object.value = item.id;
                    result.push(object);
                })
            }
            if (type === 'CLINIC') {
                data.map((item, index) => {
                    let object = {};

                    object.label = item.name
                    object.value = item.id;
                    result.push(object);
                })
            }

        }

        return result;
    }

    componentDidUpdate(preProps, prevState, snapshot) {
        if (preProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USER')
            this.setState({
                listDoctors: dataSelect,
            })
        }
        if (preProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USER')
            let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctor;
            let dataPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataPrice,
                listPayment: dataPayment,
                listProvince: dataProvince,
            })
        }
        if (preProps.allRequiredDoctor !== this.props.allRequiredDoctor) {
            let { resPrice, resPayment, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctor;
            let dataPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY')
            let dataSelectClinic = this.buildDataInputSelect(resClinic, 'CLINIC')
            this.setState({
                listPrice: dataPrice,
                listPayment: dataPayment,
                listProvince: dataProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic,
            })

        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        })
        //console.log('handleEditorChange', html, text);
    }
    handleChangeSelected = async (selectedOption) => {
        this.setState({ selectedOption });
        let { listPayment, listPrice, listProvince, listSpecialty, listClinic } = this.state;
        let res = await getDetailDoctorInfor(selectedOption.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;

            let price = '', payment = '', province = '', nameClinic = '', addressClinic = '', note = '', clinicId = '', specialtyId = '';
            let valuePrice, valuePayment, valueProvince, valueSpecialty, valueClinic;
            if (res.data.DoctorInfor) {
                nameClinic = res.data.DoctorInfor.nameClinic;
                addressClinic = res.data.DoctorInfor.addressClinic;
                note = res.data.DoctorInfor.note;
                price = res.data.DoctorInfor.priceId;
                payment = res.data.DoctorInfor.paymentId;
                province = res.data.DoctorInfor.provinceId;
                specialtyId = res.data.DoctorInfor.specialtyId;
                clinicId = res.data.DoctorInfor.clinicId;
                valuePrice = listPrice.find(item => {
                    return item && item.value === price;
                })
                valuePayment = listPayment.find(item => {
                    return item && item.value === payment;
                })
                valueProvince = listProvince.find(item => {
                    return item && item.value === province;
                })
                valueSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId;
                })
                valueClinic = listClinic.find(item => {
                    return item && item.value === clinicId;
                })
                //console.log("check id", valueClinic)

            }
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                Clinic: nameClinic,
                AddressClinic: addressClinic,
                note: note,
                selectedPrice: valuePrice,
                selectedPayment: valuePayment,
                selectedProvince: valueProvince,
                selectedSpecialty: valueSpecialty,
                selectedClinic: valueClinic
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                Clinic: '',
                AddressClinic: '',
                note: '',
                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',
            })
        }
        //console.log("check: ", res)
    }
    handleChangeSlectedDoctorInfor = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state }
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        })
    }
    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            Clinic: this.state.Clinic,
            AddressClinic: this.state.AddressClinic,
            note: this.state.note,
            clinicId: this.state.selectedClinic.value,
            specialtyId: this.state.selectedSpecialty.value
        })


        //reset data after submit
        this.setState({
            contentHTML: '',
            contentMarkdown: '',
            description: '',
            hasOldData: false,
            Clinic: '',
            AddressClinic: '',
            note: '',
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedSpecialty: '',
            selectedClinic: ''
        })
        //console.log("check state: ", this.state)
    }
    handleOnchangeText = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    render() {
        let { hasOldData, listSpecialty } = this.state;
        //console.log(this.state.listClinic, this.state.selectedClinic)
        return (
            <div className="manage-doctor-container">

                <div className="manage-doctor-title">
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>
                <div className="more-info">
                    <div className="content-left form-group">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.select-doctor" />

                        </label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelected}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                        />
                    </div>
                    <div className="content-right">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.intro" />

                        </label>
                        <textarea className="form-control"
                            onChange={(event) => { this.handleOnchangeText(event, 'description') }}
                            value={this.state.description}>

                        </textarea>
                    </div>
                </div>
                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label>
                            <FormattedMessage id="admin.manage-doctor.price" />

                        </label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSlectedDoctorInfor}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                            name={"selectedPrice"}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>
                            <FormattedMessage id="admin.manage-doctor.payment" />
                        </label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSlectedDoctorInfor}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                            name={"selectedPayment"}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>
                            <FormattedMessage id="admin.manage-doctor.province" />
                        </label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSlectedDoctorInfor}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                            name={"selectedProvince"}
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label>
                            <FormattedMessage id="admin.manage-doctor.name" />
                        </label>
                        <input className="form-control"
                            onChange={(event) => { this.handleOnchangeText(event, 'Clinic') }}
                            value={this.state.Clinic} />
                    </div>
                    <div className='col-4 form-group'>
                        <label>
                            <FormattedMessage id="admin.manage-doctor.addressClinic" />
                        </label>
                        <input className="form-control"
                            onChange={(event) => { this.handleOnchangeText(event, 'AddressClinic') }}
                            value={this.state.AddressClinic} />


                    </div>
                    <div className='col-4 form-group'>
                        <label>
                            <FormattedMessage id="admin.manage-doctor.note" />
                        </label>
                        <input className="form-control"
                            onChange={(event) => { this.handleOnchangeText(event, 'note') }}
                            value={this.state.note} />

                    </div>
                </div>
                <div className='row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.specialty" /></label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSlectedDoctorInfor}
                            options={this.state.listSpecialty}
                            placeholder={<FormattedMessage id="admin.manage-doctor.specialty" />}
                            name={"selectedSpecialty"}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.clinic" /></label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSlectedDoctorInfor}
                            options={this.state.listClinic}
                            placeholder={<FormattedMessage id="admin.manage-doctor.clinic" />}
                            name={"selectedClinic"}
                        />
                    </div>
                </div>
                <div className="manage-doctor-edit">
                    <MdEditor style={{ height: '350px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}//truyen props xuong nen k su dung arrow fucion
                        value={this.state.contentMarkdown}
                    />
                </div>

                <button className={hasOldData === true ? "save-content-doctors" : "create-content-doctors"}
                    onClick={() => this.handleSaveContentMarkdown()}>
                    {hasOldData === true ? <span>
                        <FormattedMessage id="admin.manage-doctor.save" />

                    </span>
                        :
                        <span>
                            <FormattedMessage id="admin.manage-doctor.add" />

                        </span>}
                </button>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctor: state.admin.allRequiredDoctor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDoctor(data)),
        getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor(),)

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
