import {useSafeArea} from "react-native-safe-area-context";
import withProps from "../utils/withProps";
import React from "react";
import {View} from "react-native";

export default withProps(props => {
    const safeAreaInsets = useSafeArea()

    let style = {}
    const prop_style = props.style || {}


    if (props.top) {
        style.paddingTop = (prop_style.paddingTop || 0) + safeAreaInsets.top
    }
    if (props.bottom) {
        style.paddingBottom = (prop_style.paddingBottom || 0) + safeAreaInsets.bottom
    }

    if (Array.isArray(props.style)) {
        style = [...props.style, style]
    } else {
        style = {...props.style, style}
    }

    return (
        <View style={style}>
            {props.children}
        </View>
    )
}, {top: true, bottom: true})
