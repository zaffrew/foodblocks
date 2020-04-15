import React from 'react'

import {connect} from 'react-redux'
import withProps from "../../utils/withProps";
import {ACTIONS} from "../../state/State";
import FullPageSingleuserSetting from "../FullPageSingleUserSetting";


export default connect(null, {
    updateValue: (username) => ({
        type: ACTIONS.USERNAME,
        username,
    }),
})(withProps(FullPageSingleuserSetting, {
    placeholder: 'Name',
    question: 'What is your name?',
    textInputProps: {
        autoCompleteType: 'name',
        textContentType: 'name',
        autoCapitalize: 'words'
    }
}))
