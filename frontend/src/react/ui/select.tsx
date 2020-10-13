import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import OutsideClickHandler from 'react-outside-click-handler'
import { Flex } from 'reflexbox'

import Button from './button'
import Transition from './transition'

import { select as selectStyles } from 'theme'
import { Select as SelectType } from 'theme/types'
import { Props, Context, UIElement } from './types'

interface SelectProps extends Props<SelectType, HTMLDivElement>{
    selected?: any,
    label?: string,
    placeholder?: string,
    children?: React.ReactNode | React.ReactNode[] | Element | Element[],
    onSelect?: (props: any) => void,
    position?: 'top' | 'bittom'
}

const context: Context<SelectType> = { styles: undefined }

export const Component: UIElement<SelectProps> = props => {
    context.styles = props.styles || selectStyles.styles.default

    const [toggled, setToggled] = useState(false)
    const [selected, setSelected] = useState(props.selected)
    const [options, setOptions] = useState(props.children)
    const [label, setLabel] = useState()

    const selectedRef = useRef(selected)

    useEffect(() => {
		setLabel(selected === undefined ? props.placeholder : getLabel())

		selectedRef.current = selected
    }, [selected])
    
    useEffect(() => {
		setSelected(props.selected)
		setLabel(selected === undefined ? props.placeholder : getLabel())

		selectedRef.current = props.selected
	}, [props.selected])

	useEffect(() => {
		setOptions(props.children)
    }, [props.children])
    
    const getLabel = () =>
		(selected => selected ? selected.props.children : props.placeholder)(getSelectedElement())

	const getSelectedElement = () =>
		React.Children.toArray(props.children).filter(option => option.props.value === selected)[0]

    const toggle = (_: any, state?: any) => setToggled(state !== undefined ? state : !toggled)

    const asyncSelect = (cb, value) => (
		cb.then(setSelected(value))
	)

    const handleSelect = option =>
        option.props.value != selected && (toggle(false), select(props.onSelect, option.props.value))
        
        const select = (handle, value) =>
		(mbProxy => (mbProxy && mbProxy.then) ? asyncSelect(mbProxy, value) : setSelected(value))(handle(value))

    return (
        <OutsideClickHandler onOutsideClick={event => toggle(event, false)}>
            <Container sx={props.sx}>
                <Toggle {...props} onClick={toggle} toggled={toggled ? 1 : 0} sx={{ width: "100%" }}>
                    {label}
                </Toggle>
                <Transition in={toggled} delayed={!toggled} classNames="fade">
                    <Dropdown flexDirection="column" position={props.position}>
                        {options && React.Children.map(options, option =>
                            <Option {...option.props} onClick={() => handleSelect(option)} selected={props.selected === option.props.value} />
                        )}
                    </Dropdown>
                </Transition>
            </Container>
        </OutsideClickHandler>
    )
}

Component.defaultProps = {
    position: 'bittom'
}

export const Toggle = styled(props => <Button {...props} styles={{}} />)`${() => context.styles.toggle}`
export const Container = styled(Flex)`${() => context.styles.container}`
export const Dropdown = styled.div`${() => context.styles.dropdown}`
export const Option = styled(props => <Button {...props} styles={{}} />)`${() => context.styles.option}`
export const ComponentOption = props => <span {...props}/>

Option.propTypes = {
	value: (props, name) =>
		props[name] === undefined && new Error('Option should have a "value" prop')
}

Component.Option = ComponentOption

export default Component
