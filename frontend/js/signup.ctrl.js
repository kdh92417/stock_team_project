class Controller {
  constructor(view) {
    this.view = view
    this.view.signUp(this.save);
     // 컨트롤러 호출 될때 메서드 실행, 이벤트리스너 달아줌
  }


  save = () => {
    this.signup = {};

    this.signup.id = this.view.id.value;
    this.signup.pw = this.view.pw.value;
    this.signup.name = this.view.name.value;
    this.signup.birth = this.view.birth.value;
    this.signup.phone = this.view.phone.value;
    this.signup.email = this.view.email.value;

    console.log(this.signup)
      // return this.signup;
  }

  
  
}

// const controller = new Controller();
// console.log(controller.signUp())

export default Controller;