class LoginController {

  // Job - login 기능 동작에 필요한 service, view 정보를 받아 컨트롤해줌
  // Input(args, params) - service, view
  constructor(api, view) {
    this.view = view;
    this.service = api.value;
    this.api = api;
    console.log(api, api.value, view);
    this.view.Userlogin(this.login);
    // 컨트롤러 호출 될때 메서드 실행, 이벤트리스너 달아줌
  }

  // functionName - login
  // Job - login view에서 입력된 유저 정보를 객체 임시 저장해서 service에 전달 / service에 loginCheckUser 호출
  // Input(args, params) - none
  // Output(return) - none
  login = () => {
    this.user = {};
    const login = this.user;
    const view = this.view;

    login.user_id = view.userId.value;
    login.password = view.userPw.value;

    this.loginUserConfirm(this.user);
  }

  // functionName - loginUserConfirm
  // Job - login view에서 입력된 유저 정보를 객체 임시 저장해서 service에 전달 / service에 loginCheckUser 호출
  // Input(args, params) - none
  // Output(return) - none
  loginUserConfirm(value) {
    this.api.getLogin(value);
  }

}


export default LoginController;