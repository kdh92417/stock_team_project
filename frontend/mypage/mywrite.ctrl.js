import API from "../api/api.js"

class WriteCtrl {
  constructor(service, view) {
    this.service = service;
    this.view = view;
    this.loadWritePage();
  }

  // functionName - loadWritePage
  // Job - 로그인 시 마이페이지에 작성글 / 작성댓글을 api에서 받아오게 호출
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

  // functionName - handleShowWriteAndCommentList
  // Job - api에서 받아온 작성글 / 작성댓글을 WriteView에 보내줌
  // Input(args, params) - res.board_list, res.comment_list
  // Output(return) - none
  handleShowWriteAndCommentList(userWriteList, userCommentList) {
    this.view.showMyWriteList(userWriteList);
    this.view.addWriteItem(userWriteList);
    this.view.showMyCommentList(userCommentList);
    this.view.addCommentItem(userCommentList);
    this.handleSelectItems();
    this.handleDeleteItems();
  }

  // functionName - handleSelectItems
  // Job - view에서 찾은 items를 service.selectAllCheckbox함수에 전달을 제어하는 함수
  // Input(args, params) - none
  // Output(return) - none
  handleSelectItems() {
    this.view.findWriteSelectItems(this.service.selectAllCheckbox);
    this.view.findCommentSelectItems(this.service.selectAllCheckbox);
  }

  handleDeleteItems() {
    this.view.findWriteDeleteBtn(this.service.sendDeleteItem);
    this.view.findCommentDeleteBtn(this.service.sendDeleteItem);
  }
}

export default WriteCtrl;