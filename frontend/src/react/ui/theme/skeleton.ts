import { css, keyframes } from 'styled-components'
import { StyledProps } from './theme'

interface Props extends StyledProps {
    height?: string
}

export const animationKeyframes = keyframes`
    0% {
        background-position: -200px 0;
    }
    100% {
        background-position: calc(200px + 100%) 0;
    }
`

export const animation = css`
    ${animationKeyframes} 1.2s ease-in-out infinite;
`

export default css`
    height: ${(props: Props) => props.height || '1rem'};
    background: red;
    background-color: #eee;
    background-image: linear-gradient(
        90deg,
        #eee,
        #f5f5f5,
        #eee
    );
    background-size: 200px 100%;
    background-repeat: no-repeat;
    border-radius: 4px;
    display: inline-block;
    line-height: 1;
    animation: ${animation};
`
