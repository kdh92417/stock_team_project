import { sendRequest } from '../lib/ajax.js';
import SignupService from "../service/signup.service.js"


class API {
  // constructor() {
  //     this.signup = new SignupService();
  // }
  getInfo() {
    fetch("http://3.35.169.52:8000/account/signup/", {
      method: "GET",
    })
      .then(res => {
        if (res.status === 200) {
          location.href = "/login";
        } else {
          alert(res.msg);
        }
      })
  }
  getLogin(loginData) {
    console.log(loginData);
    // const req = {
    //   user_id: signData.user_id,
    //   password: signData.password,
    //   user_name: signData.user_name,
    //   birth_date: signData.birth_date,
    //   phone_number: signData.phone_number
    // };
    // console.log(req)
    fetch("http://3.35.169.52:8000/account/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => (console.log(res)));
    // console.log("실행")
    // let url = '/asd';
    // let response = sendRequest('GET', url);

    // return response;
  }

  postSignup(signData) {
    console.log(signData);
    // const req = {
    //   user_id: signData.user_id,
    //   password: signData.password,
    //   user_name: signData.user_name,
    //   birth_date: signData.birth_date,
    //   phone_number: signData.phone_number
    // };
    // console.log(req)
    fetch("http://3.35.169.52:8000/account/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(signData),
    })
      .then((res) => (res.text()))
      .then((console.log))
      ;
    // console.log(signData);
    // var xhr = new XMLHttpRequest();
    // console.log(xhr);
    // xhr.onreadystatechange = () => {
    //   if (xhr.status == 200) {
    //     //서버 응답 결과에 따라 알맞은 작업 처리 
    //     console.log(xhr.status)
    //     location.href = "../template/login.html"
    //   } else {
    //     alert("문제 발생:" + xhr.status);
    //   }
    // }
    // xhr.open('POST', 'http://3.35.169.52:8000/account/signup/');
    // xhr.setRequestHeader('Content-type', "application/json");
    // xhr.send(JSON.stringify(signData));

    // xhr.addEventListener('load', () => {
    //   console.log(JSON.stringify(signData));
    // })
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