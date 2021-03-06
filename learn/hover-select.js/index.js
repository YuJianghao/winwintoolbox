const ghost = document.createElement("div");
const info = document.createElement("div");
info.innerText = "info";
info.style.position = "absolute";
info.style.top = "100%";
info.style.backgroundColor = "#649adf";
info.style.padding = "0 10px";
info.style.lineHeight = "1.5";
info.style.color = "white";
info.style.whiteSpace = "nowrap";
info.style.fontSize = "small";
ghost.appendChild(info);
ghost.style.position = "fixed";
ghost.style.transition = "all ease-in-out .1s";
ghost.style.backgroundColor = "#649adf55";
ghost.style.pointerEvents = "none";
ghost.style.zIndex = 9999999;
document.addEventListener("scroll", () => {
  if (document.body.contains(ghost)) document.body.removeChild(ghost);
});
document.addEventListener("mousemove", (e) => {
  const eles = document.elementsFromPoint(e.clientX, e.clientY);
  let ele,
    i = 0;
  while (i < eles.length) {
    ele = eles[i];
    if (ele !== ghost) break;
    i++;
  }
  if (ele === document.getElementsByTagName("html")[0]) {
    if (document.body.contains(ghost)) document.body.removeChild(ghost);
  } else {
    if (!document.body.contains(ghost)) document.body.appendChild(ghost);
    const rect = ele.getClientRects()[0];
    ghost.style.top = rect.top + "px";
    ghost.style.left = rect.left + "px";
    ghost.style.width = rect.width + "px";
    ghost.style.height = rect.height + "px";
    info.innerText = `x=${rect.x}, y=${rect.y}, ${rect.width}*${rect.height}`;
  }
});
