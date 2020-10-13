import { css } from 'styled-components'

import { StructTheme, StyledProps, Popup } from './theme'

interface Props extends StyledProps {}

export const overlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .1);
  border-radius: 1rem;
  z-index: 3;
  ${(props: Props) => props.theme.mixin.fade}
`

export const container = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 1rem;
`

export const header = css`
  padding: 2rem 4rem;
  border-radius: 1rem 1rem 0 0;
  box-shadow: 0 .5rem .5rem #F1F1F1;
  ${(props: Props) => props.theme.mixin.fade}
`

export const label = css`
  font-size: 1.25em;
  color: #444;
  letter-spacing: .025em;
  ${(props: Props) => props.theme.mixin.fade}
`

export const content = css`
  position: relative;
  padding: 3rem 4rem;
  max-height: 80vh;
  overflow: auto;
  ${(props: Props) => props.theme.mixin.fade}
`

export const footer = css`
  padding: 2rem 4rem;
  box-shadow: 0 -.5rem .5rem #F1F1F1;
  ${(props: Props) => props.theme.mixin.fade}
`

export const styles: StructTheme<Popup> = {
    default: {
        overlay,
        container,
        header,
        label,
        content,
        footer
    }
}

export default styles