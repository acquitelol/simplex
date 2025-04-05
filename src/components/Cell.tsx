import { useContext } from "react";
import { SimplexContext } from "../App";
import { merge } from "../lib/styles";
import Fraction from "../lib/fraction";
import { pivot } from "../lib/simplex";
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
      {new Fraction(value || 0, 1).toDecimal()}
    </button>
  );
}
