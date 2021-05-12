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
          <div class="list-item company-item list_sliding">
            <span id="${data[i].company_like}" class="rank-num">${i + 1}</span>
            <span id="${data[i].corp_code}" class="rank-text">${data[i].company_name}</span>
          </div>
          <div class="list-item company-item">
            <span id="${data[i].company_like}" class="rank-num">${i + 1}</span>
            <span id="${data[i].corp_code}"  class="rank-text">${data[i].company_name}</span>
          </div>
        </div>
      </li>`
    }
  }

  // functionName - sendRankList
  // Job - 메인페이지 top5 회사의 정보를 보내줌
  // Input(args, params) - callback(service.showRankCompany)  
  // Output(return) - none
  sendRankList(callback) {
    const topRank = document.querySelectorAll(".company-item");
    callback(topRank);
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
    this.middle = document.querySelector(".keywordRank-company");
    let likePortfolio_HTML =
      `<div class="keywordRank-portfolio">
        <div class="rankPortfolio-title">주간 인기 포트폴리오</div>
        <hr>
        <div class="rank-portfolio">
          <ul class="rank-portfolio-list">
          </ul>
        </div>
      </div>`
    this.middle.insertAdjacentHTML('afterend', likePortfolio_HTML);
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
                  <a href="http://127.0.0.1:5503/frontend/main/template/write-view.html?board_id=${data[i].portfolio_id}">
                  <span id="${data[i].portfolio_id}" class="rank-text">${data[i].portfolio_title}</span></a>
                </div>
                <div class="list-item">
                  <span class="rank-num">${i + 1}</span>
                  <a href="http://127.0.0.1:5503/frontend/main/template/write-view.html?board_id=${data[i].portfolio_id}">
                  <span id="${data[i].portfolio_id}" class="rank-text">${data[i].portfolio_title}</span></a>
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

  // functionName - showBestMember
  // Job - best member 화면에 출력
  // Input(args, params) - none 
  // Output(return) - none
  showBestMember() {
    this.bottom = document.querySelector(".keywordRank-portfolio");
    let likePortfolio_HTML =
      `<div class="rank-best-member">
        <div class="best-member-title">Best Member</div>
        <hr>
        <div class="best-member">
          <ul class="best-member-list">
          </ul>
        </div>
      </div>`
    this.bottom.insertAdjacentHTML('afterend', likePortfolio_HTML);
  }

  // functionName - addTop5Member
  // Job - best member top5 화면에 출력 (글 작성이 많은 사람 순)
  // Input(args, params) - best member data 
  // Output(return) - none
  addTop5Member(data) {
    const bestList = document.querySelector(".best-member-list");
    for (let i = 0; i < data.length; i++) {
      bestList.innerHTML += `<li>
        <div class="list-member">
          <div class="list-item user-name list_sliding">
            <span class="rank-num">${i + 1}</span>
            <span id="${data[i].counts_of_writers}" class="rank-text">${data[i].user_id}</span>
          </div>
          <div class="list-item user-name">
            <span class="rank-num">${i + 1}</span>
            <span id="${data[i].counts_of_writers}" class="rank-text">${data[i].user_id}</span>
          </div>
        </div>
      </li>`
    }
  }

  // functionName - sendUserList
  // Job - 메인페이지 top5 유저의 아이디를 보내줌
  // Input(args, params) - callback(service.showRankCompany)  
  // Output(return) - none
  sendUserList(callback) {
    const userName = document.querySelectorAll(".user-name");
    callback(userName);
  }

  // functionName - findMemberList
  // Job - 갱신화면 효과를 위해 member list select
  // Input(args, params) - callback 
  // Output(return) - none
  findMemberList(callback) {
    const list = document.querySelector(".best-member-list")
    callback(list);
  }
}

export default LikeCpPfView;