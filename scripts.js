// scripts.js
const translations = {
  en: { title: "Fast & Secure Bookmaker Downloads", sub: "Select your country & device..." },
  ro: { title: "Descărcări rapide pentru case de pariuri", sub: "Selectează țara și dispozitivul..." },
  de: { title: "Schnelle Downloads für Buchmacher-Apps", sub: "Wähle dein Land und Gerät..." }
};
const bookmakers = [
  { name: "Bet365", logo: "logos/bet365.png", countries: ["UK", "Germany"], android: "downloads/bet365.apk", ios: "downloads/bet365.ipa" },
  { name: "Betano", logo: "logos/betano.png", countries: ["Romania"], android: "downloads/betano.apk", ios: "downloads/betano.ipa" },
  { name: "1xBet", logo: "logos/1xbet.png", countries: ["Germany", "Romania"], android: "downloads/1xbet.apk", ios: null },
  { name: "Coral", logo: "logos/coral.png", countries: ["UK"], android: "downloads/coral.apk", ios: null },
  { name: "Sky Bet", logo: "logos/skybet.png", countries: ["UK"], android: "downloads/skybet.apk", ios: "downloads/skybet.ipa" },
  { name: "William Hill", logo: "logos/williamhill.png", countries: ["UK"], android: "downloads/williamhill.apk", ios: "downloads/williamhill.ipa" },
  { name: "Marathon Bet", logo: "logos/marathonbet.png", countries: ["Germany"], android: "downloads/marathonbet.apk", ios: null }
];
function generateQR(link) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(link)}`;
}
function toggleQR(qrId) {
  const el = document.getElementById(qrId);
  el.classList.toggle('show');
}
function renderBookmakers() {
  const country = document.getElementById('countrySelect').value;
  const device = document.getElementById('deviceSelect').value;
  const grid = document.getElementById('bookmakerGrid');
  grid.innerHTML = '';
  bookmakers.forEach((bm, index) => {
    const matchCountry = country === 'all' || bm.countries.includes(country);
    const matchDevice = device === 'all' || (device === 'android' && bm.android) || (device === 'ios' && bm.ios);
    if (matchCountry && matchDevice) {
      const card = document.createElement('div');
      card.className = 'card';
      const badge = `<div class="badge">${bm.countries.join(', ')}</div>`;
      let html = `
        ${badge}
        <img class="logo" src="${bm.logo}" alt="${bm.name} logo" />
        <h2>${bm.name}</h2>
        <div class="downloads">`;
      if (bm.android) {
        html += `<div class="platform">
          <a class="btn android" href="${bm.android}" download onclick="toggleQR('qr-${index}-android')">Android</a>
          <div class="qr" id="qr-${index}-android"><img src="${generateQR(bm.android)}" alt="QR Android"></div>
          <span class="copy-link" onclick="navigator.clipboard.writeText('${bm.android}')">📋 Copy Link</span>
        </div>`;
      }
      if (bm.ios) {
        html += `<div class="platform">
          <a class="btn ios" href="${bm.ios}" download onclick="toggleQR('qr-${index}-ios')">iOS</a>
          <div class="qr" id="qr-${index}-ios"><img src="${generateQR(bm.ios)}" alt="QR iOS"></div>
          <span class="copy-link" onclick="navigator.clipboard.writeText('${bm.ios}')">📋 Copy Link</span>
        </div>`;
      }
      html += `</div>`;
      card.innerHTML = html;
      grid.appendChild(card);
    }
  });
}
document.getElementById('toggleTheme').addEventListener('change', e => {
  document.documentElement.setAttribute('data-theme', e.target.checked ? 'dark' : 'light');
});
document.getElementById('langSelect').addEventListener('change', e => {
  const lang = e.target.value;
  const t = translations[lang];
  document.getElementById('heroTitle').textContent = t.title;
  document.getElementById('heroSub').textContent = t.sub;
});
document.getElementById('countrySelect').addEventListener('change', renderBookmakers);
document.getElementById('deviceSelect').addEventListener('change', renderBookmakers);
document.addEventListener('DOMContentLoaded', () => {
  lottie.loadAnimation({ container: document.getElementById('animationContainer'), renderer: 'svg', loop: true, autoplay: true, path: 'https://assets4.lottiefiles.com/private_files/lf30_q5pk6p1k.json' });
  renderBookmakers();
});
