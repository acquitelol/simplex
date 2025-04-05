import { useContext } from "react";
import { styles } from "../lib/styles";
import { SimplexContext } from "../App";
import { Cell } from "./Cell";

export function Matrix() {
  const { matrix } = useContext(SimplexContext);

  return (
    <div style={styles.matrix}>
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
