document.getElementById("crt").addEventListener("change", (e) => {
  if (e.target.checked) {
    document.getElementsByTagName("pre")[0].classList.add("crt");
  } else {
    document.getElementsByTagName("pre")[0].classList.remove("crt");
  }
});
