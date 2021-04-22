class Controller {
  constructor(service, view) {
    this.view = view;
    this.service = service;

    this.view.signUp(this.save);
     // 컨트롤러 호출 될때 메서드 실행, 이벤트리스너 달아줌
  }

  save = () => {
    this.signup = {};
    const save = this.signup;
    const view = this.view;

    save.id = view.id.value;
    save.pw = view.pw.value;
    save.name = view.name.value;
    save.birth = view.birth.value;
    save.phone = view.phone.value;
    save.email = view.email.value;
    save.checkPw = view.checkPw.value;

    this.service.checkUser(this.signup);
    
  }

  // checkPw = () => {
  //   const save = this.signup;
  //   const view = this.view;
  //   save.checkPw = view.checkPw.value;
  // }
}

// const controller = new Controller();
// console.log(controller.signUp())

export default Controller;