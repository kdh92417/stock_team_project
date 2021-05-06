import API from "../../api/api.js"

class LikeCpPfCtrl {
  constructor(service, view) {
    this.service = service;
    this.view = view;
    this.getLikeCompanyAndPortfolio();
  }

  getLikeCompanyAndPortfolio() {
    API.get(`http://15.165.17.217:8000/main/`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        const companyInfo = [];
        const portfolioInfo = [];
        for (let x of res.top10_company_list) {
          companyInfo.push(x)
        }
        for (let x of res.top10_portfolio_list) {
          portfolioInfo.push(x)
        }
        this.view.showLikeCompany();
        this.view.showLikePortfolio();
        this.sendCompanyAndPortfolioData(companyInfo, portfolioInfo)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sendCompanyAndPortfolioData(company, portfolio) {
    console.log(this.service, this.view)
    const rankTimer = this.service.rankTimer;
    const rankPfTimer = this.service.rankPfTimer;
    this.view.addTop5Company(company, rankTimer);
    this.view.addTop5Portfolio(portfolio, rankPfTimer);
  }
}

export default LikeCpPfCtrl;