import React, { Component } from 'react';

import '../../styles/grid/Table.css';

export function Table ({ columns, data, stripeRows }){
  return (
    <div className="grid-table-container">
      <table className="grid-table" cellPadding="0">
        <tbody>
          {
            data.map((x, index) => {
              const rowCls = stripeRows && (index % 2) ? 'grid-table-row-odd' : '';

              return (
                <tr key={index} className={rowCls}>
                  {columns.map((y, index2) => {
                    const width = y.getCurrentWidth(),
                      needWidthStyle = width && index2 < columns.length - 1,
                      styles = needWidthStyle ? { width } : {},
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
    </div>
  );
}
