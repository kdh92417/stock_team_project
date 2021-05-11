import API from '../api/api.js';

class ShowPortfolioController {
  constructor(view) {
    this.view = view;

    const params = new URLSearchParams(window.location.search);
    const pfId = params.get('board_id');


    // this.api.getPortfolio(pfId);
    API.getPortfolio("http://192.168.1.32:8000/portfolio/write/" + `?board_id=${pfId}`)
      .then((res) => (res.json()))
      .then((res) => {
        console.log(res);
        this.view.showPortfolio(res.board_data, pfId);
        this.view.printComments(res.comment_data);
        this.view.showDeleteBtn(pfId);
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

export default ShowPortfolioController;