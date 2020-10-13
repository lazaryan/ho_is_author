import { css } from 'styled-components'

import { StructTheme, StyledProps, Search } from './theme'

interface Props extends StyledProps {
    label: string,
    width: string,
    query: string,
    risen: boolean
}

export const container = css`
    position: relative;
    border-bottom: 1px solid #F1F1F1;
    padding: 0 1em;
    width: ${(props: Props) => props.width || "100%"};

    ${(props: Props) => props.theme.mixin.transition}

    ${(props: Props) => props.query && css`
        border-bottom-color: ${(props: Props) => props.theme.colors.bg.common};
    `}

    &:hover, &:focus {
        border-bottom-color: ${(props: Props) => props.theme.colors.bg.common};
    }
`

export const input = css`
    font-size: 1.1rem;
    width: 100%;
    border: none;
    z-index: 1;
    padding: .25em .5em;
    padding-left: 1em;
    outline: 0;
    background: transparent;
`

export const dropdown = css`
    position: absolute;
    z-index: 3;
    flex-direction: column;
    top: calc(100% + 1rem);
    width: 100%;
    border-radius: 1rem;
    max-height: 36rem;
    overflow: auto;
    background: #fff;
    box-shadow: 0 0.25rem 1rem #F1F1F1;

    ${(props: Props) => props.theme.mixin.fade}
`

export const label = css`
    position: absolute;
    height: 0;
    font-size: 1.1rem;
    z-index: 0;
    left: 2em;
    color: #bbb;

    ${(props: Props) => props.risen ? css`
        top: 0em;
    ` : css`
        top: -1.5rem;
        left: 0em;
    `}

    ${(props: Props) => props.theme.mixin.fade}
`

export const option = css`
    font-size: 1.1rem;
    padding: 0.5em 2em;
    border-bottom: 1px solid #e5e5e5;
    cursor: pointer;
    color: ${(props: Props) => props.theme.colors.fg.main};
    background-color: #fff;
    border-radius: 0;
    
    &:hover, &:focus {
        background: #f7f7f7;
        color: ${(props: Props) => props.theme.colors.fg.main};
    }
    
    ${(props: Props) => props.disabled && css`
        background-color: #bbb;
        cursor: not-allowed;
        opacity: .5;
        
        &:hover, &:focus {
            opacity: .5;
            color: ${(props: Props) => props.theme.colors.fg.main};
            background-color: #bbb;
        }
    `}
`

export const searchIcon = css`
    position: absolute;
    top: 0.1rem;
    bottom: 0.6em;
    width: 1.1rem;
    height: 1.1rem;
    background: url(${(props: Props) => props.theme.mixin.icons.light.search}) 0 0 / 100% no-repeat;
    
    ${props => props.positionSign === 'left' && css`
        left: 0.5em;
    `}
    
    ${props => props.positionSign === 'right' && css`
        right: 0.5em;
    `}
    
    ${(props: Props) => props.theme.mixin.fade}
`

export const processingIcon = css`
    position: absolute;
    right: 0.5em;
    top: 0.1rem;
    bottom: 0.6em;
    width: 1.1rem;
    height: 1.1rem;
    opacity: .5;
    background: url(${(props: Props) => props.theme.mixin.icons.dark.spinner}) 0 0 / 100% no-repeat;
    
    ${(props: Props) => props.theme.mixin.rotateZ}
    ${(props: Props) => props.theme.mixin.fade}
`

export const styles: StructTheme<Search> = {
    default: {
        container,
        input,
        dropdown,
        label,
        option,
        searchIcon,
        processingIcon
    },
    accent: {
        container: css`
            ${container}

            border: 1px solid #F1F1F1;
            padding: .4rem .8rem;
            font-size: 1.1rem;

            &:hover {
                border: 1px solid #F1F1F1;
            }
        `,
        input,
        dropdown,
        label,
        option,
        searchIcon: css`
            ${searchIcon}

            top: .8rem;
        `,
        processingIcon
    }
}

export default styles
