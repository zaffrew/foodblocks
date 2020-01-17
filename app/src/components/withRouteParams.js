import React from "react";

import withProps from './withProps'

/**
 * Applies the params passed through navigator to the normal list of params.
 */
export default WrappedComponent => (props => {
    const Wrap = withProps(WrappedComponent, props.route.params)
    return <Wrap{...props}/>
})
