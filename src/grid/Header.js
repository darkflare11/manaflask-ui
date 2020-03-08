import React from 'react';

import withResizeObserver from '../utils/WithResizeObserver';
import withColumnResize from './WithColumnResize';

import '../../styles/grid/Header.css';

const component = ({ columns, onStartColumnResize, headerRef, columnResizeStarted }) => {
  const cls = `grid-header ${columnResizeStarted ? 'grid-header-column-resizing' : ''}`;

  return (
    <div className={cls} ref={headerRef}>
      {columns.map((x, index) => {
        const ColumnHeader = x.getHeaderComponent();

        return (
          <ColumnHeader
            key={index}
            width={x.getCurrentWidth()}
            onStartColumnResize={e => onStartColumnResize(e, index)}
          />
        );
      })}
    </div>
  );
};

export default withColumnResize(withResizeObserver(component));
