import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Flex } from 'reflexbox'

import { Textarea as TextareaType } from 'theme/types'
import { Props, UIElement } from './types'

interface TextareaProps extends Props<TextareaType, HTMLDivElement> {
    value?: string,
    onValueChange?: (value: string, event: any) => void,
    onBlur?: (value: string, event: any) => void,
}

export const Component: UIElement<TextareaProps> = props => {
	const [value, setValue] = useState(props.value)

	useEffect(() => {
		setValue(props.value)
	}, [props.value])

	const processValue = event => (
		event.persist(),
		setValue(event.target.value),		
		props.onValueChange && props.onValueChange(event.target.value, event)
	)

	const onBlur = event => (
		event.persist(),
		props.onBlur && props.onBlur(event.target.value, event)
	)

	return (
		<Flex sx={props.sx}>
			<textarea {...props} value={value} onBlur={onBlur} onChange={processValue}/>
		</Flex>
	)
}

Component.defaultProps = {
	value: ''
}

export default styled(Component)`${props => props.theme.textarea.default}`
