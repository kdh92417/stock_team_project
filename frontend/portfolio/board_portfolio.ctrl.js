class BoardPortfolioController {
  constructor(api) {
    this.api = api;
    this.loadBoardPage();
  }
  
  loadBoardPage() {
    this.api.getPortfolioList();
  }
}

export default BoardPortfolioController;