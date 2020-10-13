import { css } from 'styled-components'

export const styles = {
	default: {
		toggle: css`
			width: 1rem;
			height: 1rem;
			cursor: pointer;
            ${props => props.theme.mixin.transition}
            
			background: url(${props => props.theme.mixin.icons.blue.radio_off}) 0 0 / 100% no-repeat;
            
            ${props => props.checked && css`
				background: url(${props => props.theme.mixin.icons.blue.radio_on}) 0 0 / 100% no-repeat;
			`}
		`
	}
}

export default styles