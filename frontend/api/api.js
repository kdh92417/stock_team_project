// import { sendRequest } from '../lib/ajax.js';
import LoginUser from "../mypage/myinfo.model.js"
import MyInfoController from "../mypage/myinfo.ctrl.js"
import MyInfoView from "../mypage/myinfo.view.js"
import MyInfoService from "../mypage/myinfo.service.js"


class API {
  constructor(value) {
    this.value = value;

  }

  // functionName - getLogin
  // Job - login view에서 입력된 유저 정보를 받아서 server로 전달
  // Input(args, params) - login user info
  // Output(return) - none
  async getLogin(loginData) {
    await fetch("http://15.165.17.217:8000/account/login/", {
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
    await fetch("http://15.165.17.217:8000/account/user/", {
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
    fetch("http://3.36.120.133:8000/account/signup/", {
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
  static async loadUserInfo() {
    await fetch("http://3.36.120.133:8000/account/user/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // const loginUser = new LoginUser(new MyInfoController(new MyInfoService(), new MyInfoView()));
        // LoginUser에 user_data전달
        loginUser.sendUserData(res.user_data);
      })
      .catch((err) => {
        console.log(err);
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
        const api = new API();

        api.loadUserInfo();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  postPortfolio(portfolioData) {
    fetch("http://15.165.17.217:8000/portfolio/write/", {
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

  getPortfolio(pfId) {
    fetch("http://15.165.17.217:8000/portfolio/write/"+`?board_id=${pfId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => (res.json()))
      .then((res) => {
        console.log(res);
        this.value.showPortfolio(res.board_data);

      })
      .catch((err) => {
        console.log(err);
      })
  }

  getPortfolioList() {
    fetch("http://15.165.17.217:8000/portfolio/list/?page=1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => (res.json()))
      .then((res) => {
        console.log(res);
        this.value.showPortfolioList(res.board_data);
      })
      .catch((err) => {
        console.log(err);
      })
  }
}
export default API;


// http://3.35.169.52:8000/