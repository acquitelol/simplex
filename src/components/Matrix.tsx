import { useContext } from "react";
import { styles } from "../lib/styles";
import { Cell, PlainCell } from "./Cell";
import { SimplexContext } from "../lib/simplexContext";

export function Matrix() {
  const {
    matrix,
    oldRows: [rows],
    oldCols: [cols],
  } = useContext(SimplexContext);

  const colLabel = (col: number) => {
    if (col === cols - 1) return "RHS";
    if (col < cols - rows) return `x${col + 1}`;

    return `s${col - (cols - rows) + 1}`;
  };

  return (
    <div style={styles.matrix}>
      {matrix[0][0].map((_, col) => (
        <PlainCell
          key={`cell-${col}`}
          row={-1}
          col={-1}
          disabled={false}
          noop={true}
          style={{
            fontWeight: "bold",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          {colLabel(col)}
        </PlainCell>
      ))}
      {matrix[0].map((x, row, arr) => (
        <div key={row}>
          {x.map((value, col) => (
            <Cell
              key={`cell-${row}-${col}`}
              row={row}
              col={col}
              value={value}
            />
          ))}
          {row !== arr.length - 1 && <br />}
        </div>
      ))}
    </div>
  );
}
