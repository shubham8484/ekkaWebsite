(function () {
  'use strict';

  var SHEETS_URL = (window.EKKA_SHEETS_URL || '').trim().replace(/\/$/, '');

  var configWarning = document.getElementById('configWarning');
  var tabButtons = document.querySelectorAll('.contact-tabs__btn');
  var panels = document.querySelectorAll('.contact-panel');
  var brandForm = document.getElementById('brandForm');
  var creatorForm = document.getElementById('creatorForm');

  var FRAME_ID = 'ekka-hidden-frame';

  function setActiveTab(tab) {
    tabButtons.forEach(function (btn) {
      var isActive = btn.getAttribute('data-tab') === tab;
      btn.classList.toggle('contact-tabs__btn--active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    panels.forEach(function (panel) {
      var active = panel.id === 'panel-' + tab;
      panel.classList.toggle('contact-panel--active', active);
      if (active) {
        panel.removeAttribute('hidden');
      } else {
        panel.setAttribute('hidden', '');
      }
    });
  }

  var params = new URLSearchParams(window.location.search);
  setActiveTab(params.get('tab') === 'creator' ? 'creator' : 'brand');

  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setActiveTab(btn.getAttribute('data-tab'));
    });
  });

  function hideWarning() {
    if (configWarning) configWarning.classList.remove('form-config-warning--visible');
  }

  function showDeployHelp(customMessage) {
    if (!configWarning) return;
    var testLink = SHEETS_URL ? SHEETS_URL + '?callback=ekkaConnectionTest' : '';
    configWarning.innerHTML =
      '<strong>Could not save to Google Sheets.</strong> ' +
      (customMessage || '') +
      '<ul style="margin:12px 0 0 18px;line-height:1.7;text-align:left">' +
      '<li>Confirm <code>config.js</code> is deployed on Netlify with your <code>/exec</code> URL</li>' +
      '<li>Apps Script: Deploy → Web app → Who has access: <strong>Anyone</strong> → New version</li>' +
      '<li>Update <code>Code.gs</code> (mobile column) and redeploy the script</li>' +
      '</ul>' +
      (testLink
        ? '<p style="margin-top:12px"><a href="' +
          testLink +
          '" target="_blank" rel="noopener">Test in new tab</a> — should show JSON like <code>{"ok":true}</code>, not Sign in.</p>'
        : '');
    configWarning.classList.add('form-config-warning--visible');
  }

  if (!SHEETS_URL) {
    showDeployHelp('Missing Web App URL. Add it to config.js and redeploy Netlify.');
  } else {
    hideWarning();
  }

  function showMessage(form, type, text) {
    var el = form.querySelector('.form-message');
    if (!el) return;
    el.textContent = text;
    el.className = 'form-message form-message--visible form-message--' + type;
  }

  function clearMessage(form) {
    var el = form.querySelector('.form-message');
    if (!el) return;
    el.className = 'form-message';
    el.textContent = '';
  }

  function getHiddenFrame() {
    var frame = document.getElementById(FRAME_ID);
    if (!frame) {
      frame = document.createElement('iframe');
      frame.id = FRAME_ID;
      frame.name = FRAME_ID;
      frame.title = 'Form submission';
      frame.setAttribute('aria-hidden', 'true');
      frame.style.cssText = 'position:absolute;width:0;height:0;border:0;visibility:hidden';
      frame.src = 'about:blank';
      document.body.appendChild(frame);
    }
    return frame;
  }

  /** Primary method — works on Netlify, file://, and localhost */
  function submitViaIframe(payload) {
    return new Promise(function (resolve, reject) {
      var frame = getHiddenFrame();
      var form = document.createElement('form');
      var armed = false;
      var timeoutId;

      form.method = 'GET';
      form.action = SHEETS_URL;
      form.target = FRAME_ID;
      form.style.display = 'none';

      Object.keys(payload).forEach(function (key) {
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = payload[key] == null ? '' : String(payload[key]);
        form.appendChild(input);
      });

      function cleanup() {
        clearTimeout(timeoutId);
        frame.removeEventListener('load', onFrameLoad);
        if (form.parentNode) form.parentNode.removeChild(form);
      }

      function onFrameLoad() {
        if (!armed) return;
        armed = false;
        cleanup();
        resolve({ success: true, message: 'Saved' });
      }

      timeoutId = setTimeout(function () {
        if (!armed) return;
        armed = false;
        cleanup();
        reject(new Error('Submission timed out. Check config.js URL and Apps Script deploy (Anyone).'));
      }, 30000);

      frame.addEventListener('load', onFrameLoad);
      document.body.appendChild(form);
      armed = true;
      form.submit();
    });
  }

  function submitViaJsonp(payload) {
    return new Promise(function (resolve, reject) {
      var callbackName = 'ekkaCb_' + Date.now();
      var script;
      var timeoutId = setTimeout(function () {
        cleanup();
        reject(new Error('JSONP timeout'));
      }, 15000);

      function cleanup() {
        clearTimeout(timeoutId);
        try {
          delete window[callbackName];
        } catch (e) {
          window[callbackName] = undefined;
        }
        if (script && script.parentNode) script.parentNode.removeChild(script);
      }

      window[callbackName] = function (result) {
        cleanup();
        if (result && result.success) resolve(result);
        else reject(new Error((result && result.error) || 'Submission failed.'));
      };

      var q = new URLSearchParams();
      Object.keys(payload).forEach(function (key) {
        q.append(key, String(payload[key]));
      });
      q.append('callback', callbackName);

      script = document.createElement('script');
      script.src = SHEETS_URL + '?' + q.toString();
      script.onerror = function () {
        cleanup();
        reject(new Error('JSONP blocked'));
      };
      document.head.appendChild(script);
    });
  }

  function submitToSheet(payload) {
    if (!SHEETS_URL) {
      return Promise.reject(new Error('Google Sheets URL missing in config.js.'));
    }

    return submitViaIframe(payload).catch(function () {
      return submitViaJsonp(payload);
    });
  }

  function setLoading(form, loading) {
    var btn = form.querySelector('button[type="submit"]');
    if (!btn) return;
    btn.disabled = loading;
    btn.dataset.originalText = btn.dataset.originalText || btn.textContent;
    btn.textContent = loading ? 'Sending…' : btn.dataset.originalText;
  }

  function digitsOnly(value) {
    return String(value).replace(/\D/g, '');
  }

  function validateTenDigitPhone(value, label) {
    var digits = digitsOnly(value);
    if (digits.length !== 10) {
      throw new Error(label + ' must be exactly 10 digits (numbers only).');
    }
    return digits;
  }

  function attachPhoneInput(inputId) {
    var input = document.getElementById(inputId);
    if (!input) return;
    input.addEventListener('input', function () {
      var digits = digitsOnly(input.value).slice(0, 10);
      if (input.value !== digits) input.value = digits;
    });
    input.addEventListener('keypress', function (e) {
      if (e.key && e.key.length === 1 && !/\d/.test(e.key)) {
        e.preventDefault();
      }
    });
    input.addEventListener('paste', function (e) {
      e.preventDefault();
      var text = (e.clipboardData || window.clipboardData).getData('text');
      input.value = digitsOnly(text).slice(0, 10);
    });
  }

  attachPhoneInput('brand-phone');
  attachPhoneInput('creator-mobile');

  function formValue(form, name) {
    var el = form.elements.namedItem(name);
    if (el && 'value' in el) return String(el.value).trim();
    var byId = document.getElementById(form.id + '-' + name) || document.getElementById(name);
    return byId && byId.value ? String(byId.value).trim() : '';
  }

  function bindForm(form, getPayload, successText) {
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearMessage(form);
      setLoading(form, true);

      var payload;
      try {
        payload = getPayload();
      } catch (err) {
        setLoading(form, false);
        showMessage(form, 'error', err.message);
        return;
      }

      submitToSheet(payload)
        .then(function () {
          hideWarning();
          showMessage(form, 'success', successText);
          form.reset();
        })
        .catch(function (err) {
          showMessage(form, 'error', err.message);
          showDeployHelp();
        })
        .finally(function () {
          setLoading(form, false);
        });
    });
  }

  bindForm(brandForm, function () {
    return {
      type: 'brand',
      name: formValue(brandForm, 'name'),
      email: formValue(brandForm, 'email'),
      phone: validateTenDigitPhone(formValue(brandForm, 'phone'), 'Phone number'),
      brandName: formValue(brandForm, 'brandName')
    };
  }, 'Thank you! We received your inquiry and will be in touch soon.');

  bindForm(creatorForm, function () {
    var mobileRaw =
      formValue(creatorForm, 'mobile') ||
      (document.getElementById('creator-mobile') && document.getElementById('creator-mobile').value) ||
      '';
    var mobile = validateTenDigitPhone(mobileRaw, 'Mobile number');

    return {
      type: 'creator',
      username: formValue(creatorForm, 'username'),
      fullName: formValue(creatorForm, 'fullName'),
      mobile: mobile,
      followers: formValue(creatorForm, 'followers'),
      country: formValue(creatorForm, 'country'),
      city: formValue(creatorForm, 'city'),
      category: formValue(creatorForm, 'category')
    };
  }, 'Thank you! Your creator profile was saved. We will review and reach out.');
})();
