const minColumnWidth = 40;

export const getMinColumnWidth = (columns, column) => {
  return minColumnWidth;
};

export const getMaxColumnWidth = (columns, column) => {
  const columnIndex = columns.indexOf(column),
    currentAndRightColumnsWidth = columns.slice(columnIndex).reduce((a, b) => a + b.getCurrentWidth(), 0),
    rightColumnsMinWidth = columns.slice(columnIndex + 1)
      .reduce((a, b, index) => a + getMinColumnWidth(columns, b), 0);

  return currentAndRightColumnsWidth - rightColumnsMinWidth;
}

export const getColumnOffsetX = (columns, column) => {
  const columnIndex = columns.indexOf(column);

  return columns.slice(0, columnIndex).reduce((a, b) => a + b.getCurrentWidth(), 0);
}

function applyInitialColumnWidths (columns, headerWidth){
  const columnsCount = columns.length,
    columnWidth = Math.floor(headerWidth / columnsCount);

  columns.forEach((x, index) => {
    const newColumnWidth = index < columnsCount - 1 ? columnWidth : (headerWidth - columnWidth * (columnsCount - 1));

    x.setCurrentWidth(newColumnWidth);
  });
}

function scaleColumnWidths (columns, headerWidth){
  let oldHeaderWidth = columns.reduce((a ,b) => a + b.getCurrentWidth(), 0),
    columnRatios = columns.map(x => x.getCurrentWidth() / oldHeaderWidth),
    columnWidthsExceptLast = 0;

  columns.forEach((x, index) => {
    if (index < columns.length - 1){
      const newColumnWidth = Math.max(Math.floor(headerWidth * columnRatios[index]), minColumnWidth);

      x.setCurrentWidth(newColumnWidth);
      columnWidthsExceptLast += newColumnWidth;
    } else {
      x.setCurrentWidth(headerWidth - columnWidthsExceptLast);
    }
  });
}

export const applyNewHeaderWidth = (columns, headerWidth) => {
  const notCalculatedYet = columns[0].getCurrentWidth() === null;

  if (notCalculatedYet){
    applyInitialColumnWidths(columns, headerWidth);
  } else {
    scaleColumnWidths(columns, headerWidth);
  }
}

export const applyNewColumnWidth = (columns, column, columnWidth) => {
  let index = columns.indexOf(column),
    overflow = columnWidth - column.getCurrentWidth();

  column.setCurrentWidth(columnWidth);

  if (overflow <= 0){
    columns[index + 1].setCurrentWidth(columns[index + 1].getCurrentWidth() - overflow);
  } else {
    for (let i = index + 1; i < columns.length || overflow > 0; i++){
      if (overflow + minColumnWidth > columns[i].getCurrentWidth()){
        overflow = overflow - columns[i].getCurrentWidth() + minColumnWidth;

        columns[i].setCurrentWidth(minColumnWidth);
      } else {
        columns[i].setCurrentWidth(columns[i].getCurrentWidth() - overflow);

        overflow = 0;
      }
    }
  }
}
