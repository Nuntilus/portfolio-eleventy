function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
async function main() {
  await sleep(1000);
  console.log("Welcome to the world of programming!");
  window.location.replace("/");
}

main();
