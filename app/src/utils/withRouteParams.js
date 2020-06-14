import React from "react";
import withDerivedProps from "./withDerivedProps";

/**
 * Applies the params passed through navigator to the normal list of params.
 */
export default function withRouteParams(Component) {
    return withDerivedProps(Component, props => props.route.params)
}
