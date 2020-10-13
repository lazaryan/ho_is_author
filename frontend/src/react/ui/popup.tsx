import React, { useRef, forwardRef } from 'react'
import styled from 'styled-components'
import { Flex } from 'reflexbox'
import Skeleton from './skeleton'

import { Popup as PopupType } from 'theme/types'
import { Props, UIElement } from './types'

interface PopupProps extends Props<PopupType, HTMLDivElement> {
    onClickOutside?: () => void,
    children?: React.Node
}

export const Component: UIElement<PopupProps> = props => {
  const overlayRef = useRef(null)

  const handleClickOutside = event =>
    props.onClickOutside && (event.persist(), event.target == overlayRef.current && props.onClickOutside())

  return (
    <Overlay onClick={handleClickOutside} ref={overlayRef} data-testid="ui-popup-overlay">
      <Container flexDirection="column" {...props}/>
    </Overlay>
  )
}

export const Overlay = styled(forwardRef((props, ref) => <Flex {...props} ref={ref}/>))`${props => props.theme.popup.overlay}`
export const Container = styled(props => <Flex {...props}/>)`${props => props.theme.popup.container}`
export const Header = props => <Flex alignItems="center" {...props} />
export const Label = props => <label {...props}/>
export const Content = props => <Flex flexDirection="column" {...props} />
export const Footer = Flex
export const ComponentSkeleton = props =>
<Overlay>
  <Container flexDirection="column" {...props}>
    {props.children ||
      <>
        <Component.Header>
          <Skeleton width="35%" />
        </Component.Header>
        <Component.Content flexDirection="column">
          <Skeleton mb="2rem" height="3rem" />
          <Skeleton mb="2rem" width="80%" height="3rem"/>
          <Skeleton height="3rem" />
        </Component.Content>
      </>
    }
  </Container>
</Overlay>

Component.Header = styled(Header)`${props => props.theme.popup.header}`
Component.Label = styled(Label)`${props => props.theme.popup.label}`
Component.Content = styled(Content)`${props => props.theme.popup.content}`
Component.Footer = styled(Footer)`${props => props.theme.popup.footer}`

Component.Skeleton = ComponentSkeleton

Component.Skeleton.defaultProps = {
  width: '500px'
}

export default Component
