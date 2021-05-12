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
  sendDeleteItem = (deleteBtn, items) => {
    console.log(items[0].name);
    deleteBtn.addEventListener("click", () => {
      if (items[0].name === "write") {
        let deleteItems = [];
        for (let i = 0; i < items.length; i++) {
          if (items[i].checked === true) {
            deleteItems.push(Number(items[i].id));
          }
        }
        post(deleteItems);
      } else {
        let deleteItems = [];
        for (let i = 0; i < items.length; i++) {
          if (items[i].checked === true) {
            deleteItems.push(Number(items[i].id));
          }
        }
        console.log(deleteItems);
      }
    })
  }

  // functionName - sendAllDeleteItems
  // Job - 작성글 / 작성댓글의 전체삭제 위한 함수
  // Input(args, params) - deleteBtn, items
  // Output(return) - none
  sendAllDeleteItems = (deleteBtn, callback) => {
    deleteBtn.addEventListener("click", () => {
      callback()
    })
  }
}

export default WriteService;