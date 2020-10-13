import React from 'react'
import styled from 'styled-components'
import { Flex } from 'reflexbox'

import { container as containerStyles } from 'theme'
import { Container as ContainerType } from 'theme/types'
import { Props, Context, UIElement } from './types'

interface ContainerProps extends Props<ContainerType, HTMLButtonElement> {}

const context: Context<ContainerType> = { styles: undefined }

export const Component: UIElement<ContainerProps> = props => {
  context.styles = props.styles || containerStyles.styles.default

  return (
    <Flex flexDirection="column" {...props} />
  )
}

export const Header = (props: ContainerProps) => <Flex alignItems="center" {...props}/>
export const Content = Flex
export const Footer = Flex

Component.Header = styled(Header)`${() => context.styles.header}`
Component.Content = styled(Content)`${() => context.styles.content}`
Component.Footer = styled(Footer)`${() => context.styles.footer}`
Component.Tile = styled(Flex)`${() => context.styles.tile}`

export default Component