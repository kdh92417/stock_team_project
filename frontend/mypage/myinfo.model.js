import MyInfoController from './myinfo.ctrl.js';
import MyInfoView from './myinfo.view.js';

class LoginUser {
  constructor() {

  }

  sendUserData(user_data) {
    console.log(user_data)
    const ctrl = new MyInfoController();

    this.userInfo = {};

    this.userInfo.userId = user_data.user_id;
    this.userInfo.userName = user_data.user_name;
    this.userInfo.userBirth = user_data.birth_date;
    this.userInfo.userPhone = user_data.phone_number;
    this.userInfo.userEmail = user_data.email;

    ctrl.handleShowInfo(this.userInfo);
  }

}


export default LoginUser;