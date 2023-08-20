AOS.init({
  duration: 1200,
  once: true
});
let msnry;

document.addEventListener("DOMContentLoaded", () => {
  msnry = new Masonry('.projects__items', {
    percentPosition: true
  });
});

const showMoreBtn = document.querySelector('.projects .showMore');
const projects = document.querySelectorAll('.projects__items .projects__item');
const overlay = document.querySelector('.projects .overlay');

showMoreBtn.addEventListener('click', () => {
  for (let i = 9; i < projects.length; i++){
    projects[i].classList.remove('hide');
    showMoreBtn.classList.add('hide');
    overlay.classList.add('hide');
  }
  msnry.layout();
})