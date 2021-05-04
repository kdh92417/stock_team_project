

class CompanyView {
  constructor() {
    this.root = document.querySelector('.root');
  }

  // functionName - showMyInfo
  // Job - 로그인 된 회원정보를 controller에서 전달받아 화면에 보여줌
  // Input(args, params) - user_data
  // Output(return) - none
  showCompanyInfo(companyName) {

    let companyInfo_HTML = `<div class="chart-container">
    <div class="company-name">${companyName}</div>
    <div class="financial-items">
      <div class="chart-title">포괄손익계산서</div>
      <div class="chart-item">
        <canvas id="fi-chart-1" style="height:40vh; width:40vw"></canvas>
        <canvas id="fi-chart-2" style="height:40vh; width:40vw"></canvas>
      </div>
    </div>
    <div class="financial-items">
      <div class="chart-title">재무상태표</div>
      <div class="chart-item">
        <canvas id="fi-chart-3" style="height:40vh; width:40vw"></canvas>
        <canvas id="fi-chart-4" style="height:40vh; width:40vw"></canvas>
      </div>
    </div>
  </div>`

    this.root.insertAdjacentHTML('afterend', companyInfo_HTML);
  }

  upViewChart(res) {
    console.log(res);
    let barChart = new Chart(document.getElementById('fi-chart-1'), {
      type: 'bar',
      data: {
        labels: [2018 + "/" + 12, 2019 + "/" + 12, 2020 + "/" + 12],
        datasets: [
          {
            label: "매출액",
            backgroundColor: "#74b9ff",
            data: [243771415000000, 230400881000000, 236806988000000]
          }, {
            label: "영업이익",
            backgroundColor: "#ff7675",
            data: [58886669000000, 27768509000000, 35993876000000]
          }, {
            label: "당기순이익",
            backgroundColor: "#ffeaa7",
            data: [44344857000000, 21738865000000, 26407832000000]
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
          data: [20.16, 12.05, 15.20],
          label: "영업이익률",
          backgroundColor: '#ffeaa7',
          borderColor: "#ffeaa7",
          fill: false,
          lineTension: 0
        }, {
          data: [18.19, 9.44, 11.15],
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

  bottomViewChart() {
    console.log("연결")
    let barChart = new Chart(document.getElementById('fi-chart-3'), {
      type: 'bar',
      data: {
        labels: [2018 + "/" + 12, 2019 + "/" + 12, 2020 + "/" + 12],
        datasets: [{
          label: "자산총계",
          backgroundColor: "#74b9ff",
          data: [339357244000000, 352564497000000, 378235718000000]
        }, {
          label: "부채총계",
          backgroundColor: "#ff7675",
          data: [46033232000000, 38310673000000, 46347703000000]
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
          data: [36.97, 34.12, 37.07],
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

export default CompanyView;