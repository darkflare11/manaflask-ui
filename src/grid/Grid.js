import React, { Component } from 'react';

import { HeaderContainer } from './HeaderContainer';
import { TableContainer } from './TableContainer';
import Column from './column/Column';

import '../../styles/grid/Grid.css';

export class Grid extends Component {
  constructor (props){
    super(props);

    this.state = {
      columns: this.createColumns(this.props.columns)
     };
  }

  createColumns (columnsConfig){
    return columnsConfig.map((x, index) => {
      return new Column({
        text: x.text,
        resizible: x.resizible && (index < columnsConfig.length - 1),
        fieldName: x.fieldName
      });
    });
  }

  onColumnsSizeChanged (columns){
    this.setState({ columns });
  }

  render (){
    return (
      <div className="grid">
        <HeaderContainer
          columns={this.state.columns}
          onColumnsSizeChanged={sizes => this.onColumnsSizeChanged(sizes)}
        />
        <TableContainer
          columns={this.state.columns}
          data={this.props.data}
          stripeRows={this.props.stripeRows}
        />
      </div>
    );
  }
}
