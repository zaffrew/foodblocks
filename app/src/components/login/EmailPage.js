import React from 'react'

import withProps from "../withProps";
import SingleUserSetting from "../SingleUserSetting";
import {connect} from "react-redux";

export default connect(null, {
    updateValue: (email) => ({
        type: 'EMAIL',
        email
    }),
})(withProps(SingleUserSetting, {
    placeholder: 'Email',
    question: 'What is your email?',
}));
