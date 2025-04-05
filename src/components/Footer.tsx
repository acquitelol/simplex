export function Footer() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "1em",
        left: "1em",
        display: "block",
      }}
    >
      Copyright © {new Date().getFullYear()}{" "}
      <a href="https://github.com/acquitelol/">Rosie</a> •{" "}
      <a href="https://github.com/acquitelol/simplex">GitHub</a>
    </div>
  );
}
