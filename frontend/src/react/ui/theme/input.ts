import { css } from 'styled-components'

import { StructTheme, StyledProps, Input } from './theme'

interface Props extends StyledProps {
    risen: boolean,
    label: string,
    type: 'text' | 'number' | 'percentage',
}

export const label = css`
	position: absolute;
    font-size: 1.2rem;
    padding-left: .5rem;
	bottom: .5em;
	color: #999;
    z-index: 2;
    
    ${(props: Props) => props.theme.mixin.transition}
    
	${(props: Props) => props.risen && css`
		bottom: 2.5em;
		font-size: 1.2rem;
	`}
`

export const container = css`
	border-radius: 3px;
    position: relative;
    
	${(props: Props) => props.disabled && css`
		opacity: .5;
    `}
    
    ${(props: Props) => props.label && css`
        padding-top: 2em;
    `}
`

export const input = css`
	width: 100%;
	font-size: 1.1rem;
	padding: .5em;
	background: none;
	border: none;
	outline: none;
	background: #fff;
    z-index: 1;
    border: 1px solid #ccc;
	
	${(props: Props) =>
		props.type === 'number' && css`
			text-align: center;
		` ||
		props.type === 'percentage' && css`
			text-align: center;
		`
	}
    
	&::placeholder {
		text-transform: capitalize;
    }
`

export const styles: StructTheme<Input> = {
    default: {
        label,
        container,
        input
    },
    accent: {
        label,
        container: css`
            ${container}

            border-radius: 0;
            ${(props: Props) => props.theme.mixin.transition}
        `,
        input: css`
            ${input}

            font-size: 1.5rem;
            padding: .5em;
            border: none;
            background: transparent;
            border-bottom: 2px solid #f1f1f1;
            ${(props: Props) => props.theme.mixin.transition}

            &:hover, &:focus {
                border-bottom: 2px solid ${(props: Props) => props.theme.colors.bg.common};
            }
        `
    }
}

export default styles
