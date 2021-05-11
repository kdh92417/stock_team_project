
class WriteService {
  constructor() {

  }

  selectAllCheckbox = (selectAll, items) => {
    selectAll.addEventListener("click", event => {
      if (event.target.checked === true) {
        for (let x of items) x.checked = true;
      } else for (let x of items) x.checked = false;
    })
  }

}

export default WriteService;