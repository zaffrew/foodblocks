import React from 'react'

/**
 * Applies the passed params to the normal list of params.
 */
export default (WrappedComponent, defaultProps) => (props => <WrappedComponent {...{...defaultProps, ...props}}/>)
