import API from "../api/api.js"

class CompanyCtrl {
  constructor(service, view) {
    this.service = service;
    this.view = view;
    this.getCompanyNumber();
  }

  // functionName - getCompanyNumber
  // Job - locarStarage에 검색기업 통해 서버에서 전달받아 저장 된 기업명, 
  //       고유번호를 불러와 전자공시 api 및 view에 전달 
  // Input(args, params) - none 
  // Output(return) - none
  getCompanyNumber() {
    const cpName = localStorage.getItem("기업이름")
    let value = Object.values(JSON.parse(cpName));
    this.view.showCompanyInfo(value[0], value[2]);
    this.getComanyData(value[1])
    this.getUserLikeList(value[0]);
  }

  // functionName - getComanyData
  // Job - 전자공시 open api이용해서 기업 재무재표 불러옴
  // Input(args, params) - 기업이름
  // Output(return) - none
  getComanyData(data) {
    API.get(`https://opendart.fss.or.kr/api/fnlttSinglAcnt.json?crtfc_key=02101d1f9a35c1b17eea050c5099255a830db302&corp_code=${data}&bsns_year=2020&reprt_code=11011`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        if (res.status === "013") {
          alert("기업정보가 없습니다.")
          location.href = "../template/index.html"
        } else {
          this.service.getComprehensiveIncomeStatement(res.list[9], res.list[10], res.list[12]);
          this.service.getFinancialPosition(res.list[2], res.list[5], res.list[8])
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // functionName - getUserLikeList
  // Job - 유저가 좋아요 한 List 가져옴
  // Input(args, params) - 검색한 기업명 (searchWord)
  // Output(return) - none
  getUserLikeList(searchWord) {
    API.userInfoGet("http://192.168.1.32:8000/account/like/list/")
      .then((res) => res.json())
      .then((res) => {
        this.view.userLikeListView(res.like_company_list, searchWord);
        this.handleLikeBtn();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // functionName - handleLikeBtn
  // Job - view에서 좋아요 버튼을 누르면 view 보여지도록 callback 함수로 서비스 기능을 넘겨줌
  // Input(args, params) - none
  // Output(return) - none
  handleLikeBtn() {
    this.view.selectLikeBtn(this.service.clickLikeBtn);
  }
}

export default CompanyCtrl;