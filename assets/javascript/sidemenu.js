"use strict";

document.addEventListener("DOMContentLoaded", init);

var navOpen = false;

function init() {
  generateMenu();
  const sidebar = document.querySelector(".sidebar");

  if (sidebar) {
    const startup = () => {
      attachEvents();
    };

    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const hamburgerMenuContainer = document.querySelector(".hamburger-menu__container");
    const nav = document.querySelector(".nav");

    const attachEvents = () => {
      hamburgerMenuContainer.addEventListener("click", toggleMenu);
    };

    const toggleMenu = () => {
      hamburgerMenu.classList.toggle("hamburger-menu--open");
      nav.classList.toggle("nav--open");

      navOpen = !navOpen;

      assignStylesToNavItems();
    };

    startup();
  }
}

function generateMenu() {
  document.querySelector(".sidebar").innerHTML = `
    <div class="hamburger-menu__container">
        <div class="hamburger-menu">
            <div class="hamburger-menu__line"></div>
            <div class="hamburger-menu__line"></div>
            <div class="hamburger-menu__line"></div>
        </div>
    </div>
    <nav class="nav">
    </nav>
        `;
  addLinks(document.querySelector(".sidebar nav"));
}

function addLinks(nav) {
  fetch("assets/json/sidemenu_items.json")
    .then(response => {
      return response.json();
    })
    .then(items => {
      items.forEach(item => {
        if (item.display) {
          nav.innerHTML += `
            <a href="${item.pagename}.html" class="nav__item">
              <img src="assets/images/menu/${item.image}" />
              <span class="nav__item-text">${item.title}</span>
            </a>
            `;
        }
      });
    });
}

function assignStylesToNavItems() {
  const navItems = document.querySelectorAll(".nav__item");
  const headerHeight = document.querySelector("header").getBoundingClientRect().height;

  navItems.forEach((item, index) => {
    const topValue = navOpen ? `calc(${headerHeight}px * ${index + 1})` : 0;
    const transitionDuration = `${0.1 + 0.1 * index}s`;
    const zIndex = -1 * (index + 1);

    item.style.top = topValue;
    item.style.transitionDuration = transitionDuration;
    item.style.zIndex = zIndex;
  });
}
