import API from "../../api/api.js"

class LikeCpPfCtrl {
  constructor(service, view) {
    this.service = service;
    this.view = view;
    this.getLikeCompanyAndPortfolio();
  }


  // functionName - getLikeCompanyAndPortfolio
  // Job - 주간 인기 검색 기업 / 주간 인기 포트폴리오를 서버에서 받아옴
  // Input(args, params) - none 
  // Output(return) - none
  getLikeCompanyAndPortfolio() {
    API.get(`http://192.168.1.32:8000/main/`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        const companyInfo = [];
        const portfolioInfo = [];
        const bestMember = [];
        for (let x of res.top5_company_list) {
          companyInfo.push(x);
        }
        for (let x of res.top5_portfolio_list) {
          portfolioInfo.push(x);
        }
        for (let x of res.top5_user_list) {
          bestMember.push(x);
        }
        this.view.showLikeCompany();
        this.view.showLikePortfolio();
        this.view.showBestMember();
        this.sendCompanyAndPortfolioData(companyInfo, portfolioInfo, bestMember)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // functionName - sendCompanyAndPortfolioData
  // Job - 주간 인기 검색 기업 / 주간 인기 포트폴리오 / Best Member를 서버에서 받아온 데이터를 view에 전달
  // Input(args, params) - companyInfo, portfolioInfo, bestMember
  // Output(return) - none
  sendCompanyAndPortfolioData(company, portfolio, bestMember) {
    const rankTimer = this.service.rankTimer,
      showRankCompany = this.service.showRankCompany,
      showUserPortfolio = this.service.showUserPortfolio;
    this.view.addTop5Company(company);
    this.view.addTop5Portfolio(portfolio);
    this.view.addTop5Member(bestMember);
    this.view.findCompanyList(rankTimer);
    this.view.findPortfolioList(rankTimer);
    this.view.findMemberList(rankTimer);
    this.view.sendRankList(showRankCompany);
    this.view.sendUserList(showUserPortfolio);
  }
}

export default LikeCpPfCtrl;