class CompanyView {
  constructor() {
    this.viewChart()
  }

  viewChart() {
    console.log("연결")
    // new Chart(document.getElementById('myChart'), {
    //   data: {
    //     datasets: [{
    //       type: 'line',
    //       label: '시간당 요청개수',
    //       data: [10, 20, 30, 40],
    //       backgroundColor: '#0064FF',
    //       fill: false, // line의 아래쪽을 색칠할 것인가? 
    //       borderColor: '#0064FF',
    //       borderWidth: 2
    //     }, {
    //       type: 'bar',
    //       label: 'Bar Dataset',
    //       data: [100, 100, 100, 100],
    //       backgroundColor: '#0064FF',
    //       fill: false, // line의 아래쪽을 색칠할 것인가? 
    //       borderColor: '#0064FF',
    //       borderWidth: 2
    //     }],
    //     labels: ['January', 'February', 'March', 'April']
    //   },
    //   options: {
    //     legend: {
    //       display: true,
    //       labels: {
    //         fontSize: 18
    //       }
    //     },
    //     responsive: false,
    //     scales: {
    //       yAxes: [{
    //         ticks: {
    //           fontSize: 15,
    //           beginAtZero: false,
    //           stepSize: 25,
    //           max: 600,
    //           min: 0,
    //           lineWidth: 2
    //         }
    //       }],
    //       xAxes: [{
    //         ticks: {
    //           fontSize: 16
    //         },
    //         gridLines: {
    //           lineWidth: 2
    //         }
    //       }]
    //     }
    //   }
    // });

    let barChart = new Chart(document.getElementById('fi-chart-1'), {
      type: 'bar',
      data: {
        labels: ["1900", "1950", "1999", "2050"],
        datasets: [
          {
            label: "Africa",
            backgroundColor: "#3e95cd",
            data: [133, 221, 783, 2478]
          }, {
            label: "Europe",
            backgroundColor: "#8e5ea2",
            data: [408, 547, 675, 734]
          }
        ]
      },
      options: {
        responsive: false,
        title: {
          display: true,
          text: 'Population growth (millions)'
        }
      }
    });


    let lineChart = new Chart(document.getElementById("fi-chart-2"), {
      type: 'line',
      data: {
        labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
        datasets: [{
          data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
          label: "Africa",
          borderColor: "#3e95cd",
          fill: false
        }, {
          data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
          label: "Asia",
          borderColor: "#8e5ea2",
          fill: false
        }, {
          data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
          label: "Europe",
          borderColor: "#3cba9f",
          fill: false
        }, {
          data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
          label: "Latin America",
          borderColor: "#e8c3b9",
          fill: false
        }, {
          data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
          label: "North America",
          borderColor: "#c45850",
          fill: false
        }
        ]
      },
      options: {
        responsive: false,
        title: {
          display: true,
          text: 'World population per region (in millions)'
        }
      }
    });

  }
}

export default CompanyView;