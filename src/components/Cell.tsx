import { useContext, useMemo } from "react";
import { SimplexContext } from "../lib/simpleContext";
import { pivot } from "../lib/simplex";
import { merge } from "../lib/styles";
import { deepEqual, setWithDedupe } from "../lib/util";

export function Cell({
  row,
  col,
  value,
}: {
  row: number;
  col: number;
  value: number;
}) {
  const {
    matrix: [matrix, setMatrix],
    rows: [rows],
    editing: [editing],
    scratchMatrix: [scratchMatrix, setScratchMatrix],
    prevStates: [, setPrevStates],
  } = useContext(SimplexContext);

  const pivotWithState = (row: number, col: number) => {
    const newMatrix = pivot(matrix, row, col, rows);

    setPrevStates((prev) => setWithDedupe([...prev, matrix], deepEqual));
    setMatrix(newMatrix);
  };

  const safeValue = useMemo(() => value || 0, [value]);

  return editing ? (
    <input
      key={`cell-${row}-${col}`}
      style={merge((s) => [
        s.cell,
        {
          WebkitAppearance: "none",
          MozAppearance: "textfield",
        },
      ])}
      type="number"
      onChange={(e) => {
        const value = +e.target.value;
        setScratchMatrix((prev) => {
          const copy = prev.map((row) => [...row]);
          copy[row][col] = value;
          return copy;
        });
      }}
      value={scratchMatrix[row][col] || ""}
    />
  ) : (
    <button
      key={`cell-${row}-${col}`}
      style={merge((s) => [
        s.cell,
        { opacity: (value || 0) == 0 ? 0.5 : "initial" },
      ])}
      disabled={(value || 0) == 0}
      onClick={() => pivotWithState(row, col)}
    >
      {Math.floor(safeValue) == safeValue ? safeValue : safeValue.toFixed(3)}
    </button>
  );
}
