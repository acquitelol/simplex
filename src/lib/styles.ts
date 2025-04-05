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
    overflow: "auto",
    whiteSpace: "nowrap",
    width: "fit-content",
  },

  button: {
    marginRight: "0.4em",
  },

  label: {
    width: "5em",
  },

  field: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "0.4em",
  },

  headerButtons: {
    display: "inline-block",
  },
});
