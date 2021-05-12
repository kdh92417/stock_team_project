import API from '../api/api.js'

class BoardPortfolioView {
  constructor() {
    this.root = document.querySelector(".portfolio-list-root");
    this.chartId = 0;
    this.page = 0;
  }

  showPortfolioList(res) {
    console.log(res);
    let portfolio_HTML = `<div class="portfolio-container">
      <div class="portfolio-content">
        <div class="portfolio-title">포트폴리오 게시판</div>
        <div class="portfolio-list-container">
          <div class="company-search">
            <select id="select-box">
              <option>기업명</option>
              <option>유저ID</option>
            </select>
            <input id="company-name" type="text" placeholder=""><button id="search-btn">검색</button>
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



    // Job - locarStarage bestMember가 있을 때 user를 검색해서 해당 유저 포트폴리오만 보여주고 없으면 게시글 전체를 보여줌
    if (localStorage.getItem("bestMember")) {
      const userSearchBtn = document.getElementById('search-btn'),
        userSearchInput = document.getElementById('company-name'),
        userSelectBox = document.getElementById("select-box"),
        userSelectedValue = userSelectBox.options[userSelectBox.selectedIndex],
        cpName = localStorage.getItem("bestMember");
      let value = Object.values(JSON.parse(cpName));
      userSelectedValue.innerHTML = '유저ID'
      userSearchInput.value = `${value[0]}`
      setTimeout(() => {
        userSearchBtn.click();
      }, 50);
      this.showfilteredPortfolio();
      window.addEventListener("mousedown", () => {
        localStorage.removeItem("bestMember");
      })
    } else {
      this.addPortfolio(list, res);
      this.showfilteredPortfolio();
    }
  }

  //포트폴리오 리스트를 띄워주는 함수
  addPortfolio(list, res) {
    this.drawList(res);
    this.showAjaxFirstPage()

  }

  showfilteredPortfolio() {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('company-name');

    searchBtn.addEventListener('click', event => {
      this.page = 1;
      event.preventDefault();
      const list = document.querySelector("#portfolio-list");
      list.innerHTML = '';

      const selectBox = document.getElementById("select-box")
      const selectedValue = selectBox.options[selectBox.selectedIndex].value;

      if (selectedValue === '기업명') {
        API.getFilteredPortfolio("http://192.168.1.32:8000/portfolio/list/?company_name=" + searchInput.value)
          .then((res) => (res.json()))
          .then((res) => {
            console.log(res);
            this.drawList(res.board_data);
          })
          .catch((err) => {
            console.log(err);
          })
      } else {
        API.getFilteredPortfolio("http://192.168.1.32:8000/portfolio/list/user/?user_id=" + searchInput.value)
          .then((res) => (res.json()))
          .then((res) => {
            console.log(res);
            this.drawList(res.board_data);
          })
          .catch((err) => {
            console.log(err);
          })
      }
    });
  }

  drawList(res) {
    const list = document.querySelector("#portfolio-list");
    let stockName = [];
    let stockCount = [];
    let stockAmount = [];
    let stockPrice = [];
    this.chartId = 0;

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
      this.chartId++;
      list.innerHTML += `<div class="card">
      <div class="card-item">
        <div class="card-thumbnail">
          <div><canvas id="myChart${i}" width="150" height="150"></canvas></div>
        </div>
        <div class="card-body">
          <a href="http://127.0.0.1:5503/frontend/main/template/write-view.html?board_id=${res[i]["pofol_id"]}">
          <div class="write-title">${res[i]["pofol_name"]} [${res[i]["comment_count"]}]</div><a>
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
  }

  showAjaxFirstPage() {
    // Ajax paging
    this.page = 1;
    let temp = false;

    $(window).scroll(function () {
      let scrollT = $(window).scrollTop();
      let scrollH = $(window).height();
      let contentH = $(document).height();

      if (scrollT + scrollH + 30 > contentH) {
        this.page++;
        this.fetchList();
      }
    }.bind(this));
  }

  fetchList() {

    const companyName = document.getElementById('company-name');
    let url = '';
    if (companyName.value === '') {
      url = "http://192.168.1.32:8000/portfolio/list/?page=" + this.page;
    } else url = "http://192.168.1.32:8000/portfolio/list/?company_name=" + companyName.value + "&page=" + this.page;


    $.ajax({
      url: url,
      type: "GET",
      dataType: "JSON",
      success: function (data) {
        this.drawPage(data);
      }.bind(this),
    });
  }


  drawPage(data) {
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
        console.log(i + this.chartId)
        let id = i + this.chartId;
        html = `<div class="card">
        <div class="card-item">
          <div class="card-thumbnail">
            <div><canvas id="myChart${id}" width="150" height="150"></canvas></div>
          </div>
          <div class="card-body">
            <a href="http://127.0.0.1:5503/frontend/main/template/write-view.html?board_id=${data.board_data[i]["pofol_id"]}">
            <div class="write-title">${data.board_data[i]["pofol_name"]} [${data.board_data[i]["comment_count"]}]</div></a>
            <div class="writer">
              <span class="nickname">${data.board_data[i]["user_id"]}</span>
            </div>
          </div>
        </div>
        </div>`;
        $("#portfolio-list").append(html);
      }

      for (let i = 0; i < data.board_data.length; i++) {
        let id = i + this.chartId;
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

      this.chartId = this.chartId + data.board_data.length;
    } else {
      // 더이상 조회할 데이터가 없을 시 temp를 true로 만들어 더이상의 ajax호출을 막음.
      temp = true;
    }
  }


}

export default BoardPortfolioView;
