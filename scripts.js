// scripts.js

document.addEventListener('DOMContentLoaded', () => {
  const toggleTheme = document.getElementById('toggleTheme');
  const langSelect = document.getElementById('langSelect');

  // Toggle QR by element ID
  window.toggleQR = function(id) {
    const qr = document.getElementById(id);
    if (qr) {
      qr.classList.toggle('show');
    }
  };

  // Dark mode toggle
  toggleTheme.addEventListener('change', () => {
    document.documentElement.setAttribute('data-theme', toggleTheme.checked ? 'dark' : 'light');
  });

  // Language switcher
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

  countdown(30);
});
