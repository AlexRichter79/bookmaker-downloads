document.addEventListener('DOMContentLoaded', function () {
  const countrySelect = document.getElementById('countrySelect');
  const deviceSelect = document.getElementById('deviceSelect');
  const toggleTheme = document.getElementById('toggleTheme');
  const langSelect = document.getElementById('langSelect');
  const grid = document.getElementById('bookmakerGrid');

  const data = [
    { name: '365Plays', country: 'UK', device: 'android', logo: 'logos/365Plays.png', apk: 'downloads/365Plays.apk' },
    { name: 'SkyStats', country: 'UK', device: 'android', logo: 'logos/SkyStats.png', apk: 'downloads/SkyStats.apk' },
    { name: 'CoralView', country: 'UK', device: 'android', logo: 'logos/CoralView.png', apk: 'downloads/CoralView.apk' },
    { name: 'WillHillScores', country: 'UK', device: 'android', logo: 'logos/WillHillScores.png', apk: 'downloads/WillHillScores.apk' },
    { name: 'BetanoFlash', country: 'Romania', device: 'android', logo: 'logos/BetanoFlash.png', apk: 'downloads/BetanoFlash.apk' },
    { name: '1xPlay', country: 'Germany', device: 'android', logo: 'logos/1xPlay.png', apk: 'downloads/1xPlay.apk' }
  ];

  function render() {
    if (!grid) return;
    grid.innerHTML = '';

    data.forEach(function (item, index) {
      if (
        (countrySelect.value === 'all' || item.country === countrySelect.value) &&
        (deviceSelect.value === 'all' || item.device === deviceSelect.value)
      ) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <div class="badge">${item.country}</div>
          <img class="logo" src="${item.logo}" alt="${item.name} logo" />
          <h2>${item.name}</h2>
          <div class="platform">
            <a class="btn android" href="${item.apk}" download onclick="toggleQR('qr-${index}')">Android</a>
            <div class="qr" id="qr-${index}">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(item.apk)}" alt="QR code" />
            </div>
            <span class="copy-link" onclick="navigator.clipboard.writeText('${item.apk}')">📋 Copy Link</span>
          </div>
        `;
        grid.appendChild(card);
      }
    });
  }

  window.toggleQR = function (id) {
    const qr = document.getElementById(id);
    if (qr) qr.classList.toggle('show');
  };

  window.render = render;

  render(); // Initial render

  // Event Listeners
  if (countrySelect) countrySelect.addEventListener('change', render);
  if (deviceSelect) deviceSelect.addEventListener('change', render);
  if (toggleTheme) {
    toggleTheme.addEventListener('change', function () {
      document.documentElement.setAttribute('data-theme', toggleTheme.checked ? 'dark' : 'light');
    });
  }
  if (langSelect) {
    langSelect.addEventListener('change', function () {
      const lang = langSelect.value;
      const header = document.querySelector('.hero h1');
      const subtext = document.querySelector('.hero p');

      if (header && subtext) {
        header.textContent =
          lang === 'ro' ? 'Descărcări Rapide pentru Case de Pariuri' :
          lang === 'de' ? 'Schnelle & sichere Buchmacher-Downloads' :
          'Fast & Secure Bookmaker Downloads';

        subtext.textContent =
          lang === 'ro' ? 'Selectați țara și dispozitivul, apoi instalați aplicația instant.' :
          lang === 'de' ? 'Land und Gerät wählen, App sofort installieren.' :
          'Select your country & device, then instantly install the app. QR code and copy link supported.';
      }
    });
  }
});
