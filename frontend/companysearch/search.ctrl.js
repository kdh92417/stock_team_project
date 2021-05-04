import API from "../api/api.js"

class SearchCtrl {
  constructor(service, view) {
    this.service = service;
    this.view = view;
    this.view.getSearchCompanyName(this.getCompanyName);
  }

  getCompanyName = () => {
    this.company = {};
    const save = this.company;
    const getName = this.view.searchInput.value;

    save.name = getName;
    this.sendSearchCompany(this.company);
  }

  sendSearchCompany(company) {
    API.get(`http://192.168.1.32:8000/company/search/?cp_name=${company.name}`)
      .then((res) => res.json())
      .then((res) => {
        this.service.getComanyData(res.corp_code);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 02101d1f9a35c1b17eea050c5099255a830db302
}

export default SearchCtrl;