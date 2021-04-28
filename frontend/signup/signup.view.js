class SignupView {

  // Job - signup page input selector
  constructor() {
    this.id = document.querySelector('#input-id');
    this.pw = document.getElementById('input-pw');
    this.checkPw = document.getElementById('check-pw');
    this.name = document.getElementById('input-name');
    this.birth = document.getElementById('input-birth');
    this.phone = document.getElementById('input-phone');
    this.email = document.getElementById('input-email');
    this.submit = document.getElementById('submit-btn');
  }

  // functionName - signUp
  // Job - submit botton click 시 callback 함수를 전달받아 signup 진행
  // Input(args, params) - callback
  // Output(return) - none
  signUp(callback) {
    this.submit.addEventListener("click", event => {
      event.preventDefault();
      callback();
    })
  }

}


export default SignupView;