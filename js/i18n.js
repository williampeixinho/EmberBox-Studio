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
    var dict = window.EMBERBOX_I18N[lang] || {};
    if (Object.prototype.hasOwnProperty.call(dict, key)) {
      return dict[key];
    }
    var fallback = window.EMBERBOX_I18N[DEFAULT_LANG] || {};
    return Object.prototype.hasOwnProperty.call(fallback, key) ? fallback[key] : key;
  }

  function applyLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) {
      lang = DEFAULT_LANG;
    }

    document.documentElement.setAttribute("lang", lang);

    var textNodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < textNodes.length; i++) {
      var el = textNodes[i];
      el.innerHTML = translate(el.getAttribute("data-i18n"), lang);
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
        attrEl.setAttribute(attrName, translate(attrKey, lang));
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
    applyLang(getSavedLang());
    document.body.classList.add("lang-ready");

    var langButtons = document.querySelectorAll(".lang-switch [data-lang]");
    for (var b = 0; b < langButtons.length; b++) {
      langButtons[b].addEventListener("click", function (evt) {
        applyLang(evt.currentTarget.getAttribute("data-lang"));
      });
    }
  });
})();
