module.exports = async function () {
  try {
    const res = await fetch("https://ghchart.rshah.org/ff69b4/Nuntilus");
    if (!res.ok) return "";
    let svg = await res.text();

    const w = svg.match(/width="(\d+)"/)?.[1];
    const h = svg.match(/height="(\d+)"/)?.[1];

    if (w && h) {
      svg = svg.replace(
        /(<svg[^>]*?)width="\d+"([^>]*?)height="\d+"/,
        `$1width="100%"$2height="100%" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet"`
      );
    }

    return svg;
  } catch {
    return "";
  }
};
