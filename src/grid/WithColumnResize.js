import React, { Component, Fragment } from 'react';

import MouseTracker from '../utils/MouseTracker';
import { getMinColumnWidth, getColumnOffsetX } from './ColumnsSizePolicy';

export default (Header) => {
  return class extends Component {
    constructor (props){
      super(props);

      this.headerRef = React.createRef();

      this.columnResizeStarted = false;
      this.resizingColumnIndex = null;
      this.minColumnWidth = null;
    }

    onGlobalMouseMove (e){
      if (this.columnResizeStarted){
        const { left, width } = this.headerRef.current.getBoundingClientRect(),
          newColumnWidth = e.clientX - left - this.columnOffsetX,
          maxColumnWidth = width - this.columnOffsetX,
          columnTooSmall = newColumnWidth < this.minColumnWidth,
          collumnTooLarge = newColumnWidth > maxColumnWidth;

        if (!columnTooSmall && !collumnTooLarge){
          this.props.onColumnResize(newColumnWidth);
        }
      }
    }

    onGlobalMouseUp (e){
      if (this.columnResizeStarted){
        this.columnResizeStarted = false;

        this.props.onEndColumnResize();
      }
    }

    onStartColumnResize (e, index){
      const columns = this.props.columns;

      this.columnResizeStarted = true;
      this.resizingColumnIndex = index;

      this.minColumnWidth = getMinColumnWidth(columns, columns[index]);
      this.columnOffsetX = getColumnOffsetX(columns, columns[index]);

      this.props.onStartColumnResize(index);
    }

    render (){
      const headerProps = {
        ...this.props,
        onStartColumnResize: (e, index) => this.onStartColumnResize(e, index),
        headerRef: this.headerRef
      };

      delete headerProps.columnsSizePolicy;

      return (
        <Fragment>
          <MouseTracker
            onMouseUp={e => this.onGlobalMouseUp(e)}
            onMouseMove={e => this.onGlobalMouseMove(e)}
          />
          <Header {...headerProps} />
        </Fragment>
      );
    }
  }
};
