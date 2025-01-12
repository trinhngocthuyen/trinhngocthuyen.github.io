(function () {
  function toggle(e) {
    if (e) {
      e.dataset.expanded = (e.dataset.expanded != 'true');
    }
  }

  document.getElementById('menu-toggle').addEventListener('mousedown', function () {
    toggle(document.getElementById('menu-toggle'));
    toggle(document.querySelector('nav[role="navigation"] .menu-items'));
  });
})();
