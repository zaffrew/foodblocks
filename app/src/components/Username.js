import React from 'react'

import {connect} from 'react-redux'
import withProps from "./withProps";
import SingleUserSetting from "./SingleUserSetting";


export default connect(null, {
    updateValue: (username) => ({
        type: 'USERNAME',
        username
    }),
})(withProps(SingleUserSetting, {
    placeholder: 'Name',
    question: 'What is your name?',
}))
