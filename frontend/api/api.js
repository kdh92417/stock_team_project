
//// import { sendRequest } from '../lib/ajax.js';

class API {
  constructor(value) {
    this.value = value;

  }

  // functionName - getLogin
  // Job - login view에서 입력된 유저 정보를 받아서 server로 전달
  // Input(args, params) - login user info
  // Output(return) - none
  async getLogin(loginData) {
    await fetch("http://192.168.1.32:8000/account/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => (res.json()))
      .then((res) => {
        console.log(res);
        if (res.status === 402) {
          this.value.loginCheckUser(res);
        } else if (res.status === 401) {
          this.value.loginCheckUser(res);
        } else if (res.message === "success") {
          localStorage.setItem("token", res.access_token);
          this.sendToken();
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // functionName - sendToken
  // Job - login할 때 전달받은 token을 다시 서버로 전송해서 인증하는 함수
  // Input(args, params) - userId
  // Output(return) - none
  async sendToken(userId) {
    await fetch("http://192.168.1.32:8000/account/user/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        userId = res.user_data.user_id;
        this.saveUserId(userId);
        location.href = "../template/index.html"

      })
      .catch((err) => {
        console.log(err);
      })
  }

  // functionName - saveUserId
  // Job - 회원의 아이디를 홈페이지에 적용시키기 위해 localStorage에 저장
  // Input(args, params) - userInfo
  // Output(return) - none
  saveUserId(userId) {
    localStorage.setItem("userId", userId)
  }


  // functionName - postSignup
  // Job - signup service에서 검증된 유저 정보를 전달 받아 서버에 등록
  // Input(args, params) - userInfo
  // Output(return) - none
  postSignup(signData) {
    fetch("http://192.168.1.32:8000/account/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(signData),
    })
      .then((res) => (res.json()))
      .then((res) => {
        console.log(res);
        if (res.message === "success") {
          location.href = "../template/login.html"
        } else if (res.message === "Aleady exists user") {
          alert("중복된 아이디입니다.")
        } else {
          alert("중복된 이메일입니다.")
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // functionName - loadUserInfo
  // Job - 로그인 시 서버에 토큰을 전달해서 회원정보를 받아옴
  // Input(args, params) - none
  // Output(return) - none
  static async loadUserInfo(url) {
    return await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
  }

  // functionName - put
  // Job - 마이페이지 수정용 api
  // Input(args, params) - url, payload
  // Output(return) - none
  static put(url, payload) {
    return fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        location.href = "../template/mypage.html"
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });;
  }

  // functionName - get
  // Job - 기업검색 및 전자공시 open api용
  // Input(args, params) - url
  // Output(return) - none
  static get(url) {
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // functionName - postPortfolio
  // Job - 포트폴리오 작성 완료 후 서버로 전송하는 api
  // Input(args, params) - 포트폴리오에 속한 데이터
  // Output(return) - none
  postPortfolio(portfolioData) {
    fetch("http://192.168.1.32:8000/portfolio/write/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(portfolioData),
    })
      .then((res) => (res.json()))
      .then((res) => {
        console.log(res);
        location.href = "../template/write-view.html" + `?board_id=${res.board_data.portfolio_id}`;

      })
      .catch((err) => {
        console.log(err);
      })
  }

  // functionName - getPortfolio
  // Job - 포트폴리오 id에 해당하는 포트폴리오를 가져오는 api
  // Input(args, params) - 포트폴리오 id
  // Output(return) - none
  static getPortfolio(url) {
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      
  }

  // functionName - getPortfolioList
  // Job - 포트폴리오 게시판 메인 페이지에 포트폴리오 리스트를 한페이지씩 가져오는 api
  // Input(args, params) - none
  // Output(return) - none
  static getPortfolioList(url) {
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  static getFilteredPortfolio(url) {
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      
  }
}
export default API;

// http://3.35.169.52:8000/