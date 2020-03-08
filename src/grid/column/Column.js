import React, { Fragment } from 'react';

import '../../../styles/grid/column/Column.css';

export default class Column {
  constructor ({ text, fieldName, resizible }){
    this.text = text;
    this.fieldName = fieldName;
    this.resizible = resizible;

    this.currentWidth = null;
  }

  getCurrentWidth (){
    return this.currentWidth;
  }

  setCurrentWidth (width){
    this.currentWidth = width;
  }

  getHeaderComponent (){
    if (!this.headerComponent){
      this.headerComponent = this.createHeaderComponent();
    }

    return this.headerComponent;
  }

  getCellComponent (){
    if (!this.cellComponent){
      this.cellComponent = this.createCellComponent();
    }

    return this.cellComponent;
  }

  createHeaderComponent (){
    const { text, resizible } = this;

    return ({ width, onStartColumnResize }) => {
      const columnStyle = width ? { width } : {};

      return (
        <div className="grid-column-header" style={columnStyle}>
          <div className="grid-column-header-text">
            {text}
          </div>
          {resizible ? (
            <div className="grid-column-resize-splitter"
              onMouseDown={e => onStartColumnResize(e)}
            />) : null
          }
        </div>
      )
    }
  }

  createCellComponent (){
    const { fieldName } = this;

    return ({ row }) => {
      const value = row[fieldName] || '';

      return (
        <Fragment>{value}</Fragment>
      );
    }
  }
}
