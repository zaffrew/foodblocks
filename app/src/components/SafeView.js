import {useSafeArea} from "react-native-safe-area-context";
import withProps from "../utils/withProps";
import React from "react";
import {View} from "react-native";

export default withProps(props => {
    const safeAreaInsets = useSafeArea()

    const style = {}

    if (props.top) {
        style.paddingTop = (props.style.paddingTop ? props.style.paddingTop : 0) + safeAreaInsets.top
    }
    if (props.bottom) {
        style.paddingBottom = (props.style.paddingBottom ? props.style.paddingBottom : 0) + safeAreaInsets.bottom
    }

    if (Array.isArray(props.style)) {
        props = {...props, style: [...props.style, style]}
    } else {
        props = {...props, style: {...props.style, ...style}}
    }

    return (
        <View {...props}/>
    )
}, {top: true, bottom: true})
