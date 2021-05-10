class SearchView {
  constructor() {
    this.searchInput = document.querySelector(".company-search");
    this.searchBtn = document.querySelector(".company-search-btn");
    this.searchInputFocusIn();
    this.searchInputFocusOut();
  }

  // functionName - searchInputFocusIn
  // Job - 검색창이 FocusIn 되었을때 placeholder 내용 변경
  // Input(args, params) - none
  // Output(return) - none
  searchInputFocusIn() {
    this.searchInput.addEventListener("focusin", (event) => {
      event.target.placeholder = "";
    });
  }

  // functionName - searchInputFocusOut
  // Job - 검색창이 FocusOut 되었을때 placeholder 내용 변경
  // Input(args, params) - none
  // Output(return) - none
  searchInputFocusOut() {
    this.searchInput.addEventListener("focusout", (event) => {
      event.target.placeholder = "기업 정보 검색";
    });
  }

  // functionName - getSearchCompanyName
  // Job - 검색버튼 또는 엔터를 눌렀을때 실행되는 함수
  // Input(args, params) - callback(ctrl.getCompanyName)
  // Output(return) - none 
  getSearchCompanyName(callback) {
    this.searchBtn.addEventListener("click", () => {
      callback();
    })
    window.addEventListener('keydown', event => {
      if (event.keyCode === 13) {
        callback();
      }
    })
  }

}

export default SearchView;