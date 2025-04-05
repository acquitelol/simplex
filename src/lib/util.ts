export function setWithDedupe<T>(arr: T[], deepEq: (x: T, y: T) => boolean) {
  const result: T[] = [];
  for (const item of arr) {
    if (!result.some((existing) => deepEq(item, existing))) {
      result.push(item);
    }
  }

  return new Set(result);
}

export function deepEqual(a: number[][], b: number[][]) {
  return a.every((x, i) => x.every((y, j) => y == b[i][j]));
}

export function generateEmptyMatrix(rows: number, cols: number) {
  return new Array(rows || 1)
    .fill(0)
    .map(() => new Array(cols || 1).fill(0).map(() => 0));
}
