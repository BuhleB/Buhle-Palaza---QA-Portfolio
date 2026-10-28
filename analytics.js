/* Portfolio analytics: runs only on the published GitHub Pages site. */
(function () {
  'use strict';
  if (window.location.hostname !== 'buhleb.github.io' || window.self !== window.top) return;
  if (window.__portfolioAnalyticsLoaded) return;
  window.__portfolioAnalyticsLoaded = true;

  var measurementId = 'G-WEBQGJB0G2';
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });

  var tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
  document.head.appendChild(tag);

  document.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href') || '';
    if (link.hasAttribute('download') && /\.pdf(?:[?#]|$)/i.test(href)) {
      window.gtag('event', 'cv_download', { link_text: 'Download CV' });
    } else if (/^mailto:/i.test(href)) {
      window.gtag('event', 'contact_click', { contact_method: 'email' });
    } else if (/^https:\/\/(?:www\.)?linkedin\.com\//i.test(href)) {
      window.gtag('event', 'profile_click', { profile: 'linkedin' });
    } else if (/^https:\/\/(?:www\.)?github\.com\//i.test(href)) {
      window.gtag('event', 'profile_click', { profile: 'github' });
    }
  });
}());
