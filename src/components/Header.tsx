import { useContext, useEffect } from "react";
import { SimplexContext } from "../lib/simplex";
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
      <div style={styles.headerFields}>
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

      <div style={styles.buttons}>
        <button
          style={styles.button}
          onClick={toggleEditing}
          title={
            editing
              ? "Exit editing mode to begin pivoting"
              : "Enter editing mode to edit the tableau"
          }
        >{`Edit (${editing ? "✓" : "✗"})`}</button>
        <button
          style={styles.button}
          onClick={changeDimensions}
          title="Update the tableau with the new rows and columns specified"
        >
          Update dimensions
        </button>
        <button
          style={styles.button}
          onClick={clear}
          title="Clear the entire tableau, essentially filling it with zeroes"
        >
          Clear matrix
        </button>
      </div>
    </>
  );
}
