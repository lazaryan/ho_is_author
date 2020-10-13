import React from 'react'
import { CSSTransition } from 'react-transition-group'

import { Props } from './types'

interface TransitionProps extends Props<any, HTMLDivElement> {
    in: boolean,
    classNames?: string,
    delayed?: number | boolean,
}

export const Transition = (props: TransitionProps) => <CSSTransition timeout={props.delayed ? 200 : 0} unmountOnExit {...props} />

export default Transition
