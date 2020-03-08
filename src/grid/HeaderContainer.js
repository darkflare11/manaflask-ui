import React, { Component, Fragment } from 'react';

import Header from './Header';
import ResizeMarker from './ResizeMarker';
import { applyNewHeaderWidth, applyNewColumnWidth  } from './ColumnsSizePolicy';

export class HeaderContainer extends Component {
  constructor (props){
    super(props);

    this.state = {
      resizingColumnIndex: null,
      columnResizeStarted: false,
      newColumnWidth: null
    };
  }

  onHeaderResize ({ width }){
    const columns = [ ...this.props.columns ];

    applyNewHeaderWidth(columns, width);

    this.props.onColumnsSizeChanged(columns);
  }

  onStartColumnResize (index){
    this.setState({
      columnResizeStarted: true,
      resizingColumnIndex: index,
      newColumnWidth: this.props.columns[index].getCurrentWidth()
    });
  }

  onColumnResize (newColumnWidth){
    this.setState({ newColumnWidth });
  }

  onEndColumnResize (){
    const columns = [ ...this.props.columns ];

    applyNewColumnWidth(columns, columns[this.state.resizingColumnIndex], this.state.newColumnWidth);
    this.setState({ columnResizeStarted: false });

    this.props.onColumnsSizeChanged(columns);
  }

  render (){
    return (
      <Fragment>
        <Header
          columns={this.props.columns}
          onStartColumnResize={index => this.onStartColumnResize(index)}
          onColumnResize={newWidth => this.onColumnResize(newWidth)}
          onEndColumnResize={() => this.onEndColumnResize()}
          onResize={rect => this.onHeaderResize(rect)}
        />
        <ResizeMarker
          columns={this.props.columns}
          resizingColumnIndex={this.state.resizingColumnIndex}
          needResizeMarker={this.state.columnResizeStarted}
          newColumnWidth={this.state.newColumnWidth}
        />
      </Fragment>
    );
  }
}
