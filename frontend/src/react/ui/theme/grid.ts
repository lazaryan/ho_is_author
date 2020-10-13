import { css } from 'styled-components'
import { StructTheme, Grid, StyledProps } from './theme'

interface Props extends StyledProps {}

export const styles: StructTheme<Grid> = {
  default: {
    header: css`
      font-size: 1.2rem;
      color: #444;
      font-weight: 500;
      text-transform: uppercase;
    `,
    row: css`
      padding: 1rem 0;
      &:not(:last-child) {
        ${(props: Props) => props.theme.mixin.underline}
      }
    `,
    cell: css`
      font-size: 1.1rem;
    `,
    placeholder: css`
      font-size: 1.1rem;
      flex: 1;
      margin-top: 3rem;
      text-align: center;
      color: #999;
    `
  }
}

export default styles
