class BoardPortfolioView {
  constructor() {
    this.root = document.querySelector('.portfolio-list-root');
  }

  showPortfolioList(res) {
    console.log(res);
    let portfolio_HTML = 
    `<div class="portfolio-container">
      <div class="portfolio-content">
        <div class="portfolio-title">포트폴리오 게시판</div>
        <div class="portfolio-list-container">
          <div class="company-search">
            <input type="text" placeholder="기업명 검색"><button>검색</button>
          </div>
          <div class="portfolio-write">
            <button><a href="../../main/template/write-board.html">글쓰기</a></button>
          </div>
          <div class="portfolio-list">
          </div>
        </div>
      </div>
    </div>`;
  

  this.root.insertAdjacentHTML('afterend', portfolio_HTML);

  const list = document.querySelector(".portfolio-list");

  let stockName = [];
  let stockCount = [];
  let stockAmount = [];
  let stockPrice = []

  for (let i = 0; i < res.length; i++){
    let stockNameList = [];
    let stockCountList = [];
    let stockAmountList = [];
    let stockPriceList = [];
    
    for (let j = 0; j < res[i]["stock"].length; j++){
      stockNameList.push(res[i]["stock"][j]["stock_name"]);
      stockCountList.push(res[i]["stock"][j]["stock_count"]);
      stockAmountList.push(res[i]["stock"][j]["stock_amount"]);
      stockPriceList.push(stockCountList[j] * stockAmountList[j]);
    }
    stockName.push(stockNameList);
    stockCount.push(stockCountList);
    stockAmount.push(stockAmountList);
    stockPrice.push(stockPriceList);
    
  }

  console.log(stockName);
  console.log(stockPrice);

    
  for (let i = 0; i < res.length; i++) {
    list.innerHTML += 
    `<div class="card-item">
      <div class="card-thumbnail">
        <div><canvas class="myChart" width="200" height="200"></canvas></div>
      </div>
      <div class="card-body">
        <a href="http://127.0.0.1:5503/frontend/main/template/write-view.html?board_id=${res[i]["pofol_id"]}">
        <div class="write-title">${res[i]["pofol_name"]}</div><a>
        <div class="writer">
          <img src="" alt="">
          <span class="nickname">${res[i]["user_id"]}</span>
        </div>
      </div>
    </div>`

    // Chart JS
    var ctx = document.querySelectorAll('.myChart')[i];
    var myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: stockName[i],
        datasets: [
          {
            data: stockPrice[i],
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
  }
}
}

export default BoardPortfolioView;