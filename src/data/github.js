module.exports = async function () {
  try {
    const res = await fetch(
      "https://api.github.com/users/Nuntilus/repos?sort=updated&per_page=100"
    );
    if (!res.ok) return [];
    const repos = await res.json();
    return repos.filter((r) => !r.fork).slice(0, 6);
  } catch {
    return [];
  }
};
