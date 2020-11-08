//#region drag handlers
function dragstartHandler(e, item) {
  console.log("dragstart", item.index, e);
  e.dataTransfer.setData("text/plain", e.target.innerHTML); // 传输数据
  e.dataTransfer.effectAllowed = "copy"; // 改变视觉效果
}
function dragendHandler(e, item) {
  console.log("dragend", item.index, e);
}
function dragenterHandler(e, item) {
  console.log("dragenter", item.index, e);
}
function dragexitHandler(e, item) {
  console.log("dragexit", item.index, e);
}
function dragoverHandler(e, item) {
  e.preventDefault();
  console.log("dragover", item.index, e);
}
function dropHandler(e, item) {
  const data = e.dataTransfer.getData("text/plain"); // 获取数据
  e.target.textContent = data; // 执行放置
  e.preventDefault();
  console.log("drop", item.index, e);
}
//#endregion
//#region build
const list = document.querySelector("#list");
list.classList.add("list");
function addItem(item) {
  const div = document.createElement("div");
  div.innerText = item.text;
  div.draggable = true;
  div.classList.add("list-item");
  div.addEventListener("dragstart", (e) => dragstartHandler(e, item));
  div.addEventListener("dragend", (e) => dragendHandler(e, item));
  div.addEventListener("dragenter", (e) => dragenterHandler(e, item));
  div.addEventListener("dragexit", (e) => dragexitHandler(e, item));
  div.addEventListener("dragover", (e) => dragoverHandler(e, item));
  div.addEventListener("drop", (e) => dropHandler(e, item));
  list.appendChild(div);
}
const messages = [
  "HTML Drag and Drop",
  "interfaces enable",
  "applications to use",
  "drag-and-drop",
  "features in browsers",
];
const items = messages.map((message, index) => {
  return { text: message, index };
});
items.map(addItem);
//#endregion
