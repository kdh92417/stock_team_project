import API from "../api/api.js"

class WriteService {
  // functionName - selectAllCheckbox
  // Job - 작성글 / 작성댓글의 전체삭제를 위한 체크박스 전체선택 함수
  // Input(args, params) - selectAll, items
  // Output(return) - none
  selectAllCheckbox = (selectAll, items) => {
    selectAll.addEventListener("click", event => {
      if (event.target.checked === true) {
        for (let x of items) x.checked = true;
      } else for (let x of items) x.checked = false;
    })
  }

  // functionName - sendDeleteItem
  // Job - 작성글 / 작성댓글의 전체삭제, 선택삭제, 단일삭제를 위한 함수
  // Input(args, params) - deleteBtn, items
  // Output(return) - none
  sendDeleteItem = (deleteBtn, selectAll, items) => {
    console.log(items[0].name);
    deleteBtn.addEventListener("click", () => {
      if (selectAll.checked === true) {
        API.writeAndCommentDelete("http://192.168.1.32:8000/account/user/portfolio/delete/")
          .then((res) => res.json())
          .then((res) => {
            console.log(res)
            location.reload();
          })
          .catch((err) => {
            console.log(err);
          })
      } else if (items[0].name === "write") {
        let deleteItems = [];
        for (let i = 0; i < items.length; i++) {
          if (items[i].checked === true) {
            deleteItems.push(Number(items[i].id));
          }
        }
        console.log(deleteItems);
        API.post("http://192.168.1.32:8000/account/user/portfolio/delete/", { delete_pf_id_list: deleteItems })
          .then((res) => res.json())
          .then((res) => {
            console.log(res.board_list);
          })
          .catch((err) => {
            console.log(err);
          })
      } else {
        let deleteItems = [];
        for (let i = 0; i < items.length; i++) {
          if (items[i].checked === true) {
            deleteItems.push(Number(items[i].id));
          }
        }
        console.log(deleteItems);
        API.post("http://192.168.1.32:8000/account/user/comment/delete/", { delete_comment_id_list: deleteItems })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            // location.reload();
          })
          .catch((err) => {
            console.log(err);
          })
      }
    })
  }
}

export default WriteService;