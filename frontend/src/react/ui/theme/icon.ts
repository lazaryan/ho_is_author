import { css } from 'styled-components'

import { StyledProps } from './theme'

interface Props extends StyledProps {
	background: string,
	currentSort?: boolean
}

export default css`
	background: url(${(props: Props) => props.background}) 0 0 / 100% no-repeat;
	width: 2rem;
    height: 2rem;
    
	${(props: Props) => props.theme.mixin.transition}

	${(props: Props) => !props.currentSort && css`
		opacity: 0.5;
	`}
`
