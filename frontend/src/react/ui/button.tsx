import React from 'react'
import styled from 'styled-components'
import { Flex } from 'reflexbox'

import { button as buttonStyles } from 'theme'
import { Button as ButtonType } from 'theme/types'
import { Props, Context, UIElement } from './types'

interface ButtonProps extends Props<ButtonType, HTMLDivElement> {
    onClick?: (e?: React.MouseEvent) => void,
    disabled?: boolean,
    background?: string,
    isProcessing?: boolean,
    active?: boolean
}

interface Btn extends Props<ButtonType, HTMLButtonElement> {
    onClick?: (e?: React.MouseEvent) => void,
    disabled?: boolean,
    background?: string,
    active?: boolean
}

const context: Context<ButtonType> = { styles: undefined }

export const Component: UIElement<ButtonProps> = props => {
    context.styles = props.styles || buttonStyles.styles.default

    return (
        <Container sx={props.sx}>
            <Button {...props} />
            {props.isProcessing && <ProcessingIcon data-testid="ui-button-icon-processing" />}
        </Container>
    )
}

Component.defaultProps = {
    isProcessing: false
}

export const Button = styled((props: Btn) => <button {...props} />)`${() => context.styles.button}`
export const Container = styled(Flex)`${() => context.styles.container}`
export const ProcessingIcon = styled.span`${() => context.styles.processingIcon}`

export default Component
