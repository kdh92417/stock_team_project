class MyInfoController {

  constructor(service) {
    this.api = service
    console.log(service)
    this.loadInfoPage();

  }

  // functionName - loadInfoPage
  // Job - 로그인 시 마이페이지에 회원정보를 api에서 받아오게 호출
  // Input(args, params) - none
  // Output(return) - none
  loadInfoPage() {
    // api에서 서버에서 response로 회원정보를 전달받음
    this.api.loadUserInfo();
  }


}

export default MyInfoController