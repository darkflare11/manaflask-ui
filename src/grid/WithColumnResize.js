import React, { Component, Fragment } from 'react';

import MouseTracker from '../utils/MouseTracker';
import { getMinColumnWidth, getMaxColumnWidth, getColumnOffsetX } from './ColumnsSizePolicy';

export default (Header) => {
  return class extends Component {
    constructor (props){
      super(props);

      this.headerRef = React.createRef();

      this.columnResizeStarted = false;
      this.resizingColumnIndex = null;
      this.minColumnWidth = null;
      this.maxColumnWidth = null;
    }

    onGlobalMouseMove (e){
      if (this.columnResizeStarted){
        const headerClientX = this.headerRef.current.getBoundingClientRect().left,
          newColumnWidth = e.clientX - headerClientX - this.columnOffsetX,
          columnTooSmall = newColumnWidth < this.minColumnWidth,
          collumnTooLarge = newColumnWidth > this.maxColumnWidth;

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
      this.columnResizeStarted = true;
      this.resizingColumnIndex = index;

      this.minColumnWidth = getMinColumnWidth(this.props.columns, this.props.columns[index]);
      this.maxColumnWidth = getMaxColumnWidth(this.props.columns, this.props.columns[index]);
      this.columnOffsetX = getColumnOffsetX(this.props.columns, this.props.columns[index]);

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
