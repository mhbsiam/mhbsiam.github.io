/* Progressive enhancement only. The page is complete without JavaScript. */
(function () {
  'use strict';

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* Highlight the nav link for whichever section is in view. */
  var links = Array.prototype.slice.call(
    document.querySelectorAll('.top__links a[href^="#"]')
  );
  if (!links.length || !('IntersectionObserver' in window)) return;

  var byId = {};
  var sections = [];

  links.forEach(function (link) {
    var section = document.querySelector(link.getAttribute('href'));
    if (section) {
      byId[section.id] = link;
      sections.push(section);
    }
  });
  if (!sections.length) return;

  var visible = [];

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var at = visible.indexOf(entry.target);
      if (entry.isIntersecting && at === -1) visible.push(entry.target);
      if (!entry.isIntersecting && at !== -1) visible.splice(at, 1);
    });

    links.forEach(function (link) { link.removeAttribute('aria-current'); });
    if (!visible.length) return;

    var top = visible.slice().sort(function (a, b) {
      return a.getBoundingClientRect().top - b.getBoundingClientRect().top;
    })[0];
    if (byId[top.id]) byId[top.id].setAttribute('aria-current', 'true');
  }, { rootMargin: '-20% 0px -65% 0px' });

  sections.forEach(function (section) { observer.observe(section); });
})();
