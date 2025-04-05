import { useContext, useEffect } from "react";
import { SimplexContext } from "../lib/simpleContext";
import { styles } from "../lib/styles";
import { deepEqual, generateEmptyMatrix, setWithDedupe } from "../lib/util";

export function Header() {
  const {
    rows: [rows, setRows],
    cols: [cols, setCols],
    oldRows: [oldRows, setOldRows],
    oldCols: [oldCols, setOldCols],
    matrix: [matrix, setMatrix],
    scratchMatrix: [scratchMatrix, setScratchMatrix],
    editing: [editing, setEditing],
    prevStates: [, setPrevStates],
  } = useContext(SimplexContext);

  const changeDimensions = () => {
    const newMatrix = generateEmptyMatrix(rows, cols);

    for (let i = 0; i < oldRows; ++i) {
      if (i >= rows) break;

      for (let j = 0; j < oldCols; ++j) {
        if (j >= cols) break;
        newMatrix[i][j] = matrix?.[i]?.[j];
      }
    }

    setOldRows(rows);
    setOldCols(cols);
    setMatrix(newMatrix as typeof matrix);
    setScratchMatrix(newMatrix as typeof matrix);
  };

  const toggleEditing = () => {
    setEditing((prev) => {
      if (prev) {
        setMatrix(scratchMatrix.map((row) => [...row]));
      } else {
        setScratchMatrix(matrix.map((row) => [...row]));
      }

      return !prev;
    });
  };

  const clear = () => {
    setMatrix(generateEmptyMatrix(rows, cols));
    setScratchMatrix(generateEmptyMatrix(rows, cols));
    setPrevStates(setWithDedupe([], deepEqual));
  };

  useEffect(() => {
    changeDimensions(); // Initial configuration
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={styles.field}>
          <label htmlFor="rows" style={styles.label}>
            Rows
          </label>
          <input
            id="rows"
            onChange={(e) => setRows(Number(e.target.value))}
            value={rows || ""}
            type="number"
          />
        </div>

        <div style={styles.field}>
          <label htmlFor="cols" style={styles.label}>
            Columns
          </label>
          <input
            id="cols"
            onChange={(e) => setCols(Number(e.target.value))}
            value={cols || ""}
            type="number"
          />
        </div>
      </div>

      <br />

      <div style={styles.headerButtons}>
        <button
          style={styles.button}
          onClick={toggleEditing}
        >{`Edit (${editing ? "✓" : "✗"})`}</button>
        <button style={styles.button} onClick={changeDimensions}>
          Update dimensions
        </button>
        <button style={styles.button} onClick={clear}>
          Clear matrix
        </button>
      </div>
    </>
  );
}
