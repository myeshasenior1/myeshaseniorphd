const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 15));

document.querySelector('.menu-button').addEventListener('click', (e) => {
  const nav = document.querySelector('.nav');
  nav.classList.toggle('open');
  e.currentTarget.setAttribute('aria-expanded', nav.classList.contains('open'));
});

document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => document.querySelector('.nav').classList.remove('open')));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const filters = document.querySelectorAll('.filter');
const publications = document.querySelectorAll('.publication');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(f => f.classList.remove('active'));
  button.classList.add('active');
  const selected = button.dataset.filter;
  publications.forEach(pub => {
    const categories = pub.dataset.category.split(' ');
    pub.classList.toggle('hidden', selected !== 'all' && !categories.includes(selected));
  });
}));

document.getElementById('year').textContent = new Date().getFullYear();
