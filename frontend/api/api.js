// import { sendRequest } from '../lib/ajax.js';

class API {
  constructor(myInfo, loginInfo) {
    this.myInfo = myInfo
    this.loginInfo = loginInfo
    console.log(this.myInfo, this.loginInfo);
  }

  // functionName - getLogin
  // Job - signup view에서 입력된 유저 정보를 저장해서 service에 전달 / service에 checkUser 호출
  // Input(args, params) - none
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
        if (res.message === "success") {
          localStorage.setItem("token", res.access_token);
          this.sendToken();
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

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
        console.log(userId);
        this.saveUserId(userId);
        location.href = "../template/index.html"
      })
      .catch((err) => {
        console.log(err);
      })
  }

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

  async loadUserInfo() {
    await fetch("http://192.168.1.32:8000/account/user/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.myInfo.showMyInfo(res.user_data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

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
      })
      .catch((err) => {
        console.log(err);
      })
  }
}
export default API;


// http://3.35.169.52:8000/