class ShowPortfolioView {
  constructor() {
    this.root = document.querySelector('.portfolio-root');
    console.log(this.root)
  }

  showPortfolio(res) {
    console.log(res)
    const title = res.title;
    const content = res.content;
    const userId = res.user_id;
    let stockNameArr = [];
    let stockCountArr = [];
    let stockAmountArr = [];
    for (let i = 0; i < res.stock.length; i++){
      stockNameArr.push(res.stock[i]["stock_name"]);
      stockCountArr.push(res.stock[i]["stock_count"]);
      stockAmountArr.push(res.stock[i]["stock_amount"]);
    }
    let portfolio_HTML = `<div class="view-all-container">
    <div class="view-button-content">
      <a href="" role="button" class="btn prev-btn">
        <span class="btn-text">이전글</span>
      </a>
      <a href="" role="button" class="btn next-btn">
        <span class="btn-text">다음글</span>
      </a>
      <a href="" role="button" class="btn list-btn">
        <span class="btn-text">목록</span>
      </a>
    </div>
    <div class="write-content-box">
      <div class="write-title">
        <span class="title">${title}</span>
      </div>
      <div class="user-info">
        <span class="user-nickname">${userId}</span>
        <div class="write-info">
          <span class="date">2021.04.21 12:41</span>
          <span class="view-count">조회 10</span>
        </div>
      </div>
      <div class="view-graph-content">
        <div class="view-graph">

        </div>
        <div class="view-text">
          <span class="main-text-title">포트폴리오 세부사항</span>
          <a id="stock" class="main-text"></a></apan>
        </div>
      </div>
      <div class="write-main-text">
        <span>${content}</span>
      </div>
      <div class="comment-write">
        <div class="comment-inbox">
          <strong class="comment-inbox-name">주린이</strong>
          <textarea class="comment-inbox-text" placeholder="댓글을 남겨보세요" cols="20" wrap="virtual" rows="3"
            maxlength="3000"></textarea>
        </div>
        <div class="register-box">
          <a href="" role="button" class="btn-register">등록</a>
        </div>
      </div>
    </div>
    <div class="bottom-button-content">
      <a href="" role="button" class="btn write-btn">
        <span class="btn-text">글쓰기</span>
      </a>
      <a href="" role="button" class="btn list-btn">
        <span class="btn-text">목록</span>
      </a>
      <a href="" role="button" class="btn top-btn">
        <span class="btn-text">▲TOP</span>
      </a>
    </div>
  </div>`
  

  this.root.insertAdjacentHTML('afterend', portfolio_HTML);

  let stock = document.querySelector('#stock')
  for (let i = 0; i < stockNameArr.length; i++) {

    stock.innerHTML += `${stockNameArr[i]} - ${stockCountArr[i]}주 <br>`;
    
  }
  }
}

export default ShowPortfolioView;