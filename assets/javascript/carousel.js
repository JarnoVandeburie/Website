"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
  document.querySelectorAll(".carousel").forEach(carousel => {
    carousel.setAttribute("data-id", 0);

    if (carousel.querySelectorAll(".carousel-item").length > 1) {
      carousel.innerHTML += `
        <div class="carousel-buttons">
          <button class="prev"><img src="assets/images/previous.png" alt="&lt;"></button>
          <p>1/5</p>
          <button class="next"><img src="assets/images/next.png" alt="&gt;"></button>
        </div>
      `;
      updateCarousel(carousel);
      carousel.querySelector(".prev").addEventListener("click", rotateCarouselBackwards);
      carousel.querySelector(".next").addEventListener("click", rotateCarouselForwards);
    }
  });
}

function rotateCarouselBackwards(e) {
  const carousel = e.target.tagName == "BUTTON" ? e.target.parentElement.parentElement : e.target.parentElement.parentElement.parentElement;
  let slide = carousel.getAttribute("data-id");
  slide--;
  if (slide < 0) {
    slide = carousel.querySelectorAll(".carousel-item").length - 1;
  }
  carousel.setAttribute("data-id", slide);

  updateCarousel(carousel);
}

function rotateCarouselForwards(e) {
  const carousel = e.target.tagName == "BUTTON" ? e.target.parentElement.parentElement : e.target.parentElement.parentElement.parentElement;
  let slide = carousel.getAttribute("data-id");
  slide++;
  if (slide > carousel.querySelectorAll(".carousel-item").length - 1) {
    slide = 0;
  }
  carousel.setAttribute("data-id", slide);

  updateCarousel(carousel);
}

function updateCarousel(carousel) {
  carousel.querySelector(".carousel-buttons p").innerText = parseInt(carousel.getAttribute("data-id")) + 1 + " / " + carousel.querySelectorAll(".carousel-item").length;
  carousel.querySelectorAll(".carousel-item").forEach((image, index) => {
    if (index === parseInt(carousel.getAttribute("data-id"))) {
      image.style.display = "inherit";
    } else {
      image.style.display = "none";
    }
  });
}
