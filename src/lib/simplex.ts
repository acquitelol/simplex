import { createContext } from "react";

export const SimplexContext = createContext({} as SimplexContextType);

export const isOptimal = (matrix: number[][]) =>
  matrix[0].slice(0, matrix[0].length - 1).every((x) => x >= 0);

export function pivot(
  matrix: number[][],
  row: number,
  col: number,
  rows: number,
) {
  const newMatrix = matrix.map((row) => [...row]);
  const p = newMatrix[row][col];
  newMatrix[row] = newMatrix[row].map((val) => val / p);

  for (let i = 0; i < rows; ++i) {
    if (i === row) continue;

    const m = newMatrix[i][col];
    newMatrix[i] = newMatrix[i].map((val, j) => val - newMatrix[row][j] * m);
  }

  return newMatrix;
}

export function autoPivot(matrix: number[][], rows: number, cols: number) {
  // Ignore the RHS row when finding the pivot column
  const c = matrix[0].findIndex(
    (x) => x === Math.min(...matrix[0].slice(0, matrix[0].length - 1)),
  );

  if (c === -1) return;

  // Find the row with the smallest ratio
  const ratios = matrix.slice(1).map((x, i) => {
    const pivot = x[c];
    return pivot > 0 ? matrix[i + 1][cols - 1] / pivot : Infinity;
  });

  const r = ratios.findIndex((x) => x === Math.min(...ratios));
  if (r === -1) return;

  return pivot(matrix, r + 1, c, rows);
}
