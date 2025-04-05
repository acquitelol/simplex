import { useContext } from "react";
import { SimplexContext } from "../lib/simpleContext";
import { autoPivot, isOptimal } from "../lib/simplex";
import { merge, styles } from "../lib/styles";
import { deepEqual, setWithDedupe } from "../lib/util";

export function Footer() {
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
    !editing && (
      <>
        <br />
        <button style={styles.button} onClick={solve}>
          Solve
        </button>
        <button style={styles.button} onClick={autoPivotWithState}>
          Pivot once automatically
        </button>
        <button
          onClick={unpivot}
          disabled={!prevStates.size}
          style={merge((s) => [
            s.button,
            { opacity: prevStates.size ? "initial" : 0.5 },
          ])}
        >
          Unpivot
        </button>
        <button
          onClick={unsolve}
          disabled={!prevStates.size}
          style={merge((s) => [
            s.button,
            { opacity: prevStates.size ? "initial" : 0.5 },
          ])}
        >
          Unsolve
        </button>
      </>
    )
  );
}
