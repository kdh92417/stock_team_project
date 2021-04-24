class SignupController {
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

    //this.signup 객체에 view로부터 얻은 값 넣어줌
    save.id = view.id.value;
    save.pw = view.pw.value;
    save.name = view.name.value;
    save.birth = view.birth.value;
    save.phone = view.phone.value;
    save.email = view.email.value;
    save.checkPw = view.checkPw.value;

    //service에 checkUser 호출
    this.service.checkUser(this.signup);

  }

}


export default SignupController;