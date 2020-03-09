const minColumnWidth = 40;
const defaultColumnWidth = 100;

export const getColumnsWidth = (columns) => {
  return columns.reduce((a, b) => a + (b.getCurrentWidth() || 0), 0);
}

export const getMinColumnWidth = (columns, column) => {
  return minColumnWidth;
};

export const getColumnOffsetX = (columns, column) => {
  const columnIndex = columns.indexOf(column);

  return getColumnsWidth(columns.slice(0, columnIndex));
}

function applyInitialColumnWidths (columns, headerWidth){
  columns.forEach(column => column.setCurrentWidth(defaultColumnWidth));
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
  }
}

export const applyNewColumnWidth = (columns, column, columnWidth) => {
  column.setCurrentWidth(columnWidth);
}
