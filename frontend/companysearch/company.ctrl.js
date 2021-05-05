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
    this.view.showCompanyInfo(value[0]);
    this.getComanyData(value[1])
  }

  // functionName - getComanyData
  // Job - 전자공시 open api이용해서 기업 재무재표 불러옴
  // Input(args, params) - url
  // Output(return) - none
  getComanyData(data) {
    API.get(`https://opendart.fss.or.kr/api/fnlttSinglAcnt.json?crtfc_key=02101d1f9a35c1b17eea050c5099255a830db302&corp_code=${data}&bsns_year=2020&reprt_code=11011`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        this.service.getComprehensiveIncomeStatement(res.list[9], res.list[10], res.list[12]);
        this.service.getFinancialPosition(res.list[2], res.list[5], res.list[8])
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default CompanyCtrl;