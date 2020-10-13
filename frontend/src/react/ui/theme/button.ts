import { css } from 'styled-components'
import { StructTheme, Button, StyledProps } from './theme'

interface Props extends StyledProps {
    active?: boolean
}

export const container = css`
    position: relative;
    font-size: 1.1rem;
    font-weight: 400;
    text-transform: uppercase;
`

export const button = css`
    font-size: 1.1rem;
    font-weight: 400;
    position: relative;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    color: #fff;
    cursor: pointer;
    background: ${(props: Props) => props.theme.colors.bg.common};
    text-transform: uppercase;
    padding: .8rem 2.2rem;

    ${(props: Props) => props.theme.mixin.transition}

    &:hover, &:focus {
        opacity: .8;
    }

    ${(props: Props) => props.disabled && css`
        cursor: not-allowed;
        opacity: .3;
        color: ${(props: Props) => props.theme.colors.fg.light};

        &:hover, &:focus {
            opacity: .3;
        }
    `}

    ${props => props.background && css`
		padding: .75rem .75rem;
		border-radius: 0;
		background: url(${props.background}) 0 0 / 100% no-repeat;
	`}
`

export const processingIcon = css`
    position: absolute;
    right: 0.5em;
    top: .75rem;
    bottom: 0.6em;
    width: 1.1rem;
    height: 1.1rem;
    opacity: .7;

    ${(props: Props) => props.theme.mixin.rotateZ}
    ${(props: Props) => props.theme.mixin.fade}

    background: url(${(props: Props) => props.theme.mixin.icons.white.spinner}) 0 0 / 100% no-repeat;
`

export const styles: StructTheme<Button> = {
    default: {
        container,
        button,
        processingIcon
    },
    accent: {
        container,
        button: css`
            ${button}

            background: ${(props: Props) => props.theme.colors.bg.accent};
        `,
        processingIcon
    },
    unaccent: {
        container,
        button: css`
            ${button}

            background: #fff;
            border: 1px solid #999;
            color: #222;

            &:hover, &:focus {
                border-color: ${(props: Props) => props.theme.colors.bg.common};
            }

            ${(props: Props) => props.disabled && css`
                &:hover, &:focus {
                    border-color: #999;
                }
            `}
        `,
        processingIcon
    },
    line: {
        container,
        button: css`
            ${button}

            background: transparent;
            color: ${(props: Props) => props.theme.colors.bg.common};
            border-bottom: 4px solid #D9D9D9;

            &:hover {
                border-bottom-color: ${(props: Props) => props.theme.colors.bg.common};
            }

            ${(props: Props) => props.active && css`
                border-bottom-color: ${(props: Props) => props.theme.colors.bg.common};
            `}
        `,
        processingIcon
    }
}

export default styles
