"use strict";

var timer = null;
var currentId;

document.addEventListener("DOMContentLoaded", init);

function init() {
  window.addEventListener(
    "scroll",
    function () {
      if (timer !== null) {
        clearTimeout(timer);
        disableScroll();
      }
      timer = setTimeout(function () {
        enableScroll();
      }, 150);
    },
    false
  );

  document.querySelectorAll(".scrollbar a").forEach(element => {
    element.addEventListener("click", e => {
      e.preventDefault();
      const targetElement = document.querySelector(e.target.getAttribute("href"));

      targetElement.scrollIntoView();
      currentId = targetElement.id;
    });
  });
}

// call this to Disable
function disableScroll() {
  document.querySelectorAll(".carousel-item").forEach(item => item.addEventListener("mousewheel", preventScroll, { passive: false }));
  document.querySelectorAll(".carousel-item").forEach(item => item.addEventListener("DOMMouseScroll", preventScroll, { passive: false }));
}

function enableScroll() {
  document.querySelectorAll(".carousel-item").forEach(item => {
    item.removeEventListener("mousewheel", preventScroll, { passive: false });
    item.removeEventListener("DOMMouseScroll", preventScroll, { passive: false });
  });
}

function preventScroll(e) {
  e.preventDefault();
}
