import React from 'react'

/**
 * Applies the default params to the end of the normal list of params.
 * This means that if a default param has the same name as a normal param, the normal param will used.
 */
export default (WrappedComponent, defaultProps) => (props => <WrappedComponent {...{...defaultProps, ...props}}/>)
