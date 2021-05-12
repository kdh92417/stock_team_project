class LikeCpPfService {
  // functionName - showRankCompany
  // Job - 주간 인기 검색 기업을 클릭하면 기업정보 페이지로 보내줌 
  // Input(args, params) - view topRank
  // Output(return) - none
  showRankCompany = (topRank) => {
    topRank.forEach(target => {
      target.addEventListener("click", event => {
        console.dir(event.target.previousElementSibling.id)
        location.href = "../template/company.html"
        const companyInfo = {};
        companyInfo.name = event.target.innerHTML;
        companyInfo.code = event.target.id;
        companyInfo.like_count = event.target.previousElementSibling.id;
        localStorage.setItem("기업이름", JSON.stringify(companyInfo));
      })
    })
  }

  // functionName - showUserPortfolio
  // Job - Best Member를 클릭하면 포트폴리오 페이지로 보내줌 
  // Input(args, params) - view userName
  // Output(return) - none
  showUserPortfolio = (userName) => {
    userName.forEach(target => {
      target.addEventListener("click", event => {
        console.dir(event.target)
        const user = {};
        user.name = event.target.innerHTML;
        localStorage.setItem("bestMember", JSON.stringify(user));
        location.href = "../template/portfolio-board.html"
      })
    })
  }

  // functionName - rankTimer
  // Job - 주간 인기 검색 기업 / 주간 인기 포트폴리오들을 순차적으로 갱신되는 효과 
  // Input(args, params) - view list 
  // Output(return) - none
  rankTimer = (list) => {
    const rankOne = list.children[0].childNodes[1].childNodes[1],
      rankNextOne = list.children[0].childNodes[1].childNodes[3],
      rankTwo = list.children[1].childNodes[1].childNodes[1],
      rankNextTwo = list.children[1].childNodes[1].childNodes[3],
      rankThree = list.children[2].childNodes[1].childNodes[1],
      rankNextThree = list.children[2].childNodes[1].childNodes[3],
      rankFour = list.children[3].childNodes[1].childNodes[1],
      rankNextFour = list.children[3].childNodes[1].childNodes[3],
      rankFive = list.children[4].childNodes[1].childNodes[1],
      rankNextFive = list.children[4].childNodes[1].childNodes[3];
    let timer = 3000 // 롤링되는 주기 입니다 (1000 => 1초)
    let move = 10

    setInterval(function tick() {
      if (move === 10) {

        rankOne.classList.remove('list_sliding');
        rankOne.classList.add('list_sliding_after');

        rankNextOne.classList.remove('list_sliding_after');
        rankNextOne.classList.add('list_sliding');

        move = 9;
      } else if (move === 9) {

        rankTwo.classList.remove('list_sliding');
        rankTwo.classList.add('list_sliding_after');

        rankNextTwo.classList.remove('list_sliding_after');
        rankNextTwo.classList.add('list_sliding');

        move = 8;
      } else if (move === 8) {

        rankThree.classList.remove('list_sliding');
        rankThree.classList.add('list_sliding_after');

        rankNextThree.classList.remove('list_sliding_after');
        rankNextThree.classList.add('list_sliding');

        move = 7;
      } else if (move === 7) {

        rankFour.classList.remove('list_sliding');
        rankFour.classList.add('list_sliding_after');

        rankNextFour.classList.remove('list_sliding_after');
        rankNextFour.classList.add('list_sliding');

        move = 6;
      } else if (move === 6) {

        rankFive.classList.remove('list_sliding');
        rankFive.classList.add('list_sliding_after');

        rankNextFive.classList.remove('list_sliding_after');
        rankNextFive.classList.add('list_sliding');

        move = 5;
      } else if (move === 5) {

        rankOne.classList.remove('list_sliding_after');
        rankOne.classList.add('list_sliding');

        rankNextOne.classList.remove('list_sliding');
        rankNextOne.classList.add('list_sliding_after');

        move = 4
      } else if (move === 4) {

        rankTwo.classList.remove('list_sliding_after');
        rankTwo.classList.add('list_sliding');

        rankNextTwo.classList.remove('list_sliding');
        rankNextTwo.classList.add('list_sliding_after');

        move = 3;
      } else if (move === 3) {

        rankThree.classList.remove('list_sliding_after');
        rankThree.classList.add('list_sliding');

        rankNextThree.classList.remove('list_sliding');
        rankNextThree.classList.add('list_sliding_after');

        move = 2;
      } else if (move === 2) {

        rankFour.classList.remove('list_sliding_after');
        rankFour.classList.add('list_sliding');

        rankNextFour.classList.remove('list_sliding');
        rankNextFour.classList.add('list_sliding_after');

        move = 1;
      } else if (move === 1) {

        rankFive.classList.remove('list_sliding_after');
        rankFive.classList.add('list_sliding');

        rankNextFive.classList.remove('list_sliding');
        rankNextFive.classList.add('list_sliding_after');

        move = 10;
      }

    }, timer);
  }
}

export default LikeCpPfService;