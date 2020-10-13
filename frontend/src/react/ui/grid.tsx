import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Flex } from 'reflexbox'
import Skeleton from './skeleton'
import theme from 'theme'
import Icon from './icon'

import { grid as gridStyles } from 'theme'
import { Grid as GridType } from 'theme/types'
import { Props, Context, UIElement } from './types'

interface GridProps extends Props<GridType, HTMLDivElement> {}

const context: Context<GridType> = { styles: undefined }

export const Component: UIElement<GridProps> = props => {
	context.styles = props.styles || gridStyles.styles.default

	return (
		<Flex flex="1" flexDirection="column" {...props} />
	)
}

export const Header = props => {
	return (
		<Flex width="100%" {...props}>
			{props.sort == 'desc' && <Icon currentSort={props.currentSort} background={theme.mixin.icons.dark.arrow_desc} width="1.5rem" data-testid="ui-grid-sort-desc"/>}
			<label>{props.children}</label>
			{props.sort == 'asc' && <Icon currentSort={props.currentSort} background={theme.mixin.icons.dark.arrow_asc} width="1.5rem" data-testid="ui-grid-sort-asc"/>}
		</Flex>
	)
}

export const Row = props => <Flex alignItems="center" {...props} />
export const Cell = props => <Flex width="100%" {...props} />
export const Placeholder = props => <label {...props} />
export const RowSkeleton = props => <Skeleton height="4rem" {...props} />

Row.Skeleton = RowSkeleton

Component.Header = styled(Header)`${() => context.styles.header}`
Component.Row = styled(Row)`${() => context.styles.row}`
Component.Cell = styled(Cell)`${() => context.styles.cell}`
Component.Placeholder = styled(Placeholder)`${() => context.styles.placeholder}`

Header.propTypes = {
	sort: PropTypes.oneOf(['desc', 'asc']),
	children: PropTypes.node,
	currentSort: PropTypes.bool
}

Component.propTypes = {
	styles: PropTypes.object
}

Component.defaultProps = {
	styles: theme.grid.styles.default
}

export default Component