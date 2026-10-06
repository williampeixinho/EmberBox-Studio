document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }

  var pitchForm = document.getElementById('pitch-form');
  if (pitchForm) {
    pitchForm.addEventListener('submit', function (event) {
      event.preventDefault();

      var data = new FormData(pitchForm);
      var gameName = (data.get('gameName') || '').trim();
      var about = (data.get('about') || '').trim();
      var genre = (data.get('genre') || '').trim();
      var gameplayLink = (data.get('gameplayLink') || '').trim();
      var buildLink = (data.get('buildLink') || '').trim();
      var extra = (data.get('extra') || '').trim();
      var models = data.getAll('model');

      var bodyLines = [
        'Game name: ' + gameName,
        'Genre: ' + genre,
        '',
        'About the game:',
        about,
        '',
        'Gameplay link: ' + (gameplayLink || '-'),
        'Playable build link: ' + (buildLink || '-'),
        '',
        'Preferred business model: ' + (models.length ? models.join(' / ') : 'Not specified'),
        '',
        'Additional links / comments:',
        (extra || '-')
      ];

      var subject = 'Game Pitch — ' + (gameName || 'Untitled');
      var body = bodyLines.join('\n');
      var mailto = 'mailto:contact@emberboxstudio.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);

      // Fallback for visitors without an email app (common on Windows) and for pitches too long
      // for a mailto link: show the full text ready to copy, so the pitch is never silently lost.
      var fallback = document.getElementById('pitch-fallback');
      if (fallback) {
        document.getElementById('pitch-fallback-text').value = 'Subject: ' + subject + '\n\n' + body;
        fallback.hidden = false;
      }

      // Some email clients cut or refuse very long mailto links; the copy box covers those.
      if (mailto.length <= 2000) {
        window.location.href = mailto;
      } else if (fallback) {
        fallback.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  var copyBtn = document.getElementById('pitch-copy');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var area = document.getElementById('pitch-fallback-text');
      var done = function () {
        var lang = document.documentElement.getAttribute('lang') || 'en';
        var dict = (window.EMBERBOX_I18N && window.EMBERBOX_I18N[lang]) || {};
        copyBtn.textContent = dict['publishing.form.copied'] || 'Copied!';
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(area.value).then(done, function () {
          area.select();
          document.execCommand('copy');
          done();
        });
      } else {
        area.select();
        document.execCommand('copy');
        done();
      }
    });
  }
});

/* Screenshot lightbox: click an image in a .screenshot-gallery to view it large */
document.addEventListener('DOMContentLoaded', function () {
  var shots = Array.prototype.slice.call(document.querySelectorAll('.screenshot-gallery img'));
  if (!shots.length) return;

  var box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.hidden = true;
  box.innerHTML =
    '<button type="button" class="lightbox-btn lightbox-close" aria-label="Close">&times;</button>' +
    '<button type="button" class="lightbox-btn lightbox-prev" aria-label="Previous">&#8249;</button>' +
    '<img class="lightbox-img" alt="">' +
    '<button type="button" class="lightbox-btn lightbox-next" aria-label="Next">&#8250;</button>';
  document.body.appendChild(box);

  var img = box.querySelector('.lightbox-img');
  var current = 0;

  function show(i) {
    current = (i + shots.length) % shots.length;
    img.src = shots[current].currentSrc || shots[current].src;
    img.alt = shots[current].alt;
  }
  function open(i) {
    show(i);
    box.hidden = false;
    document.body.classList.add('lightbox-open');
    box.querySelector('.lightbox-close').focus();
  }
  function close() {
    box.hidden = true;
    document.body.classList.remove('lightbox-open');
    img.removeAttribute('src');
    shots[current].focus();
  }

  shots.forEach(function (shot, i) {
    shot.tabIndex = 0;
    shot.setAttribute('role', 'button');
    shot.addEventListener('click', function () { open(i); });
    shot.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
    });
  });

  box.querySelector('.lightbox-close').addEventListener('click', close);
  box.querySelector('.lightbox-prev').addEventListener('click', function (e) { e.stopPropagation(); show(current - 1); });
  box.querySelector('.lightbox-next').addEventListener('click', function (e) { e.stopPropagation(); show(current + 1); });
  box.addEventListener('click', function (e) { if (e.target === box) close(); });
  img.addEventListener('click', close);

  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(current - 1);
    else if (e.key === 'ArrowRight') show(current + 1);
  });
});
