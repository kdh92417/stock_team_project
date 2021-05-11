
class WriteService {
  constructor() {

  }

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
    deleteBtn.addEventListener("click", () => {
      if (selectAll.checked === true) {
        console.log("all")
      } else {
        for (let i = 0; i < items.length; i++) {
          if (items[i].checked === true) {
            console.log(items[i]);
          }
        }
      }
    })
  }
}

export default WriteService;