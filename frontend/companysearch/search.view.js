class SearchView {
  constructor() {
    this.searchInput = document.querySelector(".company-search");
    this.searchBtn = document.querySelector(".company-search-btn");
    this.searchInputFocusIn();
    this.searchInputFocusOut();
  }

  searchInputFocusIn() {
    this.searchInput.addEventListener("focusin", (event) => {
      event.target.placeholder = "";
    });
  }

  searchInputFocusOut() {
    this.searchInput.addEventListener("focusout", (event) => {
      event.target.placeholder = "기업 정보 검색";
    });
  }

  getSearchCompanyName(callback) {
    this.searchBtn.addEventListener("click", () => {
      callback();
    })
  }

}

export default SearchView;