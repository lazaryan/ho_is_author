import React, { useState, useEffect, useRef, forwardRef } from 'react'
import styled from 'styled-components'
import _clamp from 'lodash/clamp'
import { Flex } from 'reflexbox'

import { input as inputStyles } from 'theme'
import { Input as InputType } from 'theme/types'
import { Props, Context, UIElement } from './types'

type Value = string | number

interface InputProps extends Props<InputType, HTMLButtonElement> {
    onChange?: (value: Value) => void,
    onBlur?: (value: Value) => void,
    onFocus?: (e: React.MouseEvent) => void,
    onClick?: (e: React.MouseEvent) => void,
    type?: 'text' | 'number' | 'percentage' | 'monetary',
    min?: number,
    max?: number,
    precision?: number,
    autoscroll?: boolean,
    autofocus?: boolean,
    label?: string,
    placeholder?: string,
    value?: Value,
    disabled?: boolean,
    readOnly?: boolean
}

const context: Context<InputType> = { styles: undefined }

export const Component: UIElement<InputProps> = props => {
    context.styles = props.styles || inputStyles.styles.default

    const [value, setValue] = useState(props.value)
    const [focused, setFocused] = useState(false)
    const [metaType] = useState(({
        monetary: 'number',
		percentage: 'number'
	})[props.type] || props.type)

    const inputRef = useRef()
    
    useEffect(() => {
		setValue(formatValue(props.value)),
		inputRef.current.onfocus = () => setFocused(true),
		inputRef.current.onblur = () => setFocused(false)
    }, [])

    useEffect(() => {
		props.autoscroll && autoscroll()
	}, [props.autoscroll])

	useEffect(() => {
		props.autofocus && autofocus()
	}, [props.autofocus])
    
    const formatValue = (value: Value) =>
		['number', 'monetary'].includes(props.type) ? (+value).toFixed(+getPrecision()) : value

    const getPrecision = () => props.precision || ({ monetary: 2 })[props.type]
    
    const autoscroll = () =>  (
		inputRef.current.focus({ preventScroll: true }),
		inputRef.current.scrollIntoView(Object.assign({ behavior: 'smooth', block: 'center' }, autoscroll))
	)

	const autofocus = () =>  (
		inputRef.current.focus({ preventScroll: true })
    )
    
    const onChange = (event: any) => (
		event.persist(),
		(value => (setValue(value), props.onChange && props.onChange(value)))(validate(event.target.value)('onchange'))
	)
	const onBlur = (event) => (
		event.persist(),
		(value => (setValue(value), props.onBlur && props.onBlur(value)))(validate(event.target.value)('onblur'))
    )
    
    const validate = (value: Value) => (event: 'onchange' | 'onblur') => (validator => validator ? validator() : value)(
		({
			onchange: {
				number: () => (value && isFinite(+value)) ? _clamp(+value, props.min, props.max) : ''
			},
			onblur: {
				number: () => formatValue(_clamp(+value, props.min, props.max))
			}
		})[event][metaType])

    return (
        <Container sx={props.sx} disabled={props.disabled} label={props.label}>
            {props.label && <Label risen={Boolean(focused || value)}>{props.label}</Label>}
            <Input
				data-testid={props['data-testid']}
				type={metaType}
				value={value}
				onClick={props.onClick}
				onFocus={props.onFocus}
				onChange={onChange}
				onBlur={onBlur}
				min={props.min}
				max={props.max}
				disabled={props.disabled}
				readOnly={props.readOnly}
				placeholder={props.placeholder}
				ref={inputRef} />
        </Container>
    )
}

Component.defaultProps = {
    value: ''
}

export const Label = styled.label`${() => context.styles.label}`
export const Container = styled(Flex)`${() => context.styles.container}`
export const Input = styled(forwardRef((props, ref) => <input {...props} ref={ref} />))`${() => context.styles.input}`

export default Component
