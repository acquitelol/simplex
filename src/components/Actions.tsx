import { useContext } from "react";
import { SimplexContext } from "../lib/simplex";
import { autoPivot, isOptimal } from "../lib/simplex";
import { merge, styles } from "../lib/styles";
import { deepEqual, setWithDedupe } from "../lib/util";

export function Actions() {
  const {
    rows: [rows],
    cols: [cols],
    matrix: [matrix, setMatrix],
    editing: [editing],
    prevStates: [prevStates, setPrevStates],
  } = useContext(SimplexContext);

  const autoPivotWithState = () => {
    const newMatrix = autoPivot(matrix, rows, cols);
    if (!newMatrix) return;

    setPrevStates((prev) => setWithDedupe([...prev, matrix], deepEqual));
    setMatrix(newMatrix);
  };

  const unpivot = () => {
    const last = [...prevStates][prevStates.size - 1];

    setPrevStates((prev) =>
      setWithDedupe([...prev].slice(0, prev.size - 1), deepEqual),
    );

    setMatrix(last!); // Button is disabled when there are no prevStates
  };

  const solve = () => {
    const solvePrevStates: number[][][] = [...prevStates];
    let solveMatrix = matrix.map((row) => [...row]);

    while (!isOptimal(solveMatrix)) {
      const matrix = autoPivot(solveMatrix, rows, cols);
      if (!matrix) break;

      solvePrevStates.push(solveMatrix);
      solveMatrix = matrix;
    }

    setPrevStates(setWithDedupe(solvePrevStates, deepEqual));
    setMatrix(solveMatrix);
  };

  const unsolve = () => {
    if (prevStates.size) setMatrix([...prevStates][0]);
    setPrevStates(setWithDedupe([], deepEqual));
  };

  return (
    <div style={styles.buttons}>
      <button
        onClick={solve}
        disabled={editing}
        title="Attempt to solve the entire tableau in a single step"
        style={merge((s) => [
          s.button,
          { opacity: !editing ? "initial" : 0.5 },
        ])}
      >
        Solve
      </button>
      <button
        onClick={autoPivotWithState}
        disabled={editing}
        title="Automatically perform a single iteration of the simplex algorithm"
        style={merge((s) => [
          s.button,
          { opacity: !editing ? "initial" : 0.5 },
        ])}
      >
        Pivot once
      </button>
      <button
        onClick={unpivot}
        disabled={!prevStates.size || editing}
        title="Undo a single pivot performed with the simplex algorithm"
        style={merge((s) => [
          s.button,
          { opacity: prevStates.size && !editing ? "initial" : 0.5 },
        ])}
      >
        Unpivot once
      </button>
      <button
        onClick={unsolve}
        disabled={!prevStates.size || editing}
        title="Completely unsolve the tableau and return to the initial tableau"
        style={merge((s) => [
          s.button,
          { opacity: prevStates.size && !editing ? "initial" : 0.5 },
        ])}
      >
        Unsolve
      </button>
    </div>
  );
}
