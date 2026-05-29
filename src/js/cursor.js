const cursor = document.getElementById("cursor");
const width = cursor.offsetWidth;
const height = cursor.offsetHeight;

document.addEventListener("mousemove", (e) => {
  cursor.setAttribute("style", `top: ${e.pageY - height/2}px; left: ${e.pageX - width/2}px;`);
});


