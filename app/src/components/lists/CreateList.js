import React from "react";
import SingleUserSetting from "../SingleUserSetting";
import withProps from "../../utils/withProps";
import {connect} from "react-redux";
import {ACTIONS} from "../../state/State";

export default connect(null, {
    updateValue: (name) => ({
        type: ACTIONS.CREATE_LIST,
        name,
    }),
})
(withProps(SingleUserSetting, {
    placeholder: 'Name',
    question: 'Enter the name of your list',
}))
