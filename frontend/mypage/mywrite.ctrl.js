import API from "../api/api.js"

class WriteCtrl {
  constructor(service, view) {
    this.service = service;
    this.view = view;
    this.loadWritePage();
  }

  // functionName - loadInfoPage
  // Job - 로그인 시 마이페이지에 회원정보를 api에서 받아오게 호출
  // Input(args, params) - none
  // Output(return) - none
  loadWritePage() {
    // api에서 서버에서 response로 회원정보를 전달받음
    API.loadUserInfo("http://192.168.1.32:8000/account/user/")
      .then((res) => res.json())
      .then((res) => {
        // LoginUser에 user_data전달
        this.handleShowWriteAndCommentList(res.board_list, res.comment_list);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleShowWriteAndCommentList(userWriteList, userCommentList) {
    this.view.showMyWriteList(userWriteList);
    this.view.addWriteItem(userWriteList);
    this.view.findWriteSelectAll(this.service.selectAllCheckbox);
    this.view.showMyCommentList(userCommentList);
    this.view.addCommentItem(userCommentList);
    this.view.findCommentSelectAll(this.service.selectAllCheckbox);
  }
}

export default WriteCtrl;