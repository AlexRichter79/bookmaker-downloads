// scripts.js

document.addEventListener('DOMContentLoaded', () => {
  const countrySelect = document.getElementById('countrySelect');
  const deviceSelect = document.getElementById('deviceSelect');
  const toggleTheme = document.getElementById('toggleTheme');
  const langSelect = document.getElementById('langSelect');
  const grid = document.getElementById('bookmakerGrid');

  const data = [
    { name: 'Bet365', country: 'UK', device: 'android', logo: 'logos/bet365.png', android: '#', ios: '#', top: true },
    { name: 'SkyBet', country: 'UK', device: 'ios', logo: 'logos/skybet.png', android: '#', ios: '#', top: false },
    { name: 'William Hill', country: 'UK', device: 'android', logo: 'logos/williamhill.png', android: '#', ios: '#', top: false },
    { name: 'Coral', country: 'UK', device: 'ios', logo: 'logos/coral.png', android: '#', ios: '#', top: false },
    { name: 'Marathonbet', country: 'Germany', device: 'android', logo: 'logos/marathonbet.png', android: '#', ios: '#', top: false },
    { name: 'Betano', country: 'Romania', device: 'android', logo: 'logos/betano.png', android: '#', ios: '#', top: true },
    { name: '1xBet', country: 'Germany', device: 'ios', logo: 'logos/1xbet.png', android: '#', ios: '#', top: true }
  ];

  function render() {
    const cVal = countrySelect.value;
    const dVal = deviceSelect.value;
    grid.innerHTML = '';

    data.forEach(item => {
      if ((cVal === 'all' || item.country === cVal) && (dVal === 'all' || item.device === dVal)) {
        const div = document.createElement('div');
        div.className = 'card';
        div.setAttribute('data-aos', 'fade-up');
        div.innerHTML = `
          ${item.top ? '<div class="ribbon">Top Rated</div>' : ''}
          <img class="logo" src="${item.logo}" alt="${item.name}" />
          <h3>${item.name}</h3>
          <div class="platform">
              <a class="btn android" href="${item.android}" target="_blank" onclick="toggleQR(this)">Android</a>
              <a class="btn ios" href="${item.ios}" target="_blank">iOS</a>
            <div class="copy-link" onclick="copyLink('${item.android}')">📋 Copy Link</div>
            <div class="qr"><img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(item.android)}" /></div>
          </div>
        `;
        grid.appendChild(div);
      }
    });
  }

  function copyLink(link) {
    navigator.clipboard.writeText(link).then(() => alert('Link copied to clipboard!'));
  }
  
function toggleQR(element) {
  const qr = element.nextElementSibling;
  if (qr && qr.classList.contains('qr')) {
    qr.classList.toggle('show');
  }
}
  window.copyLink = copyLink;

  countrySelect.addEventListener('change', render);
  deviceSelect.addEventListener('change', render);

  toggleTheme.addEventListener('change', () => {
    document.documentElement.setAttribute('data-theme', toggleTheme.checked ? 'dark' : 'light');
  });

  langSelect.addEventListener('change', () => {
    const lang = langSelect.value;
    document.getElementById('heroTitle').textContent =
      lang === 'ro' ? 'Descărcări Rapide pentru Case de Pariuri' :
      lang === 'de' ? 'Schnelle & sichere Buchmacher-Downloads' :
      'Fast & Secure Bookmaker Downloads';

    document.getElementById('heroSub').textContent =
      lang === 'ro' ? 'Selectați țara și dispozitivul, apoi instalați aplicația instant.' :
      lang === 'de' ? 'Land und Gerät wählen, App sofort installieren.' :
      'Select your country & device, then instantly install the app. QR code and copy link supported.';
  });

  // Countdown Timer
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
      timerEl.textContent = `🔥 Bonus ends in: ${mins}:${secs}`;
    }, 1000);
  }

  countdown(30); // 30-minute timer

  // Initialize
  render();

  // Optional: Auto-select user country
  fetch('https://ipapi.co/json')
    .then(res => res.json())
    .then(data => {
      const countryName = data.country_name;
      const match = [...countrySelect.options].find(opt => opt.text === countryName);
      if (match) {
        countrySelect.value = match.value;
        render();
      }
    });

  // Animate on scroll support
  if (window.AOS) AOS.init();
});
