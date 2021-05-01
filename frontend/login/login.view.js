class LoginView {

  // Job - login page input selector
  constructor() {
    this.userId = document.getElementById('id');
    this.userPw = document.getElementById('pw');
    this.loginBtn = document.getElementById('btn');
  }

  // functionName - login
  // Job - login botton click 시 callback 함수를 전달받아 login 진행
  // Input(args, params) - callback
  // Output(return) - none
  Userlogin(callback) {
    this.loginBtn.addEventListener("click", event => {
      event.preventDefault();
      callback();
    })
  }
}


export default LoginView;