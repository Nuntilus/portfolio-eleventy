const cursor = document.getElementById("cursor");
const cursorPositionKey = "cursor-position";
const followSpeed = 0.18;
const trailFollowSpeed = 0.22;
const trailCount = 5;
const snapDistance = 0.1;

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

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);

const storedPosition = getStoredCursorPosition();

let pointerX = storedPosition?.x ?? window.innerWidth / 2;
let pointerY = storedPosition?.y ?? window.innerHeight / 2;
let animationFrame = null;

const nodes = [{ element: cursor, x: pointerX, y: pointerY, speed: followSpeed }];

for (let index = 0; index < trailCount; index += 1) {
  const element = document.createElement("div");
  const ratio = (index + 1) / (trailCount + 1);

  element.className = "cursor-trail";
  element.style.setProperty("--cursor-scale", `${1 - ratio * 0.55}`);
  element.style.setProperty("--cursor-opacity", `${0.55 * (1 - ratio)}`);
  document.body.appendChild(element);

  nodes.push({ element, x: pointerX, y: pointerY, speed: trailFollowSpeed });
}

const renderNodes = () => {
  for (const node of nodes) {
    node.element.style.left = `${node.x}px`;
    node.element.style.top = `${node.y}px`;
  }
};

const saveCursorPosition = () => {
  try {
    window.sessionStorage.setItem(cursorPositionKey, `${nodes[0].x},${nodes[0].y}`);
  } catch {
    return;
  }
};

const step = () => {
  let settled = true;

  nodes.forEach((node, index) => {
    const targetX = index === 0 ? pointerX : nodes[index - 1].x;
    const targetY = index === 0 ? pointerY : nodes[index - 1].y;
    const deltaX = targetX - node.x;
    const deltaY = targetY - node.y;

    if (Math.abs(deltaX) < snapDistance && Math.abs(deltaY) < snapDistance) {
      node.x = targetX;
      node.y = targetY;
      return;
    }

    settled = false;
    node.x += deltaX * node.speed;
    node.y += deltaY * node.speed;
  });

  renderNodes();
  saveCursorPosition();

  animationFrame = settled ? null : window.requestAnimationFrame(step);
};

const snapToPointer = () => {
  for (const node of nodes) {
    node.x = pointerX;
    node.y = pointerY;
  }

  renderNodes();
  saveCursorPosition();
};

const startFollowing = () => {
  if (prefersReducedMotion.matches) {
    snapToPointer();
    return;
  }

  if (animationFrame === null) {
    animationFrame = window.requestAnimationFrame(step);
  }
};

document.addEventListener("pointermove", (event) => {
  pointerX = event.clientX;
  pointerY = event.clientY;
  startFollowing();
});

window.addEventListener("scroll", renderNodes, { passive: true });
window.addEventListener("resize", renderNodes);

renderNodes();
