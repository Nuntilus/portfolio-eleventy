const CACHE_KEY = "gh-repos";

async function fetchRepos() {
  const cached = sessionStorage.getItem(CACHE_KEY);
  if (cached) return JSON.parse(cached);

  const res = await fetch(
    "https://api.github.com/users/Nuntilus/repos?sort=updated&per_page=100",
  );
  if (!res.ok) return null;

  const repos = await res.json();
  const filtered = repos.filter((r) => !r.fork).slice(0, 6);
  sessionStorage.setItem(CACHE_KEY, JSON.stringify(filtered));
  return filtered;
}

function renderRepos(repos) {
  const list = document.getElementById("repo-list");
  if (!list) return;
  list.innerHTML = repos
    .map(
      (repo) => `
    <li class="repo-card hoverable">
      <a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a>
      ${repo.description ? `<p class="repo-desc">${repo.description}</p>` : ""}
      <div class="repo-meta">
        ${repo.language ? `<span class="repo-lang">${repo.language}</span>` : ""}
        <span class="repo-stars">★ ${repo.stargazers_count}</span>
      </div>
    </li>`,
    )
    .join("");
}

fetchRepos().then((repos) => {
  if (repos && repos.length) renderRepos(repos);
});
