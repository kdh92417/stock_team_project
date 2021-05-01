import MyInfoController from './myinfo.ctrl.js';
import MyInfoService from "./myinfo.service.js"
import MyInfoView from './myinfo.view.js';

class LoginUser {
  constructor(ctrl) {
    this.ctrl = ctrl
    console.log(this.ctrl)
  }

  sendUserData(user_data) {

    this.userInfo = {};

    this.userInfo.userId = user_data.user_id;
    this.userInfo.userName = user_data.user_name;
    this.userInfo.userBirth = user_data.birth_date;
    this.userInfo.userPhone = user_data.phone_number;
    this.userInfo.userEmail = user_data.email;

    this.ctrl.handleShowInfo(this.userInfo);
  }

}


export default LoginUser;