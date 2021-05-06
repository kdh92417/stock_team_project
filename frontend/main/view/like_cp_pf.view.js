class LikeCpPfView {
  constructor() {
    this.middle = document.querySelector(".main-middle");
  }
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

  addTop5Company(data, callback) {
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
    callback();
  }

  showLikePortfolio() {
    this.bottom = document.querySelector(".keywordRank-company");
    let likePortfolio_HTML =
      `<div class="keywordRank-portfolio">
        <div class="rankPortfolio-title">주간 인기 검색 포트폴리오</div>
        <hr>
        <div class="rank-portfolio">
          <ul class="rank-portfolio-list">
          </ul>
        </div>
      </div>`
    this.bottom.insertAdjacentHTML('afterend', likePortfolio_HTML);
  }

  addTop5Portfolio(data, callback) {
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
    callback();
  }

}

export default LikeCpPfView;