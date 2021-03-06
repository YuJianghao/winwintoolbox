function getRects(startDom, startIndex, endDom, endIndex) {
  const range = document.createRange();
  range.setStart(startDom, startIndex);
  range.setEnd(endDom, endIndex);
  return Array.from(range.getClientRects());
}
window.onload = () => {
  const pre1 = document.getElementById("p1").firstChild;
  const pre2 = document.getElementById("p2");
  const span1 = document.getElementById("s1").firstChild;
  const span2 = document.getElementById("s2").firstChild;
  const ranges = document.getElementsByClassName("ranges")[0];
  function clean() {
    while (ranges.firstChild) ranges.removeChild(ranges.firstChild);
    pre2.innerText = "";
  }
  document.getElementById("btn2").addEventListener("click", clean);
  document.getElementById("btn1").addEventListener("click", () => {
    clean();
    const rects = getRects(pre1, 10, span2, 4);
    rects.forEach((rect, idx) => {
      const div = document.createElement("div");
      div.style.position = "absolute";
      div.style.top = rect.top + "px";
      div.style.left = rect.left + "px";
      div.style.width = rect.width + "px";
      div.style.height = rect.height + "px";
      div.style.backgroundColor = `hsla(${idx * 30}, 100%, 75%,0.5)`;
      div.style.zIndex = "-1";
      ranges.appendChild(div);
    });
    pre2.innerText = JSON.stringify(rects, null, " ");
    console.log(rects);
  });
};
