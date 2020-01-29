import React from 'react'

import withProps from "../withProps";
import SingleUserSetting from "../SingleUserSetting";
import {connect} from "react-redux";

const validator = require("email-validator");

export default connect(null, {
    updateValue: (email) => ({
        type: 'EMAIL',
        email: email.trim(),
    }),
})(withProps(SingleUserSetting, {
    placeholder: 'Email',
    question: 'What is your email?',
    valid: (email) => {
        return validator.validate(email.trim());
    },
    invalidMessage: 'Invalid Email',
    textInputProps: {
        autoCompleteType: 'email',
        keyboardType: 'email-address',
        textContentType: 'emailAddress',
        autoCapitalize: 'none'
    },
}));
