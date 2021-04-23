class SignupView {
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

  signUp(callback) {
    this.submit.addEventListener("click", event => {
      event.preventDefault();
      callback();
    })
  }

}


export default SignupView;