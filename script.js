const menuToggle = document.querySelector('#menuToggle');
const nav = document.querySelector('.desktop-nav');
menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '×' : '☰';
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  if (menuToggle) menuToggle.textContent = '☰';
}));
const themeToggle = document.querySelector('#themeToggle');
const savedTheme = localStorage.getItem('aeman-theme');
if (savedTheme === 'light') document.body.classList.add('light');
function updateThemeIcon(){ if(themeToggle) themeToggle.textContent = document.body.classList.contains('light') ? '☾' : '☼'; }
updateThemeIcon();
themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('aeman-theme', document.body.classList.contains('light') ? 'light' : 'dark');
  updateThemeIcon();
});
document.querySelector('#year').textContent = new Date().getFullYear();
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), {threshold: 0.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Subtle cursor parallax for the hero portrait on desktop.
const heroPortrait = document.querySelector('.moodboard-hero .hero-portrait');
const moodboardHero = document.querySelector('.moodboard-hero');
if (heroPortrait && moodboardHero && window.matchMedia('(pointer:fine)').matches) {
  moodboardHero.addEventListener('pointermove', (event) => {
    const bounds = moodboardHero.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    heroPortrait.style.transform = `translate(${x * 9}px, ${y * 5}px) scale(1.008)`;
  });
  moodboardHero.addEventListener('pointerleave', () => {
    heroPortrait.style.transform = 'translate(0, 0) scale(1)';
  });
}


// Type the greeting on the tiny desk laptop, then keep it visible.
const laptopTyping = document.querySelector('.laptop-typing');
if (laptopTyping) {
  const greeting = laptopTyping.dataset.text || 'Hey! I am Aeman';
  laptopTyping.textContent = '';
  let typed = 0;
  const typeGreeting = () => {
    if (typed < greeting.length) {
      laptopTyping.textContent += greeting.charAt(typed);
      typed += 1;
      window.setTimeout(typeGreeting, 105);
    }
  };
  window.setTimeout(typeGreeting, 850);
}
