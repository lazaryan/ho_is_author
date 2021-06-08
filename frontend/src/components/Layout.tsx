import { FC, ReactNode } from 'react';
import { Grid, SemanticWIDTHS } from 'semantic-ui-react';
import cx from 'helpers/cx';
import { IKeyValue } from 'types/interfaces';

interface IWidthProp {
  contentWidth?: SemanticWIDTHS;
  sidebarWidth?: SemanticWIDTHS;
}

interface IProps {
  id: string;
  content?: ReactNode | null;
  sidebar?: ReactNode | null;
  width?: IWidthProp;
  height?: number;
  minHeight?: number;
}

const defaultWidth: IWidthProp = {
  contentWidth: 5,
  sidebarWidth: 11
};

const Layout: FC<IProps> = ({ id, height, minHeight, content= null, sidebar= null, width = defaultWidth }) => {
  const { contentWidth, sidebarWidth } = width;
  const style: IKeyValue = {};

  if (height) {
    style.height = height;
  }

  if (minHeight) {
    style.minHeight = minHeight;
  }

  return (<Grid style={style} className={cx(id)}>
    <Grid.Row columns={2}>
      <Grid.Column
        width={contentWidth}
        className={cx(['sidebar', `${id}-sidebar`])}>
        {sidebar}
      </Grid.Column>
      <Grid.Column
        width={sidebarWidth}
        className={cx(['content', `${id}-content`])}>
        {content}
      </Grid.Column>
    </Grid.Row>
  </Grid>);
}

export default Layout;
