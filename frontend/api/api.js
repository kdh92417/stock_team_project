import { sendRequest } from '../lib/ajax.js';
import SignupService from "../service/signup.service.js"


class API {
  // constructor() {
  //     this.signup = new SignupService();
  // }
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
    await fetch("http://192.168.1.32:8000/account/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => (res.json()))
      .then((res) => {
        // console.log(res);
        if (res.message === "success") {
          localStorage.setItem("token", res.access_token);
        }
        // localStorage.getItem("token")
      });
  }

  postSignup(signData) {
    console.log(signData);
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
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  callbackFunction() { //서버로부터 응답이 왔으므로 알맞은 작업을 수행 
    var xhr = new XMLHttpRequest();
    // xhr.response
    console.log(xhr);
    // if (xhr.readyState == 0) {
    //     //서버 응답 결과에 따라 알맞은 작업 처리 
    //     console.log(xhr.status)
    //     // location.href = "../view/login.html"
    // } else {
    //     alert("문제 발생:" + xhr.status);
    // }
  }

  // renderLogin() {

  // }
}
export default API;