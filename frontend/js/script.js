"use strict";

const mainNav = document.querySelector('.nav-container'),
  mainLogin = document.querySelector(".main-login");
window.onscroll = () => {
  if (window.scrollY > 25) {
    mainNav.classList.add('nav-active');
    mainLogin.classList.add('nav-active');
  } else {
    mainNav.classList.remove('nav-active');
    mainLogin.classList.remove('nav-active');
  }
};