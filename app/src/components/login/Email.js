import React from 'react'

import withProps from "../withProps";
import SingleUserSetting from "../SingleUserSetting";
import {connect} from "react-redux";
import {ACTIONS} from "../../state/State";

import validator from "email-validator";

export default connect(null, {
    updateValue: (email) => ({
        type: ACTIONS.EMAIL,
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
