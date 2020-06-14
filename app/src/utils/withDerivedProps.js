import React from "react";

export default function (Component, derive) {
    return function (props) {
        return <Component {...{...props, ...derive(props)}}/>
    }
}
