import API from "../../api/api.js"

class LikeCpPfCtrl {
  constructor(service, view) {
    this.service = service;
    this.view = view;
    this.getLikeCompanyAndPortfolio();
  }

  getLikeCompanyAndPortfolio() {
    API.get(`http://192.168.1.32:8000/main/`)
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
    this.view.addTop5Company(company);
    this.view.addTop5Portfolio(portfolio);
    this.view.findCompanyList(rankTimer);
    this.view.findPortfolioList(rankTimer);
  }
}

export default LikeCpPfCtrl;