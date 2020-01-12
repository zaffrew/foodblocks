import React from "react";

export default function withRouteProps(WrappedComponent) {
    return (props) => <WrappedComponent {...{...props, ...props.route.params}}/>
}
