class MyInfoService {
  constructor(api) {
    this.api = api
    console.log(this.api);
    this.loadInfoPage();
  }

  // functionName - loadInfoPage
  // Job - 로그인 시 마이페이지 정보를 api에서 받아오게 호출
  // Input(args, params) - none
  // Output(return) - none
  loadInfoPage() {
    this.api.loadUserInfo();
  }
}

export default MyInfoService;