import { PropsWithChildren, useContext, useMemo } from "react";
import { SimplexContext } from "../lib/simplexContext";
import { pivot } from "../lib/simplex";
import { merge } from "../lib/styles";
import { deepEqual, setWithDedupe } from "../lib/util";

export function PlainCell({
  row,
  col,
  disabled,
  noop,
  children,
  style,
}: PropsWithChildren<{
  row: number;
  col: number;
  disabled: boolean;
  noop: boolean;
  style?: React.CSSProperties;
}>) {
  const {
    matrix: [matrix, setMatrix],
    rows: [rows],
    prevStates: [, setPrevStates],
  } = useContext(SimplexContext);

  const pivotWithState = (row: number, col: number) => {
    const newMatrix = pivot(matrix, row, col, rows);

    setPrevStates((prev) => setWithDedupe([...prev, matrix], deepEqual));
    setMatrix(newMatrix);
  };

  return (
    <button
      key={`cell-${row}-${col}`}
      style={merge((s) => [
        s.cell,
        style ?? {},
        { opacity: disabled ? 0.5 : "initial" },
      ])}
      disabled={disabled}
      onClick={() => !disabled && !noop && pivotWithState(row, col)}
    >
      {children}
    </button>
  );
}

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
    editing: [editing],
    scratchMatrix: [scratchMatrix, setScratchMatrix],
  } = useContext(SimplexContext);

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
    <PlainCell row={row} col={col} disabled={safeValue == 0} noop={false}>
      {Math.floor(safeValue) == safeValue ? safeValue : safeValue.toFixed(3)}
    </PlainCell>
  );
}
