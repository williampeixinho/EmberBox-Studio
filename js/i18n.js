/* ============================================
   Ember Box Studios — i18n engine
   Reads/writes data-i18n / data-i18n-attr text,
   remembers the chosen language in localStorage.
   ============================================ */

(function () {
  var STORAGE_KEY = "emberbox_lang";
  var DEFAULT_LANG = "en";
  var SUPPORTED = ["en", "pt", "es"];

  function getSavedLang() {
    var saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      saved = null;
    }
    return SUPPORTED.indexOf(saved) !== -1 ? saved : DEFAULT_LANG;
  }

  function translate(key, lang) {
    var all = window.EMBERBOX_I18N || {};
    var dict = all[lang] || {};
    if (Object.prototype.hasOwnProperty.call(dict, key)) {
      return dict[key];
    }
    var fallback = all[DEFAULT_LANG] || {};
    return Object.prototype.hasOwnProperty.call(fallback, key) ? fallback[key] : null;
  }

  function applyLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) {
      lang = DEFAULT_LANG;
    }

    document.documentElement.setAttribute("lang", lang);

    var textNodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < textNodes.length; i++) {
      var el = textNodes[i];
      var text = translate(el.getAttribute("data-i18n"), lang);
      // missing key: keep the English text already in the HTML
      if (text !== null) el.innerHTML = text;
    }

    var attrNodes = document.querySelectorAll("[data-i18n-attr]");
    for (var j = 0; j < attrNodes.length; j++) {
      var attrEl = attrNodes[j];
      var spec = attrEl.getAttribute("data-i18n-attr");
      var pairs = spec.split(",");
      for (var k = 0; k < pairs.length; k++) {
        var parts = pairs[k].split(":");
        var attrName = parts[0].trim();
        var attrKey = parts[1].trim();
        var value = translate(attrKey, lang);
        if (value !== null) attrEl.setAttribute(attrName, value);
      }
    }

    var langButtons = document.querySelectorAll(".lang-switch [data-lang]");
    for (var b = 0; b < langButtons.length; b++) {
      var btn = langButtons[b];
      if (btn.getAttribute("data-lang") === lang) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    }

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* localStorage unavailable — language just won't persist */
    }
  }

  window.emberboxSetLang = function (lang) {
    applyLang(lang);
  };

  document.addEventListener("DOMContentLoaded", function () {
    try {
      applyLang(getSavedLang());
    } catch (e) {
      console.error("i18n failed, showing the page in English:", e);
    }
    // always reveal the page, even if translating failed
    document.body.classList.add("lang-ready");

    var langButtons = document.querySelectorAll(".lang-switch [data-lang]");
    for (var b = 0; b < langButtons.length; b++) {
      langButtons[b].addEventListener("click", function (evt) {
        applyLang(evt.currentTarget.getAttribute("data-lang"));
      });
    }
  });
})();
