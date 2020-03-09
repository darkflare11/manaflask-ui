import React, { Component } from 'react';

import { getColumnsWidth } from './ColumnsSizePolicy';

import '../../styles/grid/Table.css';

export function Table ({ columns, data, stripeRows, vScrollerWidth, containerWidth }){
  const needFixLastCell = getColumnsWidth(columns) >= containerWidth;

  return (
    <table className="grid-table" cellPadding="0">
      <tbody>
        {
          data.map((x, index) => {
            const rowCls = stripeRows && (index % 2) ? 'grid-table-row-odd' : '';

            return (
              <tr key={index} className={rowCls}>
                {columns.map((y, index2) => {
                  const isLastCell = index2 == columns.length - 1,
                    currentWidth = y.getCurrentWidth(),
                    width = isLastCell && needFixLastCell ? currentWidth - vScrollerWidth : currentWidth,
                    styles = width ? { width } : {},
                    CellComponent = y.getCellComponent();

                  return (
                    <td className="grid-table-cell" key={index2} style={styles}>
                      <div className="grid-table-cell-inner">
                        <CellComponent row={x} />
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
}
