import { css } from 'styled-components'

import { StructTheme, StyledProps, Text } from './theme'

interface Props extends StyledProps {
    color: string,
    fontSize: string,
    overflow: boolean
}

export const common = css`
    font-size: ${(props: Props) => props.fontSize || '1.1rem'};
    color: ${(props: Props) => props.color || props.theme.colors.fg.main};

    ${(props: Props) => props.overflow && css`
        overflow:hidden;
        text-overflow: ${props.overflow};
    `}
`

export const styles: Text = {
    label: css`
        ${common}

        font-weight: 500;
        white-space: nowrap;
        max-width: 100%;
        letter-spacing: .05rem;
        text-transform: uppercase;
        color: ${(props: Props) => props.color || props.theme.colors.fg.main};
        margin: 0;
    `,
    accent: css`
        ${common}

        font-size: ${(props: Props) => props.fontSize || '1.3rem'};
        font-weight: 600;
        white-space: nowrap;
        max-width: 100%;
        letter-spacing: .05rem;
        margin: 0;
    `,
    header: css`
        color: ${(props: Props) => props.theme.colors.fg.main};
        font-size: 1.5rem;
        letter-spacing: .05rem;
        font-weight: 400;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 0;
        gont-family: Roboto sans-serif;
    `,
    placeholder: css`
        font-size: 1.1rem;
        color: ${(props: Props) => props.color || props.theme.colors.fg.light};
        margin: 0;
    `,
    p: css`
        color: ${(props: Props) => props.theme.colors.fg.main};
        font-size: 1.1rem;
        font-weight: 400;
        letter-spacing: .03rem;
        margin: 0;
    `,
    required: css`
        position: relative;
        margin: 0;
    
        &:after {
            content: '*';
            position: absolute;
            font-size: 1.5em;
            top: -.5em;
            right: -.5em;
            color: red;
        }
    `,
    box: css`
        box-sizing: border-box;
        border: 1px solid #ccc;
        color: ${(props: Props) => props.theme.colors.fg.light};
        border-radius: 3px;
        font-size: 1.2rem;
        line-height: 2.2rem;
        padding: .5em;
        width: 100%;
        margin: 0;
    `
}

export default styles
