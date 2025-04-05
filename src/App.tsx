import { useState } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Matrix } from "./components/Matrix";
import { SimplexContext } from "./lib/simpleContext";
import { useStorageValue } from "./lib/useStorageValue";

function App() {
  const rows = useStorageValue("rows", Number, "4");
  const cols = useStorageValue("cols", Number, "10");

  const oldRows = useStorageValue("rows", Number, "4");
  const oldCols = useStorageValue("cols", Number, "10");

  const editing = useState(false);

  const matrix = useStorageValue<number[][]>(
    "matrix",
    JSON.parse,
    "[]",
    JSON.stringify,
  );

  const scratchMatrix = useStorageValue<number[][]>(
    "matrix",
    JSON.parse,
    "[]",
    JSON.stringify,
  );

  const prevStates = useStorageValue<Set<number[][]>>(
    "prevStates",
    (x) => new Set(JSON.parse(x) as number[][][]),
    "[]",
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
      <h1>Simplex Solver</h1>
      <Header />
      <br />
      <br />
      <Matrix />
      <Footer />
    </SimplexContext.Provider>
  );
}

export default App;
