document.addEventListener('DOMContentLoaded', function () {
  const countrySelect = document.getElementById('countrySelect');
  const deviceSelect = document.getElementById('deviceSelect');
  const toggleTheme = document.getElementById('toggleTheme');
  const langSelect = document.getElementById('langSelect');
  const grid = document.getElementById('bookmakerGrid');

  const data = [
    { name: '365Plays', country: 'UK', device: 'android', logo: 'logos/365Plays.png' },
    { name: 'SkyStats', country: 'UK', device: 'android', logo: 'logos/SkyStats.png' },
    { name: 'CoralView', country: 'UK', device: 'android', logo: 'logos/CoralView.png' },
    { name: 'WillHillScores', country: 'UK', device: 'android', logo: 'logos/WillHillScores.png' },
    { name: 'BetanoFlash', country: 'Romania', device: 'android', logo: 'logos/BetanoFlash.png' },
    { name: '1xPlay', country: 'Germany', device: 'android', logo: 'logos/1xPlay.png' }
  ];

  function render() {
    if (!grid) return;
    grid.innerHTML = '';

    data.forEach((item, index) => {
      if (
        (countrySelect.value === 'all' || item.country === countrySelect.value) &&
        (deviceSelect.value === 'all' || item.device === deviceSelect.value)
      ) {
        const fakeApk = `downloads/${item.name}.apk`;
        const fakeIpa = `downloads/${item.name}.ipa`;

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <div class="badge">${item.country}</div>
      <div class="logo-wrapper">
  <img class="logo" src="${item.logo}" alt="${item.name} logo" />
</div>
          <h2>${item.name}</h2>
          <div class="platform">
            <a class="btn android" href="${fakeApk}" onclick="return false;">Android</a>
            <a class="btn ios" href="${fakeIpa}" onclick="return false;">iOS</a>
            <span class="copy-link" onclick="navigator.clipboard.writeText('${fakeApk}')">📋 Copy Link</span>
          </div>
        `;
        grid.appendChild(card);
      }
    });
  }

  window.render = render;
  render();

  if (countrySelect) countrySelect.addEventListener('change', render);
  if (deviceSelect) deviceSelect.addEventListener('change', render);
  if (toggleTheme) {
    toggleTheme.addEventListener('change', () => {
      document.documentElement.setAttribute('data-theme', toggleTheme.checked ? 'dark' : 'light');
    });
  }
  if (langSelect) {
    langSelect.addEventListener('change', () => {
      const lang = langSelect.value;
      const h1 = document.querySelector('.hero h1');
      const p = document.querySelector('.hero p');
      if (h1 && p) {
        h1.textContent =
          lang === 'ro' ? 'Descărcări Rapide pentru Case de Pariuri' :
          lang === 'de' ? 'Schnelle & sichere Buchmacher-Downloads' :
          'Fast & Secure Bookmaker Downloads';

        p.textContent =
          lang === 'ro' ? 'Selectați țara și dispozitivul, apoi instalați aplicația instant.' :
          lang === 'de' ? 'Land und Gerät wählen, App sofort installieren.' :
          'Select your country & device, then instantly install the app. QR code and copy link supported.';
      }
    });
  }
});
