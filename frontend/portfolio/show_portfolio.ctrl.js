import API from '../api/api.js';

class ShowPortfolioController {
  constructor(view) {
    this.view = view;

    const params = new URLSearchParams(window.location.search);
    const pfId = params.get('board_id');

    API.getPortfolio("http://192.168.1.32:8000/portfolio/write/" + `?board_id=${pfId}`)
      .then((res) => (res.json()))
      .then((res) => {
        console.log(res);
        this.view.showPortfolio(res.board_data, pfId, this.movePreviousPortfolio);
        this.view.printComments(res.comment_data);
        this.view.showDeleteBtn(pfId);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  movePreviousPortfolio = (prev, previousBtn) => {
    previousBtn.addEventListener("click", () => {
      if (prev === null) {
        return alert("첫번째 페이지입니다.")
      } else location.href = `http://127.0.0.1:5503/frontend/main/template/write-view.html?board_id=` + prev;
    })
  }
}

export default ShowPortfolioController;