class CompanyView {
  constructor() {
    this.root = document.querySelector('.root');
  }

  // functionName - showMyInfo
  // Job - 로그인 된 회원정보를 controller에서 전달받아 화면에 보여줌
  // Input(args, params) - user_data
  // Output(return) - none
  showCompanyInfo(companyName, likeCount) {

    let companyInfo_HTML = `<div class="chart-container">
      <div class="company-name">${companyName}</div>
      <div class="like-content">
        <div class="like-item">
          <div class="like-count">좋아요 : ${likeCount}개</div>
          <div class="btn-content">
            <button class="like-btn">
              <span id="icon"><i class="far fa-thumbs-up"></i></span>
              <span id="count">Like</span>
            </button>
          </div>
        </div>
      </div>
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
    const token = localStorage.getItem("token"),
      clicked = localStorage.getItem("clicked");
    let value = Object.values(JSON.parse(clicked));
    if (!token) {
      const btnContent = document.querySelector(".btn-content"),
        likeBtn = document.querySelector(".like-btn");
      btnContent.removeChild(likeBtn);
    } else if (token && value[1] === true && value[0] === companyName) {
      let icon = document.querySelector("#icon");
      icon.innerHTML = `<i class="fas fa-thumbs-up"></i>`
    }
  }

  selectLikeBtn(callback) {
    const likeBtn = document.querySelector(".like-btn"),
      companyName = document.querySelector(".company-name"),
      likeCount = document.querySelector(".like-count");
    let icon = document.querySelector("#icon");
    callback(likeBtn, icon, companyName, likeCount);
  }
}

export default CompanyView;