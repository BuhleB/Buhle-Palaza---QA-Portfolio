(function () {
  'use strict';
  PortfolioRender.renderTestCases('tcList', QA_LAB.testCases);
  PortfolioRender.renderCrossBrowser('compatBody', QA_LAB.crossBrowser);

  var tabs = Array.from(document.querySelectorAll('.lab-tab'));
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function activate(active) {
    tabs.forEach(function (tab) {
      if (tab === active) tab.setAttribute('aria-current', 'location');
      else tab.removeAttribute('aria-current');
    });
  }
  tabs.forEach(function (tab) {
    var selector = tab.dataset.target;
    var target = document.querySelector(selector);
    tab.setAttribute('aria-controls', selector.slice(1));
    tab.addEventListener('click', function () {
      if (!target) return;
      activate(tab);
      history.replaceState(null, '', selector);
      target.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' });
    });
  });
  var scheduled = false;
  function updateSection() {
    scheduled = false;
    var atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
    var active = tabs[0];
    if (atBottom) active = tabs[tabs.length - 1];
    else tabs.forEach(function (tab) {
      var target = document.querySelector(tab.dataset.target);
      if (target && target.getBoundingClientRect().top <= 260) active = tab;
    });
    activate(active);
  }
  window.addEventListener('scroll', function () {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateSection); }
  }, {passive:true});
  updateSection();

  // Static examples traced to the supplied admin.login route. No HTTP calls.
  var examples = {
    '200': {
      label: '200 OK',
      request: { username: 'admin_username', password: '[valid password — redacted]' },
      response: { success: true, message: 'Welcome back, admin_username.', username: 'admin_username' },
      note: 'Valid credentials: the route logs in the user, enables the configured four-hour session timeout and updates last_login.'
    },
    '400': {
      label: '400 Bad Request',
      request: { username: 'admin_username' },
      response: { success: false, error: 'Username and password are required.' },
      note: 'This example omits the password. A missing or empty JSON body also returns 400, with the separate message: Request must be JSON with username and password.'
    },
    '401': {
      label: '401 Unauthorized',
      request: { username: 'admin_username', password: '[incorrect example password]' },
      response: { success: false, error: 'Invalid username or password.' },
      note: 'Unknown usernames and incorrect passwords use the same error text. That message alone does not establish resistance to every form of username enumeration.'
    }
  };
  var statusTabs = Array.from(document.querySelectorAll('.api-status-tab'));
  function showStatus(status) {
    var item = examples[status];
    if (!item) return;
    statusTabs.forEach(function (tab) { tab.setAttribute('aria-pressed', String(tab.dataset.status === status)); });
    document.getElementById('apiRequest').textContent = JSON.stringify(item.request, null, 2);
    document.getElementById('apiStatus').textContent = item.label;
    document.getElementById('apiBody').textContent = JSON.stringify(item.response, null, 2);
    document.getElementById('apiStatusDetail').textContent = item.note;
    PortfolioCode.refresh('apiRequest');
    PortfolioCode.refresh('apiBody');
  }
  statusTabs.forEach(function (tab) { tab.addEventListener('click', function () { showStatus(tab.dataset.status); }); });
  showStatus('200');
})();
