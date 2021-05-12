import API from '../api/api.js'

class ShowPortfolioView {
  constructor(comment) {
    this.root = document.querySelector('.portfolio-root');
    this.comment = comment;
    console.log(this.root)
  }

  showPortfolio(res, pfId) {
    console.log(res)
    const title = res.title;
    const content = res.content;
    const userId = res.user_id;
    const searchCount = res.search_count;
    const prev = res.previous_board_id;
    const next = res.next_board_id;
    const date = moment(res.create_date).format('YYYY-MM-DD HH:mm:ss');

    let stockNameArr = [];
    let stockCountArr = [];
    let stockAmountArr = [];
    let stockPriceArr = []

    for (let i = 0; i < res.stock.length; i++) {
      stockNameArr.push(res.stock[i]["stock_name"]);
      stockCountArr.push(res.stock[i]["stock_count"]);
      stockAmountArr.push(res.stock[i]["stock_amount"]);
      stockPriceArr.push(stockCountArr[i] * stockAmountArr[i])
    }

    let portfolio_HTML = `<div class="view-all-container">
    <div class="view-button-content">
      
      <div role="button" class="btn prev-btn">
        <span class="btn-text">이전글</span>
      </div>
      <div role="button" class="btn next-btn">
        <span class="btn-text">다음글</span>
      </div>
      <a href="../template/portfolio-board.html" role="button" class="btn list-btn">
        <span id="btn-list" class="btn-text">목록</span>
      </a>
    </div>
    <div class="write-content-box">
      <div class="write-title">
        <span class="title">${title}</span>
      </div>
      <div class="user-info">
        <span class="user-nickname">${userId}</span>
        <div class="write-info">
          <span class="date">${date}</span>
          <span class="view-count">조회수: ${searchCount}</span>
        </div>
      </div>
      
      <div class="view-graph-content">
        <div class="view-graph">
          <canvas id="myChart" width="250" height="250"></canvas>
        </div>
        <div class="view-text">
          <span class="main-text-title">포트폴리오 세부사항</span><br>
          <a id="stock" class="main-text"></a></apan>
        </div>
      </div>
      <div class="write-main-text">
        <span>${content}</span>
      </div>
      <div class="comment-write">
        <div class="comment-inbox">
          <textarea class="comment-inbox-text" placeholder="댓글을 남겨보세요" cols="20" wrap="virtual" rows="3"
            maxlength="3000"></textarea>
        </div>
        <div class="register-box">
          <button class="btn-submit">등록</button>
        </div>
      </div>
      <div class="comment-print-box">
      </div>
    </div>
    <div class="bottom-button-content">
      <a href="../template/portfolio-board.html" role="button" class="btn list-btn">
        <span class="btn-text">목록</span>
      </a>
      
        <span class="btn-text" id="top-btn" onclick="window.scrollTo(0,0);">▲TOP</span>

    </div>
  </div>`

    this.root.insertAdjacentHTML('afterend', portfolio_HTML);

    let stock = document.querySelector('#stock')
    for (let i = 0; i < stockNameArr.length; i++) {

      stock.innerHTML += `${stockNameArr[i]} - ${stockCountArr[i]}주 - ${stockPriceArr[i].toLocaleString()}원<br>`;

      // Chart JS
      var ctx = document.getElementById('myChart');
      var myChart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: stockNameArr,
          datasets: [
            {
              label: "# of Votes",
              data: stockPriceArr,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(183, 255, 176, 0.2)",
                "rgba(255, 170, 192, 0.2)",
                "rgba(255, 248, 149, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(94, 199, 62, 1)",
                "rgba(255, 86, 131, 1)",
                "rgba(218, 206, 47, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }
      });
    }

    this.movePreviousPortfolio(prev);
    this.moveNextPortfolio(next)

    const commentSubmitBtn = document.querySelector(".btn-submit");

    commentSubmitBtn.addEventListener("click", event => {
      this.submitComment(pfId)
    })
  }



  movePreviousPortfolio(prev) {
    const previousBtn = document.querySelector(".prev-btn");
    previousBtn.addEventListener("click", () => {
      if (prev === null) {
        return alert("첫번째 페이지입니다.")
      } else location.href = `http://127.0.0.1:5503/frontend/main/template/write-view.html?board_id=` + prev;
    })
  }

  moveNextPortfolio(next) {
    const previousBtn = document.querySelector(".next-btn");
    previousBtn.addEventListener("click", () => {
      if (next === null) {
        return alert("마지막 페이지입니다.")
      } else location.href = `http://127.0.0.1:5503/frontend/main/template/write-view.html?board_id=` + next;
    })
  }

  submitComment(pfId) {

    const commentArea = document.querySelector(".comment-inbox-text");
    let commentContent = commentArea.value;
    commentContent = commentContent.replace(/(?:\r\n|\r|\n)/g, '<br>');

    this.comment.saveComment(commentContent, pfId);
    const comment = this.comment.comment;
    console.log(comment)

    if (commentContent !== '') {
      API.postComment("http://192.168.1.32:8000/portfolio/comment/write/", comment)
        .then((res) => (res.json()))
        .then((res) => {
          console.log(res);
          console.log(res.user_id);
          this.printNewComment(res.user_id, res.comment_id);
        })
        .catch((err) => {
          console.log(err);
        })
    } else alert("댓글을 입력해주세요.")

    // document.querySelector(".comment-inbox-text").value='';
  }

  printComments(comments) {
    const commentDiv = document.querySelector('.comment-print-box');
    for (let i = 0; i < comments.length; i++) {
      let html =
        `<div class="each-comment-content">
          <div class="comment" id="${comments[i].comment_id}">ID: ${comments[i].user_id}</div>
          ${comments[i].content}
        </div>
      </div>`

      commentDiv.innerHTML += html;
    }
  }

  //새로 입력된 댓글 추가
  printNewComment(userId, commentId) {
    const commentDiv = document.querySelector('.comment-print-box');
    const commentArea = document.querySelector(".comment-inbox-text");

    let comment = commentArea.value;
    comment = comment.replace(/(?:\r\n|\r|\n)/g, '<br>');
    let html =
      `<div class="each-comment-content">
          <div class="comment" id="${commentId}">ID: ${userId}</div>
          ${comment}
        </div>`

    commentDiv.innerHTML += html;
    window.location.reload();

  }

  showDeleteBtn(pfId) {
    const deleteBtn = document.querySelector('.view-button-content');
    const html = `<div role="button" class="btn delete-btn">
    <span class="btn-text">삭제</span></div>`
    API.userInfoGet("http://192.168.1.32:8000/account/user/")
      .then((res) => (res.json()))
      .then((res) => {
        console.log(res.comment_list);
        for (let i = 0; i < res.board_list.length; i++) {
          if (res.board_list[i].board_id === Number(pfId)) {
            deleteBtn.insertAdjacentHTML('afterbegin', html);
          }
        }
        this.showDeleteCommentBtn(res.comment_list)
        this.deletePortfolio(pfId);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  showDeleteCommentBtn(commentId) {
    const comments = document.querySelectorAll('.comment');
    const deleteBtnHTML = `<div role="button" class="btn delete-comment-btn">
      <span class="btn-text">삭제</span></div>`

    for (let i = 0; i < comments.length; i++) {
      for (let j = 0; j < commentId.length; j++) {
        console.log("몇번 반복?")
        if (Number(comments[i].getAttribute('id')) === commentId[j].comment_id) {
          console.log(Number(comments[i].getAttribute('id'), commentId[j].comment_id))
          let position = document.getElementById(comments[i].getAttribute('id'));
          position.innerHTML += deleteBtnHTML;
        }
      }
      this.deleteComment(commentId);
    }
  }

  deletePortfolio(pfId) {
    const deleteBtn = document.querySelector('.delete-btn');
    const pfObj = {};
    pfObj.portfolio_id = Number(pfId)
    console.log(deleteBtn);
    console.log(pfObj);
<<<<<<< HEAD
    if(deleteBtn !== null) {
      deleteBtn.addEventListener('click', function() {
        API.delete('http://192.168.1.32:8000/portfolio/write/', pfObj)
=======
    deleteBtn.addEventListener('click', function () {
      API.delete('http://192.168.1.32:8000/portfolio/write/', pfObj)
>>>>>>> 0eb337f3e5f524ea6836cc6b311d81952c73e96e
        .then((res) => (res.json()))
        .then((res) => {
          console.log("deleted")
          alert("게시글이 삭제되었습니다.");
          location.href = "../template/portfolio-board.html";
        })
        .catch((err) => {
          console.log(err);
<<<<<<< HEAD
        }) 
      })
    }
=======
        })
    })
>>>>>>> 0eb337f3e5f524ea6836cc6b311d81952c73e96e
  }

  deleteComment(commentId) {
    const deleteBtn = document.querySelectorAll('.delete-comment-btn')
    const commentObj = {};
    const commentBox = document.querySelector('.comment-print-box')

<<<<<<< HEAD
    if(deleteBtn !== null){
      deleteBtn.forEach(function(item) {
        item.addEventListener('click', (event) => {
          const btn = event.target;
          const deleteAll = btn.parentNode.parentNode.parentNode.parentNode;
  
          commentBox.removeChild(deleteAll);
  
          commentObj.comment_id = btn.parentNode.parentNode.id;
          
          API.delete("http://192.168.1.32:8000/portfolio/comment/write/", commentObj)
=======
    deleteBtn.forEach(function (item) {
      item.addEventListener('click', (event) => {
        const btn = event.target;
        const deleteAll = btn.parentNode.parentNode.parentNode.parentNode;

        commentBox.removeChild(deleteAll);

        commentObj.comment_id = btn.parentNode.parentNode.id;

        API.delete("http://192.168.1.32:8000/portfolio/comment/write/", commentObj)
>>>>>>> 0eb337f3e5f524ea6836cc6b311d81952c73e96e
          .then((res) => (res.json()))
          .then((res) => {
            console.log("deleted")
            alert("댓글이 삭제되었습니다.");
          })
          .catch((err) => {
            console.log(err);
<<<<<<< HEAD
          }) 
        })
      
      })
    }
    
=======
          })
      })

    })
>>>>>>> 0eb337f3e5f524ea6836cc6b311d81952c73e96e
  }
}

export default ShowPortfolioView;