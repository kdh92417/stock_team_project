// import { sendRequest } from '../lib/ajax.js';

class API {
  constructor(myinfo) {
    this.myinfo = myinfo
  }

  async getLogin(loginData) {
    console.log(loginData);
    await fetch("http://3.35.169.52:8000/account/login/", {
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

  saveUser(userId) {
    localStorage.setItem("userId", userId)
  }

  async sendToken(userId) {
    await fetch("http://3.35.169.52:8000/account/user/", {
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
        this.saveUser(userId);
        location.href = "../main/template/index.html"
      })
      .catch((err) => {
        console.log(err);
      })
  }


  // functionName - postSignup
  // Job - signup service에서 검증된 유저 정보를 전달 받아 서버에 등록
  // Input(args, params) - userInfo
  // Output(return) - none
  postSignup(signData) {
    fetch("http://3.35.169.52:8000/account/signup/", {
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
          location.href = "../main/template/login.html"
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
    await fetch("http://3.35.169.52:8000/account/user/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.myinfo.showMyInfo(res.user_data);
      })
      .catch((err) => {
        console.log(err);
      })
  }
}
export default API;