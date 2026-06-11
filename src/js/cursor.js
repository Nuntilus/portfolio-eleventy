const cursor = document.getElementById("cursor");
const cursorPositionKey = "cursor-position";

const getStoredCursorPosition = () => {
  try {
    const stored = window.sessionStorage.getItem(cursorPositionKey);

    if (!stored) {
      return null;
    }

    const [x, y] = stored.split(",").map(Number);

    return Number.isFinite(x) && Number.isFinite(y) ? { x, y } : null;
  } catch {
    return null;
  }
};

const storedPosition = getStoredCursorPosition();

let cursorX = storedPosition?.x ?? window.innerWidth / 2;
let cursorY = storedPosition?.y ?? window.innerHeight / 2;

const updateCursor = () => {
  cursor.style.left = `${cursorX}px`;
  cursor.style.top = `${cursorY}px`;
};

const saveCursorPosition = () => {
  try {
    window.sessionStorage.setItem(cursorPositionKey, `${cursorX},${cursorY}`);
  } catch {
    return;
  }
};

document.addEventListener("pointermove", (event) => {
  cursorX = event.clientX;
  cursorY = event.clientY;
  saveCursorPosition();
  updateCursor();
});

window.addEventListener("scroll", updateCursor, { passive: true });
window.addEventListener("resize", updateCursor);

updateCursor();
