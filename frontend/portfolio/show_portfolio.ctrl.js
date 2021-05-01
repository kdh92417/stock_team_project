class ShowPortfolioController {
  constructor(api){
    this.api = api
    
    const params = new URLSearchParams(window.location.search);
    const pfId = params.get('board_id');

    this.api.getPortfolio(pfId);
  }
  
}

export default ShowPortfolioController;