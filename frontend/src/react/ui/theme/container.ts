import { css } from 'styled-components'

import { StructTheme, Container, StyledProps } from './theme'

interface Props extends StyledProps {}

export const header = css`
    padding: 2rem 4rem;
    background: #fff;
    z-index: 1;
    box-shadow: 0 0 10px #ddd;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    color: ${(props: Props) => props.theme.colors.fg.main};
`

export const content = css`
    position: relative;
    flex-direction: column;
    padding: 2rem;
    background: #fff;
    box-shadow: 0 0 10px #ddd;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
`

export const footer = css`
`

export const tile = css``

export const styles: StructTheme<Container> = {
    default: {
        header,
        content,
        footer,
        tile: css`
            ${tile}

            padding: 2rem 4rem;
            background: #fff;
            box-shadow: 0 0 10px #ddd;
            border-radius: .5rem;
        `
    },
    accent: {
        header,
        content,
        footer,
        tile: css`
            ${tile}

            padding: 2rem 2rem;
            background: ${(props: Props) => props.theme.colors.bg.caution};
            border-radius: .5rem;
        `
    }
}

export default styles
