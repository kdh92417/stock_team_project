class PortfolioController {
  constructor(service, view){
    this.view = view;
    this.service = service;
    this.view.submitPortfolio();
  }

}

export default PortfolioController;