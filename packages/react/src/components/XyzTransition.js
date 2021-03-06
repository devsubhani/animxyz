import React, { Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import { getXyzTransitionProps } from '../xyzUtils'

function XyzTransition(props) {
	const { xyz, children, ...rest } = props

	const xyzTransitionProps = getXyzTransitionProps(rest)

	const childArray = Children.toArray(children).filter(Boolean)

	if (childArray.length !== 1) {
		throw new Error('XyzTransition must have a single truthy child at all times')
	}

	const child = childArray[0]

	return <CSSTransition {...xyzTransitionProps}>{cloneElement(child, { xyz, ...child.props })}</CSSTransition>
}

XyzTransition.propTypes = {
	...CSSTransition.propTypes,
	xyz: PropTypes.string,
	timeout: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.oneOf(['auto']),
		PropTypes.shape({
			appear: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
			enter: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
			exit: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
		}),
	]),
	children: PropTypes.node,
}

export default XyzTransition
