// CLOCK 
function updateClock() {
  const now = new Date();
  const h = now.getHours();
  const m = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('phone-time').textContent = `${h}:${m}`;
  const days = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  document.getElementById('cal-day').textContent = days[now.getDay()];
  document.getElementById('cal-date').textContent = now.getDate();
  document.getElementById('cal-month').textContent = `${months[now.getMonth()]} ${now.getFullYear()}`;
}
updateClock();
setInterval(updateClock, 10000);

// WEATHER 
async function fetchWeather() {
  try {
    const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=33.4484&longitude=-112.0740&current_weather=true&temperature_unit=fahrenheit');
    const data = await res.json();
    const temp = Math.round(data.current_weather.temperature);
    const code = data.current_weather.weathercode;
    const condMap = {
      0:['Sunny','☀️'],1:['Mostly Clear','🌤️'],2:['Partly Cloudy','⛅'],
      3:['Overcast','☁️'],45:['Foggy','🌫️'],48:['Foggy','🌫️'],
      51:['Drizzle','🌦️'],61:['Rain','🌧️'],71:['Snow','❄️'],
      80:['Showers','🌦️'],95:['Thunderstorm','⛈️']
    };
    const [cond, icon] = condMap[code] || ['Clear','🌤️'];
    document.getElementById('weather-temp').textContent = `${temp}°F`;
    document.getElementById('weather-cond').textContent = cond;
    document.getElementById('weather-icon').textContent = icon;
  } catch(e) {
    document.getElementById('weather-temp').textContent = '106°F';
    document.getElementById('weather-cond').textContent = 'Sunny';
    document.getElementById('weather-icon').textContent = '☀️';
  }
}
fetchWeather();

// APPS 
const apps = {
  swe: {
    title: 'SWE ASU',
    icon: 'SWE ASU iOS icon.png',
    ytId: 's7xIzTNjhq0',
    side: 'left',
    meta: 'SwiftUI · Firebase · Combine',
    desc: 'Designed for the Society of Women Engineers at Arizona State University, this app provides members with easy access to event information, resources, photos, and community features.'
  },
  capture: {
    title: 'Capture',
    icon: 'Capture iOS icon.png',
    ytId: 'Uvwy4q1qgBc',
    side: 'right',
    meta: 'AVFoundation · Vision · UIKit',
    desc: 'This app scans different barcodes: QR codes, .ean13, .code128, and displays the information. It also has facial detection capabilities using the iOS Vision framework.'
  },
  location: {
    title: 'Location',
    icon: 'Location iOS icon.png',
    ytId: '0sm8K2IvrUc',
    side: 'left',
    meta: 'CoreLocation · MapKit · Foundation',
    desc: 'A location manager app built with CoreLocation and MapKit. Users can save custom locations with names, descriptions, addresses, and photos — with a live map that updates as you search.'
  },
  cupid: {
    title: "Cupid's Courier",
    icon: "Cupid's Courier iOS icon.png",
    ytId: 'SXs3F2uO_TE',
    side: 'right',
    meta: 'SpriteKit · Foundation · SwiftUI',
    desc: "A gifting game built in Swift using SpriteKit. Choose your characters, pick a gift — cookies, flowers, or money — then catch falling gifts to rack up points before they hit the ground."
  },
  fusion: {
    title: 'Fusion Collective',
    icon: 'TFC iOS icon.png',
    ytId: 'L3LWWKmMW5U',
    side: 'left',
    meta: 'PhotosUI · SwiftUICore · UIKit',
    desc: 'Built for a personal venture "The Fusion Collective", a platform for collecting and organizing any form of creative work, with pictures, notes, and more.'
  },
  menu: {
    title: 'Menu',
    icon: 'Menu iOS icon.png',
    ytId: 'rC9wxiaBiUE',
    side: 'right',
    meta: 'SwiftUI · UIKit',
    desc: "A SwiftUI menu-ordering app extended from Paul Hudson's tutorial. Added favorites tab, order badge count, pickup time scheduling, and a customized UI."
  },
  about: {
    title: 'Nandana Elizabeth',
    icon: 'photos.jpg',
    ytId: null,
    photo: 'Nandana_Photo.jpg',
    side: 'right',
    meta: 'iOS Developer · ASU 2026',
    desc: "Hi! My name is Nandana, I'm an aspiring iOS developer. I graduated with my B.S. in Computer Science (Honors) with a minor in Media Arts and Sciences from Arizona State University in May 2026. Reach out and connect!"
  },
};

let currentApp = null;
let notifTimer = null;

function openApp(key) {
  currentApp = key;
  const app = apps[key];
  const overlay = document.getElementById('phone-video-overlay');
  const iframe = document.getElementById('yt-iframe');
  const frameWrap = document.getElementById('yt-frame-wrap');
  const photoEl = document.getElementById('photo-display');

  // Photo entry (about)
  if (app.photo) {
    frameWrap.style.display = 'none';
    photoEl.style.display = 'block';
    photoEl.src = app.photo;
    overlay.classList.add('active');
    openDetail();
    return;
  }

  // YouTube entry
  photoEl.style.display = 'none';
  frameWrap.style.display = 'flex';
  iframe.src = `https://www.youtube.com/embed/${app.ytId}?autoplay=1&mute=0&loop=1&playlist=${app.ytId}&rel=0&playsinline=1&modestbranding=1`;
  overlay.classList.add('active');

  if (notifTimer) clearTimeout(notifTimer);
  const notif = document.getElementById('phone-notif');
  document.getElementById('notif-icon-img').src = app.icon;
  document.getElementById('notif-icon-img').alt = app.title;
  document.getElementById('notif-title').textContent = app.title;

  notifTimer = setTimeout(() => {
    notif.classList.add('show');
    notifTimer = setTimeout(() => notif.classList.remove('show'), 3500);
  }, 700);
}

function openDetail() {
  if (!currentApp) return;
  const app = apps[currentApp];
  const panel = document.getElementById('detail-panel');
  const overlay = document.getElementById('app-detail');

  document.getElementById('detail-name').textContent = app.title;
  document.getElementById('detail-meta').textContent = app.meta;
  document.getElementById('detail-desc').textContent = app.desc;

  panel.classList.remove('side-left', 'side-right');
  panel.classList.add(`side-${app.side}`);

  overlay.classList.add('active');
  document.getElementById('phone-notif').classList.remove('show');
}

function closeDetail() {
  document.getElementById('app-detail').classList.remove('active');
}

function openSocial(url) {
  window.open(url, '_blank', 'noopener');
}

function closeVideo() {
  if (notifTimer) clearTimeout(notifTimer);

  const iframe = document.getElementById('yt-iframe');
  iframe.src = '';

  const photoEl = document.getElementById('photo-display');
  photoEl.src = '';
  photoEl.style.display = 'none';

  document.getElementById('yt-frame-wrap').style.display = 'flex';
  document.getElementById('phone-video-overlay').classList.remove('active');
  document.getElementById('phone-notif').classList.remove('show');
  closeDetail();
  currentApp = null;
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeDetail(); closeVideo(); }
});
