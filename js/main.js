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
      var mailto = 'mailto:contact@emberboxstudio.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(bodyLines.join('\n'));

      window.location.href = mailto;
    });
  }
});
