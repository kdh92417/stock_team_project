class MyInfoController {

  constructor(service, view) {
    this.service = service;
    this.view = view;
  }

  handleShowInfo(userInfo) {
    this.view.showMyInfo(userInfo);
    this.handleChangeInfo(userInfo);
  }

  handleChangeInfo(userInfo) {
    console.log(userInfo);
    this.service.changeName(userInfo.userName);
    this.service.changeBirth(userInfo.userBirth);
    this.service.changePhone(userInfo.userPhone);
    this.service.changeEmail(userInfo.userEmail);
    this.service.changePassword();
  }


}

export default MyInfoController