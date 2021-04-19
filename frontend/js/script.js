"use strict";

const mainNav = document.querySelector('.navbar'),
  mainLogin = document.querySelector(".main-login"),
  searchInput = document.querySelector(".company-search"),
  mainTop = document.querySelector(".main-top"),
  mainSearch = document.querySelector(".main-search"),
  mainMiddle = document.querySelector(".main-middle");
window.onscroll = () => {
  if (window.scrollY > 25) {
    mainNav.classList.add('nav-active');
    mainLogin.classList.add('nav-active');
  } else {
    mainNav.classList.remove('nav-active');
    mainLogin.classList.remove('nav-active');
  }
};

mainTop.addEventListener("click", () => {
  searchInput.placeholder = "기업 정보 검색"
});

mainMiddle.addEventListener("click", () => {
  searchInput.placeholder = "기업 정보 검색"
});

searchInput.addEventListener("focus", () => {
  searchInput.placeholder = ""
});

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
  };
}, true);