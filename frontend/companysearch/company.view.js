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
  }

  // functionName - userLikeListView
  // Job - 유저가 좋아요한 기업을 검색어랑 매칭하여 표시해줌
  // Input(args, params) - 좋아요기업명(companyName), 검색한기업명(searchWord)
  // Output(return) - none
  userLikeListView(companyName, searchName) {
    const token = localStorage.getItem("token"),
      btnContent = document.querySelector(".btn-content"),
      likeBtn = document.querySelector(".like-btn");
    if (!token) {
      btnContent.removeChild(likeBtn);
    } else {
      for (let i = 0; i < companyName.length; i++) {
        if (companyName[i] === searchName) {
          likeBtn.innerHTML = `<span id="full-icon"><i class="fas fa-thumbs-up"></i></span>
          <span id="count">Like</span>`
        }
      }
    }
  }

  // functionName - selectLikeBtn
  // Job - 좋아요 기능을 위한 화면에서 button select
  // Input(args, params) - callback
  // Output(return) - none
  selectLikeBtn(callback, likeCompany) {
    const likeBtn = document.querySelector(".like-btn"),
      companyName = document.querySelector(".company-name"),
      likeCount = document.querySelector(".like-count");
    callback(likeBtn, companyName, likeCount, likeCompany);
  }
}

export default CompanyView;