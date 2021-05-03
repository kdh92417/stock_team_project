class CompanyView {
  constructor() {
    this.viewChart()
  }

  viewChart() {
    console.log("연결")
    let ctx = document.getElementById('myChart');
    // let mixedChart = new Chart(ctx, {
    //   type: 'bar',
    //   data: {
    //     datasets: [{
    //       label: 'Bar Dataset',
    //       data: [10, 20, 30, 40],
    //       // this dataset is drawn below
    //       order: 2
    //     }, {
    //       label: 'Line Dataset',
    //       data: [10, 10, 10, 10],
    //       type: 'line',
    //       // this dataset is drawn on top
    //       order: 1
    //     }],
    //     labels: ['January', 'February', 'March', 'April']
    //   },
    //   options: options
    // });
    let mixedChart = new Chart(ctx, {
      data: {
        datasets: [{
          type: 'line',
          label: '시간당 요청개수',
          data: [10, 20, 30, 40],
          backgroundColor: '#0064FF',
          fill: false, // line의 아래쪽을 색칠할 것인가? 
          borderColor: '#0064FF',
          borderWidth: 2
        }, {
          type: 'bar',
          label: 'Bar Dataset',
          data: [10, 20, 30, 40]
        }],
        labels: ['January', 'February', 'March', 'April']
      },
      options: {
        legend: {
          display: false,
          labels: {
            fontSize: 18
          }
        },
        responsive: false,
        scales: {
          yAxes: [{
            ticks: {
              fontSize: 15,
              beginAtZero: false,
              stepSize: 25,
              max: 600,
              min: 0,
              lineWidth: 2
            }
          }],
          xAxes: [{
            ticks: {
              fontSize: 16
            },
            gridLines: {
              lineWidth: 2
            }
          }]
        }
      }
    });
  }
}

export default CompanyView;