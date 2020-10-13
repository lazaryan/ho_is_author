interface TextField {
    [propName: string]: string
}

export interface StructTheme<T> {
    [propName: string]: T,
    default: T
}

type ModuleStruct<T> = {
    styles?: StructTheme<T>,
    default: T | StructTheme<T>,
}

export type Style = string[]

export type StyledProps = {
    theme: Theme,
    disabled?: boolean
}

export type Button = {
    container: Style,
    button: Style,
    processingIcon: Style
}

export type Input = {
    label: Style,
    container: Style,
    input: Style
}

export type Text = {
    label: Style,
    accent: Style,
    header: Style,
    placeholder: Style,
    p: Style,
    required: Style,
    box: Style
}

export type Skeleton = Style

export type Textarea = Style

export type Container = {
    header: Style,
    content: Style,
    footer: Style,
    tile: Style
}

export type Dropdown = {
    container: Style,
    toggle: Style,
    dropdown: Style,
    button: Style
}

export type Icon = Style

export type Search = {
    container: Style,
    input: Style,
    dropdown: Style,
    label: Style,
    option: Style,
    searchIcon: Style,
    processingIcon: Style
}

export type Select = {
    container: Style,
    toggle: Style,
    option: Style,
    dropdown: Style
}

export type Popup = {
    overlay: Style,
    container: Style,
    header: Style,
    label: Style,
    content: Style,
    footer: Style
}

export type Radio = {
    toggle: Style
}

export type Grid = {
    header: Style;
    row: Style;
    cell: Style;
    placeholder: Style;
}

export type Colors = {
    fg: TextField,
    bg: TextField
}

export interface MixinIcons {
    [propName: string]: {
        [propName: string]: string
    }
}

export type Mixin = {
    transition: Style,
    fade: Style,
    icons: MixinIcons,
    rotateZ: Style,
    overlining: Style,
    underline: Style,
    shadow: Style
}

export type Theme = {
    button: ModuleStruct<Button>,
    input: ModuleStruct<Input>,
    text: ModuleStruct<Text>,
    skeleton: ModuleStruct<Skeleton>,
    container: ModuleStruct<Container>,
    dropdown: ModuleStruct<Dropdown>,
    icon: ModuleStruct<Icon>,
    search: ModuleStruct<Search>,
    select: ModuleStruct<Select>,
    textarea: ModuleStruct<Textarea>,
    popup: ModuleStruct<Popup>,
    radio: ModuleStruct<Radio>,
    grid: ModuleStruct<Grid>,
    colors: Colors,
    mixin: Mixin
}
