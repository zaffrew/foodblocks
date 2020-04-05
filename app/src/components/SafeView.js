import {useSafeArea} from "react-native-safe-area-context";
import withProps from "../utils/withProps";
import React from "react";
import {View} from "react-native";

export default withProps(props => {
    const safeAreaInsets = useSafeArea()

    const style = {}
    const propStyle = props.style ? props.style : {};

    if (props.top) {
        style.paddingTop = (propStyle.paddingTop ? propStyle.paddingTop : 0) + safeAreaInsets.top
    }
    if (props.bottom) {
        style.paddingBottom = (propStyle.paddingBottom ? propStyle.paddingBottom : 0) + safeAreaInsets.bottom
    }

    if (Array.isArray(props.style)) {
        props = {...props, style: [...props.style, style]}
    } else {
        props = {...props, style: {...props.style, ...style}}
    }

    return (
        <View {...props}/>
    )
}, {top: true, bottom: false})
