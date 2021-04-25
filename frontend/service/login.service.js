import API from '../api/api.js'

class LoginService {
  constructor(user) {
    this.user = user
    this.api = new API();
    console.log(this.user)
  }

  //로그인 함수
  loginCheckUser(value) {
    console.log(value);
    // const user = this.user;
    // if (user.id.includes(value.id) && user.pw[user.id.indexOf(value.id)] === value.pw) {
    //   console.log("올바른 사용자")
    //   this.renderMain();
    // } else console.log("아이디 또는 비밀번호를 확인해주세요.")
    this.api.getLogin(vlaue)
  }

  renderMain() {
    location.href = "../view/index.html"
  }


}

export default LoginService;