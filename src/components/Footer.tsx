import { styles } from "../lib/styles";

export function Footer() {
  return (
    <div style={styles.footer}>
      Copyright © {new Date().getFullYear()}{" "}
      <a
        href="https://github.com/acquitelol/"
        title="You found an easter egg! :3"
      >
        Rosie
      </a>{" "}
      • <a href="https://github.com/acquitelol/simplex">GitHub</a>
    </div>
  );
}
