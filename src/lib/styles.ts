import { createStyleSheet } from "./stylesheet";

export const { merge, styles } = createStyleSheet({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

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
    maxWidth: "80%",
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

  headerFields: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "2em",
  },

  buttons: {
    display: "inline-block",
    marginBottom: "2em",
  },

  footer: {
    position: "fixed",
    bottom: "1em",
    left: "1em",
    display: "block",
  },
});
