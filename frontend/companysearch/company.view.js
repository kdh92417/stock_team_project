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
}

export default CompanyView;