const container = document.getElementById("container");
require.config({
  paths: {
    vs: "https://cdn.bootcdn.net/ajax/libs/monaco-editor/0.21.2/min/vs",
  },
});

require(["vs/editor/editor.main"], function () {
  let current = 'json'
  const languages = ['json', 'javascript', 'html']
  const buttonContainer = document.getElementById('buttons')
  const buttons = languages.reduce((o, id) => {
    const button = document.createElement('button')
    button.setAttribute('id', id)
    button.innerText = `Format ${id}`
    buttonContainer.appendChild(button)
    o[id] = button
    return o
  }, {})
  const editor = monaco.editor.create(container, {
    value: `{\n    "key": "value"\n}`,
    theme: "vs-dark",
    language: current
  });
  function bind(node, language) {
    node.addEventListener('click', () => {
      if (current !== language) {
        current = language
        monaco.editor.setModelLanguage(editor.getModel(), language);
      }
      editor.trigger('anyString', 'editor.action.formatDocument')
      console.log('Format', language)
    })
  }
  Object.entries(buttons).forEach(([language, node]) => bind(node, language))
  window.addEventListener("resize", () => {
    editor.layout();
  });
});
