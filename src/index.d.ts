type State<T> = readonly [T, React.Dispatch<React.SetStateAction<T>>];

type SimplexContextType = {
  rows: State<number>;
  cols: State<number>;
  oldRows: State<number>;
  oldCols: State<number>;
  editing: State<boolean>;
  matrix: State<number[][]>;
  scratchMatrix: State<number[][]>;
  prevStates: State<Set<number[][]>>;
};
