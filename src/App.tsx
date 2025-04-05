import { Context, createContext, useState } from "react";
import { useStorageValue } from "./lib/useStorageValue";
import { Header } from "./components/Header";
import { Matrix } from "./components/Matrix";
import { Footer } from "./components/Footer";

type State<T> = readonly [T, React.Dispatch<React.SetStateAction<T>>];
export const SimplexContext = createContext({}) as unknown as Context<{
  rows: State<number>;
  cols: State<number>;
  oldRows: State<number>;
  oldCols: State<number>;
  editing: State<boolean>;
  matrix: State<number[][]>;
  scratchMatrix: State<number[][]>;
  prevStates: State<Set<number[][]>>;
}>;

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
