class LikeCpPfView {
  constructor() {
    this.middle = document.querySelector(".main-middle");
  }

  // functionName - showLikeCompany
  // Job - 주간 인기 검색 기업 화면에 출력
  // Input(args, params) - none 
  // Output(return) - none
  showLikeCompany() {
    let likeCompany_HTML = `<div class="rank-container">
                              <div class="keywordRank-company">
                                <div class="rankCompany-title">주간 인기 검색 기업</div>
                                <hr>
                                <div class="rank-company">
                                  <ul class="rank-company-list">
                                  </ul>
                                </div>
                              </div>
                            </div>`
    this.middle.insertAdjacentHTML('beforeend', likeCompany_HTML);
  }

  // functionName - addTop5Company
  // Job - 주간 인기 검색 기업 top5 화면에 출력
  // Input(args, params) - company data 
  // Output(return) - none
  addTop5Company(data) {
    const topRank = document.querySelector(".rank-company-list");
    for (let i = 0; i < 5; i++) {
      topRank.innerHTML += `<li>
        <div class="list-company">
          <div class="list-item list_sliding">
            <span class="rank-num">${i + 1}</span>
            <span class="rank-text">${data[i].company_name}</span>
          </div>
          <div class="list-item">
            <span class="rank-num">${i + 1}</span>
            <span class="rank-text">${data[i].company_name}</span>
          </div>
        </div>
      </li>`
    }

  }

  // functionName - findCompanyList
  // Job - 갱신화면 효과를 위해 company list select
  // Input(args, params) - callback  
  // Output(return) - none
  findCompanyList(callback) {
    const list = document.querySelector(".rank-company-list")
    callback(list);
  }

  // functionName - showLikePortfolio
  // Job - 주간 인기 포트폴리오 화면에 출력
  // Input(args, params) - none 
  // Output(return) - none
  showLikePortfolio() {
    this.bottom = document.querySelector(".keywordRank-company");
    let likePortfolio_HTML =
      `<div class="keywordRank-portfolio">
        <div class="rankPortfolio-title">주간 인기 포트폴리오</div>
        <hr>
        <div class="rank-portfolio">
          <ul class="rank-portfolio-list">
          </ul>
        </div>
      </div>`
    this.bottom.insertAdjacentHTML('afterend', likePortfolio_HTML);
  }


  // functionName - addTop5Portfolio
  // Job - 주간 인기 포트폴리오 top5 화면에 출력
  // Input(args, params) - portfolio data 
  // Output(return) - none
  addTop5Portfolio(data) {
    const topPortfolio = document.querySelector(".rank-portfolio-list");
    for (let i = 0; i < 5; i++) {
      topPortfolio.innerHTML += `<li>
              <div class="list-portfolio">
                <div class="list-item list_sliding">
                  <span class="rank-num">${i + 1}</span>
                  <span class="rank-text">${data[i].portfolio_title}</span>
                </div>
                <div class="list-item">
                  <span class="rank-num">${i + 1}</span>
                  <span class="rank-text">${data[i].portfolio_title}</span>
                </div>
              </div>
            </li>`
    }
  }

  // functionName - findPortfolioList
  // Job - 갱신화면 효과를 위해 portfolio list select
  // Input(args, params) - callback 
  // Output(return) - none
  findPortfolioList(callback) {
    const list = document.querySelector(".rank-portfolio-list")
    callback(list);
  }
}

export default LikeCpPfView;