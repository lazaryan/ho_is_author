import React from 'react'
import { Theme } from 'theme/types'

export interface Style {
    [propName: string]: string
}

export interface SxProps {
    [propName: string]: string
}

export interface Context<T> {
    styles: T | undefined
}

export interface Props<T, U> extends React.HTMLAttributes<U> {
    style?: Style,
    styles?: T,
    theme?: Theme,
    sx?: SxProps,
    key?: any,
    className?: string,
    'data-testid'?: string
}

export interface UIElement<T> {
    (props: T): React.ReactNode | React.ReactElement<any> | Element | string,
    defaultProps?: T,
    [propName: string]: any
}