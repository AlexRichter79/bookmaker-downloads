// scripts.js

document.addEventListener('DOMContentLoaded', () => {
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
    const cVal = countrySelect.value;
    const dVal = deviceSelect.value;
    grid.innerHTML = '';

    data.forEach((item, index) => {
      if ((cVal === 'all' || item.country === cVal) && (dVal === 'all' || item.device === dVal)) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = \`
          <div class="badge">\${item.country}</div>
          <img class="logo" src="\${item.logo}" alt="\${item.name} logo" />
          <h2>\${item.name}</h2>
          <div class="platform">
            <a class="btn android" href="\${item.apk}" download onclick="toggleQR('qr-\${index}')">Android</a>
            <div class="qr" id="qr-\${index}">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=\${encodeURIComponent(item.apk)}" alt="QR code" />
            </div>
            <span class="copy-link" onclick="navigator.clipboard.writeText('\${item.apk}')">📋 Copy Link</span>
          </div>
        \`;
        grid.appendChild(card);
      }
    });
  }

  window.toggleQR = function(id) {
    const qr = document.getElementById(id);
    if (qr) {
      qr.classList.toggle('show');
    }
  };

  toggleTheme.addEventListener('change', () => {
    document.documentElement.setAttribute('data-theme', toggleTheme.checked ? 'dark' : 'light');
  });

  langSelect.addEventListener('change', () => {
    const lang = langSelect.value;
    document.querySelector('.hero h1').textContent =
      lang === 'ro' ? 'Descărcări Rapide pentru Case de Pariuri' :
      lang === 'de' ? 'Schnelle & sichere Buchmacher-Downloads' :
      'Fast & Secure Bookmaker Downloads';

    document.querySelector('.hero p').textContent =
      lang === 'ro' ? 'Selectați țara și dispozitivul, apoi instalați aplicația instant.' :
      lang === 'de' ? 'Land und Gerät wählen, App sofort installieren.' :
      'Select your country & device, then instantly install the app. QR code and copy link supported.';
  });

  function countdown(minutes) {
    const end = Date.now() + minutes * 60000;
    const timerEl = document.createElement('div');
    timerEl.id = 'countdown';
    document.querySelector('.container').prepend(timerEl);

    const interval = setInterval(() => {
      const diff = end - Date.now();
      if (diff <= 0) {
        timerEl.textContent = '🔥 Bonus expired';
        clearInterval(interval);
        return;
      }
      const mins = Math.floor(diff / 60000);
      const secs = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
      timerEl.textContent = \`🔥 Bonus ends in: \${mins}:\${secs}\`;
    }, 1000);
  }

  countdown(30);
  render();

  countrySelect.addEventListener('change', render);
  deviceSelect.addEventListener('change', render);
});
