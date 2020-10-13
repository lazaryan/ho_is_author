import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Flex } from 'reflexbox'
import PropTypes from 'prop-types'
import theme from 'theme'

import { radio as radioStyles } from 'theme'
import { Radio as RadioType } from 'theme/types'
import { Props, Context, UIElement } from './types'

interface RadioProps extends Props<RadioType, HTMLDivElement> {
    value?: any,
    assert?: any,
    disabled?: boolean,
    onValueChange?: (value: any) => void
}

const context: Context<RadioType> = { styles: undefined }

export const Component: UIElement<RadioProps> = props => {
	context.styles = props.styles || radioStyles.styles.default

	const [value] = useState(props.value)
	const [checked, setCheked] = useState()

	useEffect(() => {
		setCheked(props.assert == value)
	}, [props.assert])

	const handleClick = () => !props.disabled && (
		setCheked(!checked),
		props.onValueChange && props.onValueChange(value)
	)

	return (
		<Flex sx={props.sx}>
			<Label checked={checked} onClick={handleClick}/>
		</Flex>
	)
}

export const Label = styled(props => <label {...props}/>)`${() => context.styles.toggle}`

Component.defaultProps = {
	styles: theme.radio.styles.default,
	disabled: false
}

export default Component
