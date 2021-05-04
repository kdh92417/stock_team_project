class SearchCtrl {
  constructor(view) {
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
    // console.log(company.name);
    this.get(`http://192.168.1.32:8000/company/search/?cp_name=${company.name}`)
      .then((res) => res.json())
      .then((res) => {
        this.getComanyData(res.corp_code);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getComanyData(data) {
    console.log(data);
    fetch(`https://opendart.fss.or.kr/api/fnlttSinglAcnt.json?crtfc_key=02101d1f9a35c1b17eea050c5099255a830db302&corp_code=00126380&bsns_year=2018&reprt_code=11011`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  get(url) {
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  // 02101d1f9a35c1b17eea050c5099255a830db302
}

export default SearchCtrl;