import React from 'react'

import {connect} from 'react-redux'
import withProps from "../withProps";
import SingleUserSetting from "../SingleUserSetting";
import {ACTIONS} from "../../State";


export default connect(null, {
    updateValue: (username) => ({
        type: ACTIONS.USERNAME,
        username,
    }),
})(withProps(SingleUserSetting, {
    placeholder: 'Name',
    question: 'What is your name?',
    textInputProps: {
        autoCompleteType: 'name',
        textContentType: 'name',
        autoCapitalize: 'words'
    }
}))
