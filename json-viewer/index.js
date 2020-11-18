const container = document.getElementById("container");
require.config({
  paths: {
    vs: "https://cdn.bootcdn.net/ajax/libs/monaco-editor/0.21.2/min/vs",
  },
});

require(["vs/editor/editor.main"], function () {
  const editor = monaco.editor.create(container, {
    value: `{\n    "key": "value"\n}`,
    theme: "vs-dark",
    language: "json",
  });
  window.addEventListener("resize", () => {
    editor.layout();
  });
});
