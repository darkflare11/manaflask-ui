import React, { Component, Fragment } from 'react';

import { getColumnOffsetX } from './ColumnsSizePolicy';

import '../../styles/grid/ResizeMarker.css';

export default ({ columns, resizingColumnIndex, needResizeMarker, newColumnWidth }) => {
  const left = getColumnOffsetX(columns, columns[resizingColumnIndex]),
    leftMarkerStyle = needResizeMarker ? { left } : { display: 'none' },
    rightMarkerStyle = needResizeMarker ? { left: left + newColumnWidth } : { display: 'none' };

  return (
    <Fragment>
      <div className="grid-column-resize-marker" style={leftMarkerStyle} />
      <div className="grid-column-resize-marker" style={rightMarkerStyle} />
    </Fragment>
  );
}
