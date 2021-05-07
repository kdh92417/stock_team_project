import API from '../api/api.js'

class BoardPortfolioView {
  constructor() {
    this.root = document.querySelector(".portfolio-list-root");
  }

  showPortfolioList(res) {
    console.log(res);
    let portfolio_HTML = `<div class="portfolio-container">
      <div class="portfolio-content">
        <div class="portfolio-title">포트폴리오 게시판</div>
        <div class="portfolio-list-container">
          <div class="company-search">
            <input id="company-name" type="text" placeholder="기업명 검색"><button id="search-btn">검색</button>
          </div>
          <div class="portfolio-write">
            <button><a href="../../main/template/write-board.html">글쓰기</a></button>
          </div>
          <div id="portfolio-list">
          </div>
        </div>
      </div>
    </div>`;

    this.root.insertAdjacentHTML("afterend", portfolio_HTML);

    const list = document.querySelector("#portfolio-list");

    this.addPortfolio(list, res);
    

    // this.showFilteredPortfolio(res)
  }

  //포트폴리오 리스트를 띄워주는 함수
  addPortfolio(list, res) {
    let stockName = [];
    let stockCount = [];
    let stockAmount = [];
    let stockPrice = [];
    let chartId = 0;

    console.log(res)

    for (let i = 0; i < res.length; i++) {
      let stockNameList = [];
      let stockCountList = [];
      let stockAmountList = [];
      let stockPriceList = [];

      for (let j = 0; j < res[i]["stock"].length; j++) {
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
      chartId++;
      list.innerHTML += `<div class="card">
      <div class="card-item">
        <div class="card-thumbnail">
          <div><canvas id="myChart${i}" width="150" height="150"></canvas></div>
        </div>
        <div class="card-body">
          <a href="http://127.0.0.1:5503/frontend/main/template/write-view.html?board_id=${res[i]["pofol_id"]}">
          <div class="write-title">${res[i]["pofol_name"]}</div><a>
          <div class="writer">
            <span class="nickname">${res[i]["user_id"]}</span>
          </div>
        </div>
      </div>
      </div>`;
    }

    for (let i = 0; i < res.length; i++) {
      // Chart JS
      let ctx = document.getElementById("myChart" + i);
      let myChart = new Chart(ctx, {
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
          legend: {
            display: false,
          },

          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
    this.showAjaxFirstPage(chartId)
  }

  //필터링된 데이터의 카드와 차트를 만들어주는 함수
  addFilteredPortfolio(list, res, companyName) {
    let stockName = [];
    let stockCount = [];
    let stockAmount = [];
    let stockPrice = [];
    let chartId = 0;

    console.log(res)

    for (let i = 0; i < res.length; i++) {
      let stockNameList = [];
      let stockCountList = [];
      let stockAmountList = [];
      let stockPriceList = [];

      for (let j = 0; j < res[i]["stock"].length; j++) {
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
      chartId++;
      list.innerHTML += `<div class="card">
      <div class="card-item">
        <div class="card-thumbnail">
          <div><canvas id="myChart${i}" width="150" height="150"></canvas></div>
        </div>
        <div class="card-body">
          <a href="http://127.0.0.1:5503/frontend/main/template/write-view.html?board_id=${res[i]["pofol_id"]}">
          <div class="write-title">${res[i]["pofol_name"]}</div><a>
          <div class="writer">
            <span class="nickname">${res[i]["user_id"]}</span>
          </div>
        </div>
      </div>
      </div>`;
    }

    for (let i = 0; i < res.length; i++) {
      // Chart JS
      let ctx = document.getElementById("myChart" + i);
      let myChart = new Chart(ctx, {
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
          legend: {
            display: false,
          },

          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
    this.showAjaxFilteredPage(chartId, companyName)
  }

  showAjaxFirstPage(chartId) {
    // Ajax paging
    let page = -1;
    let temp = false;
        
    $(document).ready(function () {
      $(window).scroll(function () {
        let scrollT = $(this).scrollTop();
        let scrollH = $(this).height();
        let contentH = $(document).height();

        if (scrollT + scrollH + 30 > contentH) {
          page++;
          fetchList();
        }
      });
      fetchList();
    });

    function fetchList() {
      $.ajax({
        url: "http://192.168.1.32:8000/portfolio/list/?page=" + page,
        type: "GET",
        dataType: "JSON",
        success: function (data) {
          let stockNameScroll = [];
          let stockCountScroll = [];
          let stockAmountScroll = [];
          let stockPriceScroll = [];
          for (let i = 0; i < data.board_data.length; i++) {
            let stockNameList = [];
            let stockCountList = [];
            let stockAmountList = [];
            let stockPriceList = [];
      
            for (let j = 0; j < data.board_data[i]["stock"].length; j++) {
              stockNameList.push(data.board_data[i]["stock"][j]["stock_name"]);
              stockCountList.push(data.board_data[i]["stock"][j]["stock_count"]);
              stockAmountList.push(data.board_data[i]["stock"][j]["stock_amount"]);
              stockPriceList.push(stockCountList[j] * stockAmountList[j]);
            }
            stockNameScroll.push(stockNameList);
            stockCountScroll.push(stockCountList);
            stockAmountScroll.push(stockAmountList);
            stockPriceScroll.push(stockPriceList);
          }

          if (data.board_data.length > 0) {
            console.log(data.board_data);
            let html = "";
            
              console.log("start")
              for (let i = 0; i < data.board_data.length; i++) {
                console.log(i+chartId)
                let id = i + chartId;
                html = `<div class="card">
              <div class="card-item">
                <div class="card-thumbnail">
                  <div><canvas id="myChart${id}" width="150" height="150"></canvas></div>
                </div>
                <div class="card-body">
                  <a href="http://127.0.0.1:5503/frontend/main/template/write-view.html?board_id=${data.board_data[i]["pofol_id"]}">
                  <div class="write-title">${data.board_data[i]["pofol_name"]}</div></a>
                  <div class="writer">
                    <span class="nickname">${data.board_data[i]["user_id"]}</span>
                  </div>
                </div>
              </div>
              </div>`;
              $("#portfolio-list").append(html);
              }

              for (let i = 0; i < data.board_data.length; i++) {
                let id = i + chartId;
                let ctx = document.getElementById("myChart" + id);
                let myChart = new Chart(ctx, {
                  type: "pie",
                  data: {
                    labels: stockNameScroll[i],
                    datasets: [
                      {
                        data: stockPriceScroll[i],
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
                    legend: {
                      display: false,
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  },
                });
              }

            // $("#portfolio-list").append(html);
            chartId = chartId + data.board_data.length;
          } else {
            // 더이상 조회할 데이터가 없을 시 temp를 true로 만들어 더이상의 ajax호출을 막음.
            temp = true;
          }
        },
      });
    }
  }

  //검색 버튼 클릭시 필터링 된 포트폴리오를 띄워주는 함수를 호출
  showFilteredPortfolio(res) {
    const searchBtn = document.getElementById('search-btn');
    const companyName = document.getElementById('company-name');
    // const companyName = companyNameInput.value
    // console.log(companyName)

    
    searchBtn.addEventListener('click', event => {
      event.preventDefault();

      API.getFilteredPortfolio("http://192.168.1.32:8000/portfolio/list/?company_name=" + companyName.value)
      .then((res) => (res.json()))
      .then((res) => {
        console.log(res);
        this.addFilteredData(res, companyName.value);
        // this.value.showFilteredPortfolio(res.board_data);
      })
      .catch((err) => {
        console.log(err);
      })

    })
  }
  
  // 기존 내용을 비우고 필터링된 내용을 추가해주는 함수
  addFilteredData(res, companyName) {
    const list = document.querySelector("#portfolio-list");
    list.innerHTML = '';
    this.addFilteredPortfolio(list, res, companyName)
  }

  // 필터링된 페이지를 요청하는 ajax와 그 데이터의 차트를 가진 함수
  showAjaxFilteredPage(chartId, companyName) {
    // Ajax paging
    let page = 1;
    let temp = false;
        
    $(document).ready(function () {
      $(window).scroll(function () {
        let scrollT = $(this).scrollTop();
        let scrollH = $(this).height();
        let contentH = $(document).height();

        if (scrollT + scrollH + 30 > contentH) {
          page++;
          fetchList();
        }
      });
      fetchList();
    });

    function fetchList() {
      $.ajax({
        url: "http://192.168.1.32:8000/portfolio/list/?company_name=" + companyName + "&page=" + page,
        type: "GET",
        dataType: "JSON",
        success: function (data) {
          let stockNameScroll = [];
          let stockCountScroll = [];
          let stockAmountScroll = [];
          let stockPriceScroll = [];
          for (let i = 0; i < data.board_data.length; i++) {
            let stockNameList = [];
            let stockCountList = [];
            let stockAmountList = [];
            let stockPriceList = [];
      
            for (let j = 0; j < data.board_data[i]["stock"].length; j++) {
              stockNameList.push(data.board_data[i]["stock"][j]["stock_name"]);
              stockCountList.push(data.board_data[i]["stock"][j]["stock_count"]);
              stockAmountList.push(data.board_data[i]["stock"][j]["stock_amount"]);
              stockPriceList.push(stockCountList[j] * stockAmountList[j]);
            }
            stockNameScroll.push(stockNameList);
            stockCountScroll.push(stockCountList);
            stockAmountScroll.push(stockAmountList);
            stockPriceScroll.push(stockPriceList);
          }

          if (data.board_data.length > 0) {
            console.log(data.board_data);
            let html = "";
            
              console.log("start")
              for (let i = 0; i < data.board_data.length; i++) {
                console.log(i+chartId)
                let id = i + chartId;
                html = `<div class="card">
              <div class="card-item">
                <div class="card-thumbnail">
                  <div><canvas id="myChart${id}" width="150" height="150"></canvas></div>
                </div>
                <div class="card-body">
                  <a href="http://127.0.0.1:5503/frontend/main/template/write-view.html?board_id=${data.board_data[i]["pofol_id"]}">
                  <div class="write-title">${data.board_data[i]["pofol_name"]}</div></a>
                  <div class="writer">
                    <span class="nickname">${data.board_data[i]["user_id"]}</span>
                  </div>
                </div>
              </div>
              </div>`;
              $("#portfolio-list").append(html);
              }

              for (let i = 0; i < data.board_data.length; i++) {
                let id = i + chartId;
                let ctx = document.getElementById("myChart" + id);
                let myChart = new Chart(ctx, {
                  type: "pie",
                  data: {
                    labels: stockNameScroll[i],
                    datasets: [
                      {
                        data: stockPriceScroll[i],
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
                    legend: {
                      display: false,
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  },
                });
              }

            // $("#portfolio-list").append(html);
            chartId = chartId + data.board_data.length;
          } else {
            // 더이상 조회할 데이터가 없을 시 temp를 true로 만들어 더이상의 ajax호출을 막음.
            temp = true;
          }
        },
      });
      
  }
  
}
}

export default BoardPortfolioView;
