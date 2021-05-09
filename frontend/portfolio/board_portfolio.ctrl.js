import API from '../api/api.js';

class BoardPortfolioController {
  constructor(view) {
    this.view = view;
    this.loadBoardPage();
  }
  
  loadBoardPage() {
    API.getPortfolioList( "http://15.165.17.217:8000/portfolio/list/?page=1")
    .then((res) => (res.json()))
    .then((res) => {
      console.log(res);
      this.view.showPortfolioList(res.board_data);
      // this.view.showFilteredPortfolio();
    })
    .catch((err) => {
      console.log(err);
    })

  }
}

export default BoardPortfolioController;