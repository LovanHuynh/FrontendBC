import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";

import { FormattedMessage } from 'react-intl';



class Defaultt extends Component {
    constructor(props) {
        super(props);
        this.state = ({

        })
    }
    async componentDidMount() {



    }

    async componentDidUpdate(preProps, prevState, snapshot) {

    }


    render() {


        return (
            <>
                <div>ABC </div>
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
