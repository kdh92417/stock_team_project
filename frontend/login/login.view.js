class LoginView {
  constructor() {
    this.userId = document.getElementById('id');
    this.userPw = document.getElementById('pw');
    this.loginBtn = document.getElementById('btn');
  }

  login(callback) {
    this.loginBtn.addEventListener("click", event => {
      event.preventDefault();
      callback();
    })
  }
}


export default LoginView;