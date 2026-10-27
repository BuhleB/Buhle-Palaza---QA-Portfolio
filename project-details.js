// Open supporting detail when a direct evidence link targets content inside it.
(function () {
  function revealAnchor() {
    if (!location.hash) return;
    var id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch (_) { return; }
    var target = document.getElementById(id);
    if (!target) return;
    var node = target;
    while (node) {
      if (node.tagName === 'DETAILS') node.open = true;
      node = node.parentElement;
    }
    requestAnimationFrame(function () { target.scrollIntoView({ block: 'start' }); });
  }
  window.addEventListener('hashchange', revealAnchor);
  // Also handle selecting a link to the same hash after its details were closed.
  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[href^="#"]');
    if (link && link.getAttribute('href') === location.hash) revealAnchor();
  });
  revealAnchor();
})();
