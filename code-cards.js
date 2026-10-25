(function () {
  'use strict';
  function highlight(text, language) {
    var fragment = document.createDocumentFragment();
    var pattern = /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|#[^\n]*|\b(?:true|false|null|on|jobs|steps|uses|run|name|push|pull_request|branches|with)\b|\b\d+(?:\.\d+)?\b)/g;
    var cursor = 0, match;
    while ((match = pattern.exec(text))) {
      fragment.append(document.createTextNode(text.slice(cursor, match.index)));
      var span = document.createElement('span');
      var token = match[0];
      span.className = token[0] === '#' ? 'syntax-comment' : /^['"]/.test(token) ? (language === 'JSON' && /^\s*:/.test(text.slice(pattern.lastIndex)) ? 'syntax-key' : 'syntax-string') : /^\d/.test(token) ? 'syntax-number' : 'syntax-keyword';
      span.textContent = token;
      fragment.append(span); cursor = pattern.lastIndex;
    }
    fragment.append(document.createTextNode(text.slice(cursor)));
    return fragment;
  }
  function paint(code) {
    var text = code.textContent;
    code.replaceChildren();
    text.split('\n').forEach(function (line, i, lines) {
      var span = document.createElement('span');
      span.className = 'code-line'; span.append(highlight(line, code.dataset.language));
      code.append(span);
      if (i < lines.length - 1) code.append(document.createTextNode('\n'));
    });
  }
  function create(source, label, language, status) {
    var card = document.createElement('div'); card.className = 'code-card';
    var header = document.createElement('div'); header.className = 'code-card-header';
    var tab = document.createElement('span'); tab.className = 'code-card-title'; tab.textContent = label;
    header.append(tab); if (status) header.append(status);
    var pre = document.createElement('pre'); pre.className = 'code-card-editor'; pre.tabIndex = 0; pre.setAttribute('aria-label', label + ' source code');
    var code = document.createElement('code'); code.id = source.id; code.dataset.language = language; code.textContent = source.textContent.trim();
    pre.append(code);
    var footer = document.createElement('div'); footer.className = 'code-card-footer';
    var lang = document.createElement('span'); lang.textContent = language;
    var button = document.createElement('button'); button.type = 'button'; button.textContent = 'Copy to clipboard'; button.setAttribute('aria-label', 'Copy ' + label); button.setAttribute('aria-live','polite');
    button.addEventListener('click', async function () {
      try {
        if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(code.textContent);
        else {
          var input = document.createElement('textarea'); input.value = code.textContent;
          input.style.cssText = 'position:fixed;left:-9999px'; document.body.append(input); input.select();
          var copied = document.execCommand('copy'); input.remove(); button.focus();
          if (!copied) throw new Error('Copy unavailable');
        }
        button.textContent = 'Copied!';
      } catch (_) { button.textContent = 'Select code to copy'; }
      setTimeout(function () { button.textContent = 'Copy to clipboard'; }, 2400);
    });
    footer.append(lang, button); card.append(header, pre, footer); source.replaceWith(card); paint(code);
    return card;
  }
  var request = document.getElementById('apiRequest');
  if (request) create(request, 'request.json', 'JSON');
  var response = document.getElementById('apiBody');
  if (response) {
    var wrapper = document.getElementById('apiResponse');
    var status = document.getElementById('apiStatus');
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    var card = create(response, 'response.json', 'JSON', status);
    wrapper.replaceWith(card);
  }
  document.querySelectorAll('pre.code-sample').forEach(function (source) { create(source, 'pipeline.yml', 'YAML'); });
  window.PortfolioCode = {refresh: function (id) { var el = document.getElementById(id); if (el) paint(el); }};
})();
