"use strict";

const searchInput = document.querySelector(".company-search"),
  mainTop = document.querySelector(".main-top"),
  mainSearch = document.querySelector(".main-search"),
  mainMiddle = document.querySelector(".main-middle");

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