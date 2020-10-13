import React from 'react'
import styled from 'styled-components'
import { Flex } from 'reflexbox'

import { text as textStyles } from 'theme'
import { Text as TextType } from 'theme/types'
import { Props, Context, UIElement } from './types'

export type As = 'label' | 'p' | 'span'
interface TextProps extends Props<TextType, HTMLDivElement> {
    as?: As,
}

const context: Context<TextType> = { styles: undefined }

export const Component: UIElement<TextProps> = props => {
    context.styles = props.styles || textStyles.styles[props.as]

    return (
        <Flex sx={props.sx}>
            <Text {...props} />
        </Flex>
    )
}

Component.defaultProps = {
    as: 'p'
}

export const Text = styled((props: TextProps) => <props.as {...props}/>)`${() => context.styles}`

export default Component
