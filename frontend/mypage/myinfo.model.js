import API from "../api/api.js"


class LoginUser {
  constructor(ctrl) {
    this.ctrl = ctrl
    this.loadInfoPage();
  }

  // functionName - loadInfoPage
  // Job - 로그인 시 마이페이지에 회원정보를 api에서 받아오게 호출
  // Input(args, params) - none
  // Output(return) - none
  loadInfoPage() {
    // api에서 서버에서 response로 회원정보를 전달받음
    API.loadUserInfo("http://192.168.1.32:8000/account/user/")
      .then((res) => res.json())
      .then((res) => {
        // LoginUser에 user_data전달
        this.sendUserData(res.user_data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sendUserData(user_data) {
    this.userInfo = {};

    this.userInfo.userId = user_data.user_id;
    this.userInfo.type = user_data.type;
    this.userInfo.userName = user_data.user_name;
    this.userInfo.userBirth = user_data.birth_date;
    this.userInfo.userPhone = user_data.phone_number;
    this.userInfo.userEmail = user_data.email;

    this.ctrl.handleShowInfo(this.userInfo);
  }

}


export default LoginUser;