import API from "../api/api.js"

class SearchService {
  getComanyData(data) {
    API.get(`https://opendart.fss.or.kr/api/fnlttSinglAcntAll.json?crtfc_key=02101d1f9a35c1b17eea050c5099255a830db302&corp_code=${data}&bsns_year=2020&reprt_code=11011`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        location.href = "../template/company.html"
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default SearchService;