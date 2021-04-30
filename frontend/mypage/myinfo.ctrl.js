class MyInfoController {

  constructor(view) {

    this.view = view;
    // this.userInfo = this.api.value.sendUserData();


  }

  handleShowInfo(userInfo) {
    console.log(userInfo)
    this.view.showMyInfo(userInfo);
  }

  handleChangeInfo(userInfo) {
    console.log(userInfo)
    this.service.changeName(userInfo.userName)
    this.service.changeBirth(userInfo.userBirth)
    this.service.changePhone(userInfo.userPhone)
    this.service.changeEmail(userInfo.userEmail)
  }
}

export default MyInfoController