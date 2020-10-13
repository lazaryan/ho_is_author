import { css } from 'styled-components'

import { StructTheme, StyledProps, Select } from './theme'

interface Props extends StyledProps {}

export const container = css`
    position: relative;
    display: inline-block;
    width: 100%;
`

export const toggle = css`
    font-size: 1.1rem;
    font-weight: 400;
    padding: .5em 3em .5em 1em;
    white-space: nowrap;
    width: 100%;
    position: relative;
    border: none;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
    outline: none;
    
    &:hover, &:focus {
        opacity: .8;
    }
    
    &::after {
        content: '';
        position: absolute;
        width: 1em;
        height: 1em;
        top: 50%;
        right: 1em;
        transform: translate(0, -50%);
    }
`

export const dropdown = css`
    max-height: 12em;
    overflow: auto;
    z-index: 2;
    position: absolute;
    right: auto;
    min-width: 100%;
    border-radius: 1em;
    box-shadow: 0 0.25rem 1rem #ccc;
    
    ${props =>
        props.position ==='bottom' && css`
            top: calc(100% + .5em);
        ` ||
        props.position === 'top' && css`
            bottom: calc(100% + .5em);
        `
    }
    
    ${props => props.theme.mixin.fade}
`

export const option = css`
    font-size: 1.1rem;
    font-weight: 400;
    padding: 1em;
    color: #444;
    background: #fff;
    border: none;
    border-bottom: 1px solid #e8e8e8;
    min-width: 100%;
    text-align: left;
    white-space: nowrap;
    outline: none;
    cursor: pointer;
    
    ${props => props.theme.mixin.transition}
    
    &:hover, &:focus {
        color: ${props => props.theme.colors.bg.common};
        background-color: #fff;
    }
    
    ${props => props.disabled && css`
        color: #999;
        cursor: not-allowed;
        &:hover, &:focus {
            color: #999;
        }
    `}

    ${props => props.selected && css`
        color: ${props => props.theme.colors.bg.common};
    `}
`

export const styles: StructTheme<Select> = {
    default: {
        container,
        dropdown,
        option,
        toggle: css`
            ${toggle}

            color: #444;
            background: #fff;
            border-radius: 5px;
            text-align: left;
            border: 1px solid #ccc;

            ${props => props.theme.mixin.transition}

            &::after {
                content: '';
                position: absolute;
                width: 1em;
                height: 1em;
                top: 50%;
                right: 1em;
                transform: translateY(-50%) rotate(0);
                background: url(${props => props.theme.mixin.icons.light.arrow_down}) center / 1em no-repeat;
                
                ${props => props.theme.mixin.transition}
                
                ${props => props.toggled && css`
                    transform: translateY(-50%) rotate(90deg);
                `}
            }
            
            &:hover, &:focus {
                color: #444;
                background-color: #fff;
                border-color: ${(props: Props) => props.theme.colors.bg.common};
            }
        `
    }
}

export default styles
