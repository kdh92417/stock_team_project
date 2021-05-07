import API from "../api/api.js"
import CompanyView from "../companysearch/company.view.js"

class SearchService {
  sendSearchCompany(company) {
    API.get(`http://192.168.1.32:8000/company/search/?cp_name=${company.name}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        if (res.status === 400) {
          alert("검색한 기업이 존재하지 않습니다. 기업명을 확인해 주세요");
        } else {
          location.href = "../template/company.html"
          const companyInfo = {};
          companyInfo.name = company.name;
          companyInfo.code = res.corp_code;
          companyInfo.like_count = res.like_count;
          localStorage.setItem("기업이름", JSON.stringify(companyInfo));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

}

export default SearchService;