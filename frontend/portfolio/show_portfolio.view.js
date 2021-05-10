import API from '../api/api.js'

class ShowPortfolioView {
  constructor(comment) {
    this.root = document.querySelector('.portfolio-root');
    this.comment = comment;
    console.log(this.root)
  }

  showPortfolio(res, pfId, getPortfolio) {
    console.log(res)
    const title = res.title;
    const content = res.content;
    const userId = res.user_id;
    const searchCount = res.search_count;
    const prev = res.previous_board_id;
    const next = res.next_board_id;

    let stockNameArr = [];
    let stockCountArr = [];
    let stockAmountArr = [];
    let stockPriceArr = []

    for (let i = 0; i < res.stock.length; i++) {
      stockNameArr.push(res.stock[i]["stock_name"]);
      stockCountArr.push(res.stock[i]["stock_count"]);
      stockAmountArr.push(res.stock[i]["stock_amount"]);
      stockPriceArr.push(stockCountArr[i] * stockAmountArr[i])
    }

    let portfolio_HTML = `<div class="view-all-container">
    <div class="view-button-content">
      <div role="button" class="btn prev-btn">
        <span class="btn-text">이전글</span>
      </div>
      <div role="button" class="btn next-btn">
        <span class="btn-text">다음글</span>
      </div>
      <a href="../template/portfolio-board.html" role="button" class="btn list-btn">
        <span id="btn-list" class="btn-text">목록</span>
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
          <span class="view-count">조회수: ${searchCount}</span>
        </div>
      </div>
      
      <div class="view-graph-content">
        <div class="view-graph">
          <canvas id="myChart" width="250" height="250"></canvas>
        </div>
        <div class="view-text">
          <span class="main-text-title">포트폴리오 세부사항</span><br>
          <a id="stock" class="main-text"></a></apan>
        </div>
      </div>
      <div class="write-main-text">
        <span>${content}</span>
      </div>
      <div class="comment-write">
        <div class="comment-inbox">
          <textarea class="comment-inbox-text" placeholder="댓글을 남겨보세요" cols="20" wrap="virtual" rows="3"
            maxlength="3000"></textarea>
        </div>
        <div class="register-box">
          <button class="btn-submit">등록</button>
        </div>
      </div>
      <div class="comment-print-box">
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

      stock.innerHTML += `${stockNameArr[i]} - ${stockCountArr[i]}주 - ${stockPriceArr[i].toLocaleString()}원<br>`;

    }



    // Chart JS
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: stockNameArr,
        datasets: [
          {
            label: "# of Votes",
            data: stockPriceArr,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(183, 255, 176, 0.2)",
              "rgba(255, 170, 192, 0.2)",
              "rgba(255, 248, 149, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(94, 199, 62, 1)",
              "rgba(255, 86, 131, 1)",
              "rgba(218, 206, 47, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    this.movePreviousPortfolio(prev);
    this.moveNextPortfolio(next)
  }

  movePreviousPortfolio(prev) {
    const previousBtn = document.querySelector(".prev-btn");
    previousBtn.addEventListener("click", () => {
      if (prev === null) {
        return alert("첫번째 페이지입니다.")
      } else location.href = `http://127.0.0.1:5503/frontend/main/template/write-view.html?board_id=` + prev;
    })
  }

  moveNextPortfolio(next) {
    const previousBtn = document.querySelector(".next-btn");
    previousBtn.addEventListener("click", () => {
      if (next === null) {
        return alert("마지막 페이지입니다.")
      } else location.href = `http://127.0.0.1:5503/frontend/main/template/write-view.html?board_id=` + next;
    })
  }

  submitComment(pfId) {
    const commentSubmitBtn = document.querySelector(".btn-submit");
    const commentArea = document.querySelector(".comment-inbox-text");
    const commentContent = commentArea.value;
    console.dir(commentArea)
    console.log(commentArea.value)
    this.comment.saveComment(commentContent, pfId);
    const comment = this.comment.comment;
    commentSubmitBtn.addEventListener("click", event => {
      API.postComment("http://192.168.1.32:8000/portfolio/comment/write/", comment)
        .then((res) => (res.json()))
        .then((res) => {
          console.log(res);
          console.log(res.user_id);
          this.printComment(res.user_id)
        })
        .catch((err) => {
          console.log(err);
        })

    })
  }

  printComment(userId) {
    const commentDiv = document.querySelector('.comment-print-box');
    const commentArea = document.querySelector(".comment-inbox-text");
    let comment = commentArea.value;
    console.log(comment)
    let html =
      `<div class="each-comment">
      <div class="each-comment-content">
        <div class="userId">${userId}</div>
        ${comment}
      </div>
    </div>`

    commentDiv.innerHTML += html;
  }
}

export default ShowPortfolioView;