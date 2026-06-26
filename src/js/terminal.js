const COMMANDS = {
  help: () => [
    "available commands:",
    "  help          — show this message",
    "  whoami        — about nuntilus",
    "  ls projects   — list projects",
    "  ls skills     — list skills",
    "  ls hobbies    — list hobbies",
    "  cat setup     — show system setup",
    "  clear         — clear terminal",
    "  exit          — close terminal",
  ],

  whoami: () => [
    "nuntilus",
    "age:             16",
    "role:            software developer apprentice (year 2)",
    "languages:       DE, EN",
    "location:        switzerland",
    "contact:         nuntilus@clavitus.ch",
    "pgp:             nuntilus.ch/nuntilus.asc",
  ],

  "ls projects": () => [
    "drwxr-xr-x  gallileo-starters    2025-08 → 2026-01   Angular / Java / Spring Boot",
    "drwxr-xr-x  appsteam-backend     2026-02 → 2026-07   TypeScript / NestJS / React",
    "drwxr-xr-x  mini-net             2026-08 → 2027-01   coming soon...",
  ],

  "ls skills": () => [
    "Linux  NestJS  Angular  TypeScript  Java",
  ],

  "ls hobbies": () => [
    "Linux  Coding  Homelab  Mountainbiking",
  ],

  "cat setup": () => [
    "OS:        Arch Linux",
    "WM:        Hyprland",
    "Terminal:  Alacritty",
    "Shell:     zsh",
    "Editor:    Neovim",
    "Hardware:  ThinkPad P14s",
  ],

  clear: () => null,

  exit: () => "__exit__",
};

const BANNER = [
  "nuntilus@portfolio ~ % _",
  "----------------------------------",
  'type "help" to see available commands',
];

let terminalOpen = false;

function buildTerminal() {
  const overlay = document.createElement("div");
  overlay.id = "terminal-overlay";

  const win = document.createElement("div");
  win.id = "terminal-window";

  const titleBar = document.createElement("div");
  titleBar.id = "terminal-titlebar";
  titleBar.innerHTML =
    '<span class="terminal-dot terminal-dot-close" id="terminal-close-btn"></span>' +
    '<span class="terminal-dot terminal-dot-min"></span>' +
    '<span class="terminal-dot terminal-dot-max"></span>' +
    '<span id="terminal-title">nuntilus@portfolio: ~</span>';

  const output = document.createElement("div");
  output.id = "terminal-output";

  const inputRow = document.createElement("div");
  inputRow.id = "terminal-input-row";
  inputRow.innerHTML =
    '<span class="terminal-prompt">nuntilus@portfolio ~ % </span>' +
    '<input id="terminal-input" type="text" autocomplete="off" spellcheck="false" aria-label="terminal input">';

  win.appendChild(titleBar);
  win.appendChild(output);
  win.appendChild(inputRow);
  overlay.appendChild(win);
  document.body.appendChild(overlay);

  const input = document.getElementById("terminal-input");
  const closeBtn = document.getElementById("terminal-close-btn");

  printLines(BANNER);

  input.addEventListener("keydown", handleInput);
  closeBtn.addEventListener("click", closeTerminal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeTerminal();
  });
}

function printLines(lines, isCommand = false) {
  const output = document.getElementById("terminal-output");
  lines.forEach((line) => {
    const p = document.createElement("p");
    p.textContent = line;
    if (isCommand) p.classList.add("terminal-cmd-echo");
    output.appendChild(p);
  });
  output.scrollTop = output.scrollHeight;
}

function handleInput(e) {
  if (e.key !== "Enter") return;
  const input = document.getElementById("terminal-input");
  const raw = input.value.trim();
  input.value = "";

  if (!raw) return;

  printLines([`nuntilus@portfolio ~ % ${raw}`], true);

  const cmd = COMMANDS[raw.toLowerCase()];
  if (!cmd) {
    printLines([`command not found: ${raw}`, 'type "help" for available commands']);
    return;
  }

  const result = cmd();
  if (result === "__exit__") {
    closeTerminal();
    return;
  }
  if (result === null) {
    document.getElementById("terminal-output").innerHTML = "";
    return;
  }
  printLines(result);
}

function openTerminal() {
  if (terminalOpen) return;
  terminalOpen = true;
  const overlay = document.getElementById("terminal-overlay");
  overlay.classList.add("terminal-visible");
  setTimeout(() => document.getElementById("terminal-input").focus(), 50);
}

function closeTerminal() {
  terminalOpen = false;
  const overlay = document.getElementById("terminal-overlay");
  overlay.classList.remove("terminal-visible");
  document.getElementById("terminal-input").blur();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "t" && e.target.tagName !== "INPUT") {
    e.preventDefault();
    terminalOpen ? closeTerminal() : openTerminal();
  }
  if (e.key === "Escape" && terminalOpen) closeTerminal();
});

buildTerminal();
