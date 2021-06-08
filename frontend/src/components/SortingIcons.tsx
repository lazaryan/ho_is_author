import { FC } from 'react';
import classNames from 'classnames';
import { ReactComponent as SortIcon } from 'assets/images/sort.svg';
import { Reducer } from 'types/types'

export interface ISort<T = string> {
  field: T;
  direction: 'asc' | 'desc';
}

export interface ISortIcon<T = string> {
  active: boolean;
  field: T;
  direction: 'asc' | 'desc';
  setSorting: Reducer<ISort<any>>;
}

const SortingIcons: FC<ISortIcon> = ({ active, direction, field, setSorting }) => {
  const updateState = () => {
    if (!active) {
      setSorting({ field, direction: 'asc' })
    } else {
      if (direction === 'asc') {
        setSorting({ field, direction: 'desc' })
      } else {
        setSorting({ field: '', direction: 'asc' })
      }
    }
  }

  return (
    <SortIcon
      className={classNames('sorting-icon', active && direction)}
      onClick={() => updateState()}
    />
  )
}

export default SortingIcons;
