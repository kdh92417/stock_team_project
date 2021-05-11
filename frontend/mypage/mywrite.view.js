

class WriteView {
  constructor() {
    this.section = document.querySelector(".mypage-write")
  }

  // functionName - showMyWriteList
  // Job - 작성글을 보여주는 함수
  // Input(args, params) - userWriteList
  // Output(return) - none
  showMyWriteList(userWriteList) {
    if (userWriteList[0] === undefined) {
      let myWriteList_HTML = `<div class="write-content">
                              <div class="writepage-title">
                                <h2>작성글</h2>
                              </div>
                              <table class="head-table">
                                <thead>
                                  <th class="check"></th>
                                  <th class="number">번호</th>
                                  <th class="title">제목</th>
                                  <th class="date">작성일</th>
                                  <th class="view">조회 수</th>
                                </thead>
                              </table>
                              <div class="scroll-table">
                                <table class="body-table">
                                  <tbody>
                                    <tr>
                                      <td class="td-article">
                                        <div class="board-list">작성글이 존재하지 않습니다.</div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>`
      this.section.insertAdjacentHTML('afterbegin', myWriteList_HTML);
    } else {
      let myWriteList_HTML = `<div class="write-content">
                              <div class="writepage-title">
                                <h2>작성글</h2>
                              </div>
                              <div class="select">
                                <div class="all-check-box">
                                  <input id="write-all-check" type="checkbox">
                                  <span> 전체선택</span>
                                </div>
                                <button id="write-delete">삭제</button>
                              </div>
                              <table class="head-table">
                                <thead>
                                  <th class="check"></th>
                                  <th class="number">번호</th>
                                  <th class="title">제목</th>
                                  <th class="date">작성일</th>
                                  <th class="view">조회 수</th>
                                </thead>
                              </table>
                              <div class="scroll-table">
                                <table class="body-table">
                                  <tbody class="write-table-tbody">
                                  </tbody>
                                </table>
                              </div>
                            </div>`
      this.section.insertAdjacentHTML('afterbegin', myWriteList_HTML);
    }
  }

  // functionName - addWriteItem
  // Job - 작성글을 작성 갯수 만큼 더해주는 함수
  // Input(args, params) - userWriteList
  // Output(return) - none
  addWriteItem(userWriteList) {
    this.tbody = document.querySelector(".write-table-tbody")
    for (let i = 0; i < userWriteList.length; i++) {
      this.tbody.innerHTML += `<tr>
                                <td class="td-check-box">
                                  <div class="check-box">
                                    <input type="checkbox" name="write" id="${userWriteList[i].board_id}">
                                  </div>
                                </td>
                                <td class="td-number">
                                  <div class="board-number">${userWriteList[i].board_id}</div>
                                </td>
                                <td class="td-article">
                                  <a href="http://127.0.0.1:5503/frontend/main/template/write-view.html?board_id=${userWriteList[i].board_id}">
                                  <div class="board-list">${userWriteList[i].pofol_name}</div></a>
                                </td>
                                <td class="td-date">${moment(userWriteList[i].create_date).format("YYYY.MM.DD")}</td>
                                <td class="td-view">${userWriteList[i].pofol_search_count}</td>
                              </tr>`
    }
  }

  // functionName - findWriteSelectItems
  // Job - 작성글을 삭제하기 위한 체크박스를 찾아서 service로 보내줌
  // Input(args, params) - service.selectAllCheckbox
  // Output(return) - none
  findWriteSelectItems(callback) {
    const selectAll = document.getElementById("write-all-check");
    let items = document.getElementsByName("write");
    callback(selectAll, items)
  }

  // functionName - findWriteDeleteBtn
  // Job - 작성글을 삭제하기 위한 삭제버튼과 선택 된 items를 찾아서 service로 보내줌
  // Input(args, params) - service.selectAllCheckbox
  // Output(return) - none
  findWriteDeleteBtn(callback) {
    const deleteBtn = document.getElementById("write-delete"),
      selectAll = document.getElementById("write-all-check");
    let items = document.getElementsByName("write");
    callback(deleteBtn, selectAll, items)
  }

  // functionName - showMyCommentList
  // Job - 작성댓글을 보여주는 함수
  // Input(args, params) - userWriteList
  // Output(return) - none
  showMyCommentList(userCommentList) {
    if (userCommentList[0] === undefined) {
      let myCommentList_HTML = `<div class="comment-content">
                                  <div class="comment-title">
                                    <h2>작성댓글</h2>
                                  </div>
                                  <table class="cm-head-table">
                                    <thead>
                                      <th class="check"></th>
                                      <th class="comment">댓글</th>
                                      <th class="write-page">원문보기</th>
                                      <th class="cm-date">작성일</th>
                                    </thead>
                                  </table>
                                  <div class="scroll-table">
                                    <table class="cm-body-table">
                                      <tbody>
                                        <tr>
                                          <td class="td-comment">
                                            <div class="board-list">작성댓글이 존재하지 않습니다.</div>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>`
      this.section.insertAdjacentHTML('beforeend', myCommentList_HTML);
    } else {
      let myCommentList_HTML = `<div class="comment-content">
                                  <div class="comment-title">
                                    <h2>작성댓글</h2>
                                  </div>
                                  <div class="select">
                                    <div class="all-check-box">
                                      <input id="comment-all-check" type="checkbox">
                                      <span> 전체선택</span>
                                    </div>
                                    <button id="comment-delete">삭제</button>
                                  </div>
                                  <table class="cm-head-table">
                                    <thead>
                                      <th class="check"></th>
                                      <th class="comment">댓글</th>
                                      <th class="write-page">원문보기</th>
                                      <th class="cm-date">작성일</th>
                                    </thead>
                                  </table>
                                  <div class="scroll-table">
                                    <table class="cm-body-table">
                                      <tbody class="cm-table-tbody">
                                      </tbody>
                                    </table>
                                  </div>
                                </div>`
      this.section.insertAdjacentHTML('beforeend', myCommentList_HTML);
    }
  }

  // functionName - addCommentItem
  // Job - 작성댓글을 작성 갯수 만큼 더해주는 함수
  // Input(args, params) - userWriteList
  // Output(return) - none
  addCommentItem(userCommentList) {
    this.tbody = document.querySelector(".cm-table-tbody")
    for (let i = 0; i < userCommentList.length; i++) {
      this.tbody.innerHTML += `<tr>
                                <td class="td-cm-check-box">
                                  <div class="check-box">
                                    <input type="checkbox" name="comment" id="${userCommentList[i].comment_id}">
                                  </div>
                                </td>
                                <td class="td-comment">
                                  <div id="${userCommentList[i].comment_id}" class="board-list">${userCommentList[i].comment_content}</div>
                                </td>
                                <td class="td-cm-page">
                                  <a href="http://127.0.0.1:5503/frontend/main/template/write-view.html?board_id=${userCommentList[i].pofol_id}">원문보기</a><span>▶︎</span>
                                </td>
                                <td class="td-cm-date">${moment(userCommentList[i].create_date).format("YYYY.MM.DD")}</td>
                              </tr>`
    }
  }

  // functionName - findCommentSelectItems
  // Job - 작성댓글을 삭제하기 위한 체크박스를 찾아서 service로 보내줌
  // Input(args, params) - service.selectAllCheckbox
  // Output(return) - none
  findCommentSelectItems(callback) {
    const selectAll = document.getElementById("comment-all-check");
    let items = document.getElementsByName("comment");
    callback(selectAll, items)
  }

  // functionName - findCommentDeleteBtn
  // Job - 작성댓글을 삭제하기 위한 삭제버튼과 선택 된 items를 찾아서 service로 보내줌
  // Input(args, params) - service.selectAllCheckbox
  // Output(return) - none
  findCommentDeleteBtn(callback) {
    const deleteBtn = document.getElementById("comment-delete"),
      selectAll = document.getElementById("comment-all-check");
    let items = document.getElementsByName("comment");
    callback(deleteBtn, selectAll, items)
  }
}

export default WriteView;