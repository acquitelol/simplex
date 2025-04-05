import { createStyleSheet } from "./stylesheet";

export const { merge, styles } = createStyleSheet({
  cell: {
    width: "4em",
    display: "inline-block",
    textAlign: "center",
    padding: 0,
    margin: "0.1em",
    border: "1px solid #ccc",
    fontSize: "1em",
    boxSizing: "border-box",
  },

  matrix: {
    overflow: "scroll",
    whiteSpace: "nowrap",
  },

  button: {
    marginRight: "0.2em",
  },

  headerButtons: {
    display: "inline-block",
  },
});
