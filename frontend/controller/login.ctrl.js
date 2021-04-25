class LoginController {
  constructor(service, view) {
    this.view = view;
    this.service = service;

    this.view.login(this.login);
    // 컨트롤러 호출 될때 메서드 실행, 이벤트리스너 달아줌
  }

  login = () => {
    this.user = {};
    const login = this.user;
    const view = this.view;

    login.user_id = view.userId.value;
    login.password = view.userPw.value;

    this.service.loginCheckUser(this.user);
  }

}


export default LoginController;