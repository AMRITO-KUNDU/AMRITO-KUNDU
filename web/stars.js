/* Live GitHub star counts.
   Reads data-repo from any .gh-stars element and replaces the baked-in
   fallback with the current count. If the API is rate-limited, offline,
   or blocked, the fallback number simply stays on screen. */

(function () {
  var els = document.querySelectorAll(".gh-stars");
  if (!els.length) return;

  els.forEach(function (el) {
    var repo = el.getAttribute("data-repo");
    var countEl = el.querySelector(".gh-stars__count");
    if (!repo || !countEl) return;

    fetch("https://api.github.com/repos/" + repo, {
      headers: { Accept: "application/vnd.github+json" },
      cache: "no-store"
    })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(function (data) {
        if (typeof data.stargazers_count === "number") {
          countEl.textContent = data.stargazers_count;
          el.classList.add("is-live");
        }
      })
      .catch(function () {
        /* keep the fallback already in the HTML */
      });
  });
})();
