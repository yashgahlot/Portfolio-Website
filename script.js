function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }
  
  // Dark/light mode
  
  const btn = document.getElementById("modeToggle");
  const btn2 = document.getElementById("modeToggle2");
  const themeIcons = document.querySelectorAll(".icon");
  const currentTheme = localStorage.getItem("theme");
  
  if (currentTheme === "dark") {
    setDarkMode();
  }
  
  btn.addEventListener("click", function () {
    setTheme();
  });
  
  btn2.addEventListener("click", function () {
    setTheme();
  });
  
  function setTheme() {
    let currentTheme = document.body.getAttribute("theme");
  
    if (currentTheme === "dark") {
      setLightMode();
    } else {
      setDarkMode();
    }
  }
  
  function setDarkMode() {
    document.body.setAttribute("theme", "dark");
    localStorage.setItem("theme", "dark");
  
    themeIcons.forEach((icon) => {
      icon.src = icon.getAttribute("src-dark");
    });
  }
  
  function setLightMode() {
    document.body.removeAttribute("theme");
    localStorage.setItem("theme", "light");
  
    themeIcons.forEach((icon) => {
      icon.src = icon.getAttribute("src-light");
    });
  }

// About Section Slideshow
function initAboutSlideshow() {
  const slides = document.querySelectorAll('.about-slide');
  const dots = document.querySelectorAll('.slideshow-dots .dot');
  let currentIndex = 0;
  
  if (slides.length === 0) return;
  
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentIndex = index;
  }
  
  function nextSlide() {
    const next = (currentIndex + 1) % slides.length;
    showSlide(next);
  }
  
  // Auto-advance every 4 seconds
  setInterval(nextSlide, 4000);
  
  // Click on dots to navigate
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });
}

// Projects Section Slideshow
function initProjectsSlideshow() {
  const slideshow = document.querySelector('.projects-slideshow');
  const slides = document.querySelectorAll('.project-slide');
  const dots = document.querySelectorAll('.project-dot');
  const prevBtn = document.querySelector('.projects-prev');
  const nextBtn = document.querySelector('.projects-next');
  let currentIndex = 0;
  
  if (!slideshow || slides.length === 0) return;
  
  function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    
    slideshow.style.transform = `translateX(-${index * 100}%)`;
    
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    
    currentIndex = index;
  }
  
  // Auto-advance every 5 seconds
  let autoAdvance = setInterval(() => showSlide(currentIndex + 1), 5000);
  
  function resetAutoAdvance() {
    clearInterval(autoAdvance);
    autoAdvance = setInterval(() => showSlide(currentIndex + 1), 5000);
  }
  
  prevBtn?.addEventListener('click', () => {
    showSlide(currentIndex - 1);
    resetAutoAdvance();
  });
  
  nextBtn?.addEventListener('click', () => {
    showSlide(currentIndex + 1);
    resetAutoAdvance();
  });
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      resetAutoAdvance();
    });
  });
}

// Initialize slideshows when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initAboutSlideshow();
  initProjectsSlideshow();
});
