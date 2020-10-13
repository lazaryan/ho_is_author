import { css } from 'styled-components'

import { StructTheme, Dropdown, StyledProps } from './theme'

interface Props extends StyledProps {}

export const container = css`
    position: relative;
    display: inline-block!important;
`

export const toggle = css`
    font-size: 1.1rem;
    font-weight: 400;
    padding: .75em 1.75em;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    white-space: nowrap;

    ${(props: Props) => props.theme.mixin.transition}
`

export const dropdown = css`
    position: absolute;
    background: #fff;
    z-index: 2;
    top: calc(100% + .5em);
    right: 0;
    min-width: 100%;
    border-radius: 1rem;
    box-shadow: 0 .25rem 1rem #F1F1F1;

    ${(props: Props) => props.theme.mixin.fade}
`

export const button = css`
    font-size: 1.1rem;
    font-weight: 400;
    text-align: left;
    padding: 1.1em 1.5em;
    color: #444;
    background: #fff;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #F1F1F1;
    cursor: pointer;
    white-space: nowrap;
    outline: none;
    width: 100%;

    ${(props: Props) => props.theme.mixin.transition}

	&:hover, &:focus {
		opacity: 1;
		color: #444;
		background: #fff;
	}

    ${(props: Props) => props.disabled && css`
        opacity: 1;
        color: ${(props: Props) => props.theme.colors.fg.light};
        background-color: ${(props: Props) => props.theme.colors.bg.dark};
    
        &:hover, &:focus {
            opacity: 1;
        }
    `}
`

export const styles: StructTheme<Dropdown> = {
    default: {
        container,
        toggle,
        dropdown,
        button
    }
}

export default styles
