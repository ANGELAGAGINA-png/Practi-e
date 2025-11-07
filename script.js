const images = [
  { src: 'images/img1.jpg', alt: 'Пейзаж 1' },
  { src: 'images/img2.jpg', alt: 'Пейзаж 2' },
  { src: 'images/img3.jpg', alt: 'Пейзаж 3' },
  { src: 'images/img4.jpg', alt: 'Пейзаж 4' },
  { src: 'images/img5.jpg', alt: 'Пейзаж 5' }
];

let index = 0;
const slideImg = document.getElementById('slideImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const counter = document.getElementById('counter');
const dotsContainer = document.getElementById('dots');

function createDots() {
  images.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'slider__dot';
    btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-label', `Слайд ${i + 1}`);
    btn.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(btn);
  });
}

function updateDots() {
  const dots = dotsContainer.querySelectorAll('.slider__dot');
  dots.forEach((d, i) => d.setAttribute('aria-selected', i === index ? 'true' : 'false'));
}

function updateCounter() {
  counter.textContent = Изображение ${index + 1} из ${images.length};
}

function showImage(newIndex) {
  const next = images[newIndex];
  // лёгкая анимация: уменьшить и затем заменить источник
  slideImg.style.opacity = '0';
  slideImg.style.transform = 'scale(0.98)';
  setTimeout(() => {
    slideImg.src = next.src;
    slideImg.alt = next.alt;
    slideImg.onload = () => {
      slideImg.style.opacity = '1';
      slideImg.style.transform = 'scale(1)';
    };
  }, 180);
  updateCounter();
  updateDots();
}

function goTo(i) {
  index = (i + images.length) % images.length;
  showImage(index);
}

function next() {
  index = (index + 1) % images.length;
  showImage(index);
}

function prev() {
  index = (index - 1 + images.length) % images.length;
  showImage(index);
}

prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') prev();
  if (e.key === 'ArrowRight') next();
});

// Инициализация
createDots();
updateCounter();
updateDots();

// Резерв: если изображения хранятся в другой папке или отсутствуют, можно использовать плейсхолдер
slideImg.onerror = () => {
  slideImg.src = 'images/placeholder.png';
  slideImg.alt = 'Изображение недоступно';
};