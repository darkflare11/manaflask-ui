import React, { Component } from 'react';

import { Table } from './Table';
import withResizeObserver from '../utils/WithResizeObserver';

const VerticalScrollObserver = withResizeObserver(() => (<div/>));

export class TableContainer extends Component {
  constructor (props){
    super(props);

    this.containerRef = React.createRef();

    this.state = { vScrollerWidth: 0 };
  }

  onScrollObserverResize ({ width }){
    const containerWidth = this.containerRef.current.getBoundingClientRect().width,
      vScrollerWidth = containerWidth - width;

    this.setState({ vScrollerWidth });
  }

  render (){
    return (
      <div ref={this.containerRef} className="grid-table-container">
        <VerticalScrollObserver
          onResize={rect => this.onScrollObserverResize(rect)}
        />
        <Table
          {...this.props}
          vScrollerWidth={this.state.vScrollerWidth}
        />
      </div>
    )
  }
}
