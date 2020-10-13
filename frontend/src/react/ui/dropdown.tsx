import React, { useState } from 'react'
import styled from 'styled-components'

import OutsideClickHandler from 'react-outside-click-handler'
import { Flex } from 'reflexbox'
import Button from './button'
import Transition from './transition'

import { dropdown as dropdownStyles } from 'theme'
import { Dropdown as DropdownType } from 'theme/types'
import { Props, Context, UIElement } from './types'

interface DropdownProps extends Props<DropdownType, HTMLButtonElement> {
    children?: React.ReactNode | Element | string,
    toggle?: React.ReactNode | Element,
    label?: string,
    disabled?: boolean,
}

const context: Context<DropdownType> = { styles: undefined }

export const Component: UIElement<DropdownProps> = props => {
    context.styles = props.styles || dropdownStyles.styles.default

	const [toggled, setToggled] = useState(false)

	const toggle = (_: React.MouseEvent, state: boolean | undefined) => !props.disabled && setToggled(state !== undefined ? state : !toggled)

	return (
		<OutsideClickHandler onOutsideClick={(event: React.MouseEvent) => toggle(event, false)}>
			<Container sx={props.sx}>
				{
					props.toggle && <Flex onClick={toggle} sx={{ cursor: 'pointer' }}>{props.toggle}</Flex> ||
					<Toggle onClick={toggle} {...props}>{props.label}</Toggle>
				}
				<Transition in={toggled} delayed={200} classNames="fade">
					<Dropdown flexDirection="column">
						{props.children}
					</Dropdown>
				</Transition>
			</Container>
		</OutsideClickHandler>
	)
}

export const Container = styled(Flex)`${() => context.styles.container}`
export const Toggle = styled(Button)`${() => context.styles.toggle}`
export const Dropdown = styled(Flex)`${() => context.styles.dropdown}`
export const DropdownButton = styled(Button)`${() => context.styles.button}`

Component.Button = DropdownButton

export default Component