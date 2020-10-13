import React, { useState, useEffect, useRef, forwardRef } from 'react'
import styled from 'styled-components'
import _castArray from 'lodash/castArray'

import OutsideClickHandler from 'react-outside-click-handler'
import { Flex } from 'reflexbox'

import Button from './button'
import Text from './text'
import Transition from './transition'

import theme, { search as searchStyles } from 'theme'
import { Search as SearchType } from 'theme/types'
import { Props, Context, UIElement } from './types'

interface SearchProps extends Props<SearchType, HTMLDivElement> {
    disabled?: boolean,
    onInputChange?: (value: string) => void,
    label?: string,
    expanded?: boolean,
    onExpand?: () => void,
    onCollapse?: () => void,
    width?: string,
    children?: React.ReactNode | React.ReactNode[] | Element | Element[],
    positionSign?: 'left' | 'right',
    isProcessing?: boolean,
    query?: string,
    placeholder?: string
}

const context: Context<SearchType> = { styles: undefined }

export const Component: UIElement<SearchProps> = props => {
    context.styles = props.styles || searchStyles.styles.default

    const [searchQuery, setSearchQuery] = useState(props.query || '')
    const [isInputDisabled, setIsInputDisabled] = useState(props.disabled)
    const [isExpanded, setIsExpanded] = useState(props.expanded)

    const inputRef = useRef()

    useEffect(() => {
        setIsInputDisabled(props.disabled)
    }, [props.disabled])

    useEffect(() => {
        isExpanded ? props.onExpand && props.onExpand() : props.onCollapse && props.onCollapse()
    }, [isExpanded])
    
    useEffect(() => {
        setIsExpanded(new Boolean(props.children && _castArray(props.children).filter(Boolean).length))
    }, [props.children])
    
    const triggerSearch = event => (
        event.persist(),
        search(event.target.value)
    )

    const search = query => (
        setSearchQuery(query),
        props.onInputChange && props.onInputChange(query)
    )

    return (
        <OutsideClickHandler onOutsideClick={() => setIsExpanded(false)}>
            <Flex width="100%" sx={props.sx} data-testid={props['data-testid']}>
                <Container width={props.width} query={searchQuery}>
                    {props.label && <Label risen={!searchQuery}>{props.label}</Label>}
                    <Input ref={inputRef} value={searchQuery} onChange={triggerSearch} disabled={isInputDisabled} placeholder={props.placeholder} />
                    <Transition in={Boolean(isExpanded)} delayed={Boolean(!isExpanded)} classNames="fade">
                        <Dropdown>
                            {props.children}
                        </Dropdown>
                    </Transition>
                    <Transition in={Boolean(searchQuery && !props.isProcessing)} delayed={Boolean(searchQuery && !props.isProcessing)} classNames="fade">
                        <Button background={theme.mixin.icons.red.close} style={{ padding: '.5rem .8rem' }} onClick={() => search('')} />
                    </Transition>
                    <Transition in={Boolean(props.isProcessing)} delayed={Boolean(!props.isProcessing)} classNames="fade">
                        <ProcessingIcon data-testid="ui-search-icon-processing" />
                    </Transition>
                    <Transition in={Boolean(!searchQuery)} delayed={Boolean(searchQuery)} classNames="fade">
                        <SearchIcon positionSign={props.positionSign} data-testid="ui-search-icon-search" />
                    </Transition>
                </Container>
            </Flex>
        </OutsideClickHandler>
    )
}

Component.defaultProps = {
    'data-testid': 'ui-search',
    positionSign: 'left'
}

export const Container = styled(Flex)`${() => context.styles.container}`
export const Input = styled(forwardRef((props, ref) => <input ref={ref} {...props} />))`${() => context.styles.input}`
export const Dropdown = styled(Flex)`${() => context.styles.dropdown}`
export const Label = styled(props => <Text as="label" {...props}/>)`${() => context.styles.label}`
export const Option = styled(props => <Button data-testid="ui-search-option" {...props} />)`${() => context.styles.option}`
export const SearchIcon = styled.span`${() => context.styles.searchIcon}`
export const ProcessingIcon = styled.span`${() => context.styles.processingIcon}`

Component.Option = Option

export default Component
