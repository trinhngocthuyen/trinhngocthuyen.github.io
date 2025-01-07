window.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const element = document.querySelector(`nav[id="toc"] a[toc_id="${id}"]`);
      if (element) {
        if (entry.intersectionRatio > 0) {
          element.parentElement.classList.add('active');
        } else {
          element.parentElement.classList.remove('active');
        }
      }
    });
  });

  // Track all headings that have an `id` applied
  document.querySelectorAll('article :is(h1, h2, h3, h4, h5, h6)[id]').forEach((section) => {
    observer.observe(section);
  });
});
