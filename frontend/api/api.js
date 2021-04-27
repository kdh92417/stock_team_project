import { sendRequest } from '../lib/ajax.js';

class API {
  constructor() {
    // this.myinfo = myinfo
    // console.log(this.myinfo);
  }
  // async getInfo() {
  //   await fetch("http://192.168.1.32:8000/account/signup/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: localStorage.getItem("token"),
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log(res);
  //     })
  // }
  async getLogin(loginData) {
    console.log(loginData);
    await fetch("http://3.35.169.52:8000/account/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: localStorage.getItem("token"),
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
        // localStorage.getItem("token")
      });
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
        location.href = "../template/index.html"
      })
  }


  postSignup(signData) {
    console.log(signData);
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

  loadUserInfo() {
    fetch("http://3.35.169.52:8000/account/user/", {
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
  }
}
export default API;