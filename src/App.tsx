import { useState } from "react";
import { Actions } from "./components/Actions";
import { Header } from "./components/Header";
import { Matrix } from "./components/Matrix";
import { SimplexContext } from "./lib/simplex";
import { useStorageValue } from "./lib/useStorageValue";
import { Footer } from "./components/Footer";
import { styles } from "./lib/styles";

function App() {
  const rows = useStorageValue("rows", "4", Number);
  const cols = useStorageValue("cols", "10", Number);

  const oldRows = useStorageValue("rows", "4", Number);
  const oldCols = useStorageValue("cols", "10", Number);

  const editing = useState(false);

  const matrix = useStorageValue<number[][]>(
    "matrix",
    "[]",
    JSON.parse,
    JSON.stringify,
  );

  const scratchMatrix = useStorageValue<number[][]>(
    "matrix",
    "[]",
    JSON.parse,
    JSON.stringify,
  );

  const prevStates = useStorageValue<Set<number[][]>>(
    "prevStates",
    "[]",
    (x) => new Set(JSON.parse(x) as number[][][]),
    (x) => JSON.stringify(Array.from(x)),
  );

  return (
    <SimplexContext.Provider
      value={{
        rows,
        cols,
        oldRows,
        oldCols,
        matrix,
        scratchMatrix,
        editing,
        prevStates,
      }}
    >
      <div style={styles.root}>
        <h1>Simplex Solver</h1>
        <Header />
        <Matrix />
        <Actions />
        <Footer />
      </div>
    </SimplexContext.Provider>
  );
}

export default App;
