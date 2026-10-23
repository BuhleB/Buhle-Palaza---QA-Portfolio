(function () {
  'use strict';
  document.querySelectorAll('a.cv[download]').forEach(function (button) {
    button.addEventListener('click', async function (event) {
      event.preventDefault();
      if (button.getAttribute('aria-busy') === 'true') return;
      var label = button.textContent;
      button.setAttribute('aria-busy', 'true');
      button.textContent = 'Downloading…';
      try {
        var response = await fetch(button.href, { cache: 'no-store' });
        if (!response.ok) throw new Error('PDF request failed');
        var data = await response.arrayBuffer();
        var blob = new Blob([data], { type: 'application/octet-stream' });
        var url = URL.createObjectURL(blob);
        var download = document.createElement('a');
        download.href = url;
        download.download = button.getAttribute('download');
        download.style.display = 'none';
        document.body.appendChild(download);
        download.click();
        download.remove();
        setTimeout(function () { URL.revokeObjectURL(url); }, 60000);
      } catch (error) {
        var notice = document.getElementById('cv-download-notice');
        if (!notice) {
          notice = document.createElement('p');
          notice.id = 'cv-download-notice';
          notice.setAttribute('role', 'alert');
          notice.style.cssText = 'position:fixed;bottom:20px;left:20px;right:20px;z-index:2000;padding:16px;background:var(--card);color:var(--text);border:1px solid var(--border);border-radius:8px';
          document.body.appendChild(notice);
        }
        notice.textContent = location.protocol === 'file:'
          ? 'To download your CV, open the site through a local web server or the published website.'
          : 'The CV download could not start. Please try again.';
      } finally {
        button.textContent = label;
        button.removeAttribute('aria-busy');
      }
    });
  });
})();
