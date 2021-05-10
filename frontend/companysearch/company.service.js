import API from "../api/api.js"

class CompanyService {

  // functionName - clickLikeBtn
  // Job - 좋아요 기능 동작 함수
  // Input(args, params) - likeBtn, company, likeCount
  // Output(return) - none
  clickLikeBtn = (likeBtn, company, likeCount) => {
    console.dir(likeBtn.children[0])
    likeBtn.addEventListener("click", () => {
      if (likeBtn.children[0].id === "full-icon") {
        likeBtn.innerHTML = `<span id="icon"><i class="far fa-thumbs-up"></i></span>
                              <span id="count">Like</span>`
        API.post("http://192.168.1.32:8000/account/like/company/", {
          cp_name: `${company.innerHTML}`
        })
          .then((res) => (res.json()))
          .then((res) => {
            console.log(res);
            likeCount.innerHTML = `좋아요 : ${res.total_like}개`
          })
          .catch((err) => {
            console.log(err);
          })
      } else {
        likeBtn.innerHTML = `<span id="full-icon"><i class="fas fa-thumbs-up"></i></span>
                              <span id="count">Like</span>`
        API.post("http://192.168.1.32:8000/account/like/company/", {
          cp_name: `${company.innerHTML}`
        })
          .then((res) => (res.json()))
          .then((res) => {
            console.log(res);
            likeCount.innerHTML = `좋아요 : ${res.total_like}개`
          })
          .catch((err) => {
            console.log(err);
          })
      }
    })
  }

  saveLikeCount(company, count) {
    const companyLike = {};
    companyLike.name = company.innerHTML;
    companyLike.count = true;
    localStorage.setItem("clicked", JSON.stringify(companyLike));
  }

  // functionName - getComprehensiveIncomeStatement
  // Job - 포괄손익계산서에 필요한 데이터를 받아서 가공 후 차트에 보내줌
  // Input(args, params) - 매출액, 영업이익, 당기순이익
  // Output(return) - none
  getComprehensiveIncomeStatement(sales_amount, operating_profit, net_income) {
    let saveSalesAmount = [];
    let saveOperatingPorfit = [];
    let saveNetIncome = [];
    let saveOperatingPorfitMargin = [];
    let saveNetIncomeMargin = [];

    saveSalesAmount.push(sales_amount.bfefrmtrm_amount.replace(/[^0-9]/g, ""))
    saveSalesAmount.push(sales_amount.frmtrm_amount.replace(/[^0-9]/g, ""))
    saveSalesAmount.push(sales_amount.thstrm_amount.replace(/[^0-9]/g, ""))
    saveOperatingPorfit.push(operating_profit.bfefrmtrm_amount.replace(/[^0-9]/g, ""))
    saveOperatingPorfit.push(operating_profit.frmtrm_amount.replace(/[^0-9]/g, ""))
    saveOperatingPorfit.push(operating_profit.thstrm_amount.replace(/[^0-9]/g, ""))
    saveNetIncome.push(net_income.bfefrmtrm_amount.replace(/[^0-9]/g, ""))
    saveNetIncome.push(net_income.frmtrm_amount.replace(/[^0-9]/g, ""))
    saveNetIncome.push(net_income.thstrm_amount.replace(/[^0-9]/g, ""))

    for (let i = 0; i < 3; i++) {
      saveOperatingPorfitMargin.push((saveOperatingPorfit[i] / saveSalesAmount[i] * 100).toFixed(2))
      saveNetIncomeMargin.push((saveNetIncome[i] / saveSalesAmount[i] * 100).toFixed(2))
    }

    this.firstChart(saveSalesAmount, saveOperatingPorfit, saveNetIncome, saveOperatingPorfitMargin, saveNetIncomeMargin)
  }

  // functionName - firstChart
  // Job - 포괄손익계산서에 필요한 데이터를 받아서 차트에 data삽입 후 차트 생성
  // Input(args, params) - 매출액, 영업이익, 당기순이익, 영업이익률, 순이익률
  // Output(return) - none
  firstChart(sales_amount, operating_profit, net_income, operating_profit_margin, net_income_margin) {
    let barChart = new Chart(document.getElementById('fi-chart-1'), {
      type: 'bar',
      data: {
        labels: [2018 + "/" + 12, 2019 + "/" + 12, 2020 + "/" + 12],
        datasets: [
          {
            label: "매출액",
            backgroundColor: "#74b9ff",
            data: sales_amount
          }, {
            label: "영업이익",
            backgroundColor: "#ff7675",
            data: operating_profit
          }, {
            label: "당기순이익",
            backgroundColor: "#ffeaa7",
            data: net_income
          }
        ]
      },
      options: {
        legend: {
          display: true,
          labels: {
            fontSize: 12,
            fontColor: "#FFFFFF"
          }
        },
        responsive: false,
        title: {
        },
        scales: {
          yAxes: [{
            ticks: {
              fontSize: 12,
              fontColor: "#FFFFFF",
              callback: function (value, index) {
                if (value.toString().length > 8) return (Math.floor(value / 100000000)).toLocaleString("ko-KR") + "억";
                else if (value.toString().length > 4) return (Math.floor(value / 10000)).toLocaleString("ko-KR") + "만";
                else return value.toLocaleString("ko-KR");
              }
            },
            gridLines: {
              color: "#a29bfe",
              lineWidth: 1
            }
          }],
          xAxes: [{
            ticks: {
              fontSize: 14,
              fontColor: "#FFFFFF",
              beginAtZero: true,
            },
            gridLines: {
              color: "#a29bfe",
              lineWidth: 1
            }
          }]
        }
      }
    });


    let lineChart = new Chart(document.getElementById("fi-chart-2"), {
      type: 'line',
      data: {
        labels: [2018 + "/" + 12, 2019 + "/" + 12, 2020 + "/" + 12],
        datasets: [{
          data: operating_profit_margin,
          label: "영업이익률",
          backgroundColor: '#ffeaa7',
          borderColor: "#ffeaa7",
          fill: false,
          lineTension: 0
        }, {
          data: net_income_margin,
          label: "순이익률",
          backgroundColor: '#81ecec',
          borderColor: "#81ecec",
          fill: false,
          lineTension: 0
        }]
      },
      options: {
        legend: {
          display: true,
          labels: {
            fontSize: 12,
            fontColor: "#FFFFFF"
          }
        },
        responsive: false,
        title: {
        },
        scales: {
          yAxes: [{
            ticks: {
              fontSize: 13,
              fontColor: "#FFFFFF",
              stepSize: 5,
              callback: function (value, index) {
                if (value.toString().length >= 0) return (Math.floor(value)).toLocaleString("ko-KR") + "%";
                else return value.toLocaleString("ko-KR");
              }
            },
            gridLines: {
              color: "#a29bfe",
              lineWidth: 1
            }
          }],
          xAxes: [{
            ticks: {
              fontSize: 12,
              fontColor: "#FFFFFF",
              beginAtZero: true,
            },
            gridLines: {
              color: "#a29bfe",
              lineWidth: 1
            }
          }]
        }
      }
    });
  }

  // functionName - getFinancialPosition
  // Job - 재무상태표에 필요한 데이터를 받아서 가공 후 차트에 보내줌
  // Input(args, params) - 자산총계, 부채총계, 자본총계
  // Output(return) - none
  getFinancialPosition(total_assets, total_debt, total_capital) {
    let saveTotalAssets = [];
    let saveTotalDebt = [];
    let saveTotalCapital = []
    let saveDebtRatio = [];

    saveTotalAssets.push(total_assets.bfefrmtrm_amount.replace(/[^0-9]/g, ""))
    saveTotalAssets.push(total_assets.frmtrm_amount.replace(/[^0-9]/g, ""))
    saveTotalAssets.push(total_assets.thstrm_amount.replace(/[^0-9]/g, ""))
    saveTotalDebt.push(total_debt.bfefrmtrm_amount.replace(/[^0-9]/g, ""))
    saveTotalDebt.push(total_debt.frmtrm_amount.replace(/[^0-9]/g, ""))
    saveTotalDebt.push(total_debt.thstrm_amount.replace(/[^0-9]/g, ""))
    saveTotalCapital.push(total_capital.bfefrmtrm_amount.replace(/[^0-9]/g, ""))
    saveTotalCapital.push(total_capital.frmtrm_amount.replace(/[^0-9]/g, ""))
    saveTotalCapital.push(total_capital.thstrm_amount.replace(/[^0-9]/g, ""))

    for (let i = 0; i < 3; i++) {
      saveDebtRatio.push((saveTotalDebt[i] / saveTotalCapital[i] * 100).toFixed(2))
    }
    this.secondChart(saveTotalAssets, saveTotalDebt, saveDebtRatio)
  }

  // functionName - secondChart
  // Job - 재무상태표에 필요한 데이터를 받아서 차트에 data삽입 후 차트 생성
  // Input(args, params) - 자산총계, 부채총계, 부채비율
  // Output(return) - none
  secondChart(total_assets, total_debt, debt_ratio) {
    let barChart = new Chart(document.getElementById('fi-chart-3'), {
      type: 'bar',
      data: {
        labels: [2018 + "/" + 12, 2019 + "/" + 12, 2020 + "/" + 12],
        datasets: [{
          label: "자산총계",
          backgroundColor: "#74b9ff",
          data: total_assets
        }, {
          label: "부채총계",
          backgroundColor: "#ff7675",
          data: total_debt
        }]
      },
      options: {
        legend: {
          display: true,
          labels: {
            fontSize: 12,
            fontColor: "#FFFFFF"
          }
        },
        responsive: false,
        title: {
        },
        scales: {
          yAxes: [{
            ticks: {
              fontSize: 13,
              fontColor: "#FFFFFF",
              callback: function (value, index) {
                if (value.toString().length > 8) return (Math.floor(value / 100000000)).toLocaleString("ko-KR") + "억";
                else if (value.toString().length > 4) return (Math.floor(value / 10000)).toLocaleString("ko-KR") + "만";
                else return value.toLocaleString("ko-KR");
              }
            },
            gridLines: {
              color: "#a29bfe",
              lineWidth: 1
            }
          }],
          xAxes: [{
            ticks: {
              fontSize: 12,
              fontColor: "#FFFFFF",
              beginAtZero: true,
            },
            gridLines: {
              color: "#a29bfe",
              lineWidth: 1
            }
          }]
        }
      }
    });


    let lineChart = new Chart(document.getElementById("fi-chart-4"), {
      type: 'line',
      data: {
        labels: [2018 + "/" + 12, 2019 + "/" + 12, 2020 + "/" + 12],
        datasets: [{
          data: debt_ratio,
          label: "부채비율",
          backgroundColor: '#ffeaa7',
          borderColor: "#ffeaa7",
          fill: false,
          lineTension: 0
        }]
      },
      options: {
        legend: {
          display: true,
          labels: {
            fontSize: 12,
            fontColor: "#FFFFFF"
          }
        },
        responsive: false,
        title: {
        },
        scales: {
          yAxes: [{
            ticks: {
              fontSize: 13,
              fontColor: "#FFFFFF",
              callback: function (value, index) {
                if (value.toString().length >= 0) return (Math.floor(value)).toLocaleString("ko-KR") + "%";
                else return value.toLocaleString("ko-KR");
              }
            },
            gridLines: {
              color: "#a29bfe",
              lineWidth: 1
            }
          }],
          xAxes: [{
            ticks: {
              fontSize: 14,
              fontColor: "#FFFFFF",
              beginAtZero: true,
            },
            gridLines: {
              color: "#a29bfe",
              lineWidth: 1
            }
          }]
        }
      }
    });
  }
}

export default CompanyService;