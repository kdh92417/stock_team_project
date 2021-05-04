import API from "../api/api.js"
import CompanyView from "../companysearch/company.view.js"

class SearchService {
  sendSearchCompany(company) {
    API.get(`http://15.165.17.217:8000/company/search/?cp_name=${company.name}`)
      .then((res) => res.json())
      .then((res) => {
        location.href = "../template/company.html"
        const companyInfo = {};
        companyInfo.name = company.name;
        companyInfo.num = res.corp_code;
        localStorage.setItem("기업이름", JSON.stringify(companyInfo));
      })
      .catch((err) => {
        console.log(err);
      });
  }

}

export default SearchService;