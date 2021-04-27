class Navbar {

  constructor(api) {
    this.root = document.querySelector('.root');
    this.api = api;
    // console.log(this.api);
    this.showNavbar();

  }

  async showNavbar(api) {
    const user_id = localStorage.getItem('userId');
    console.log(user_id);
    // let self = this;
    let token = localStorage.getItem("token");

    if (!token) {
      let navbar_HTML =
        `<nav class="sfolio-navbar">
        <div class="nav-container">
          <div class="main-logo">
            <i class="fas fa-chart-pie"></i>
            <a class="logo" href="../template/index.html">S.Folio</a>
          </div>
          <input type="checkbox" id="show-menu">
          <label for="show-menu" class="navbar_toggleBtn"><i class="fas fa-bars"></i></label>
          <div class="nav-menu">
            <ul class="main-menu">
              <li><a class="nav-item" href="../template/portfolio-board.html">포트폴리오 게시판</a></li>
              <li><a class="nav-item" href="../template/hall_of_fame.html">명예의 전당</a></li>
              <li id="admin"><a class="nav-item" href="./manager.html">관리자</a></li>
            </ul>
            <ul class="main-login">
              <li><a class="nav-item" href="../template/signup.html">Sign Up</a></li>
              <li><a class="nav-item" href="../template/login.html">Login</a></li>
            </ul>
          </div>
        </div>
      </nav>`
      this.root.insertAdjacentHTML('afterend', navbar_HTML);
      this.navbarLogin();
    } else {
      let logout_navbar_HTML =
        `<nav class="sfolio-navbar">
        <div class="nav-container">
          <div class="main-logo">
            <i class="fas fa-chart-pie"></i>
            <a class="logo" href="../template/index.html">S.Folio</a>
          </div>
          <input type="checkbox" id="show-menu">
          <label for="show-menu" class="navbar_toggleBtn"><i class="fas fa-bars"></i></label>
          <div class="nav-menu">
            <ul class="main-menu">
              <li><a class="nav-item" href="../template/portfolio-board.html">포트폴리오 게시판</a></li>
              <li><a class="nav-item" href="../template/hall_of_fame.html">명예의 전당</a></li>
              <li id="admin"><a class="nav-item" href="./manager.html">관리자</a></li>
              <li id="mypage">
                <a class="nav-item desktop-link" href="#">마이페이지</a>
                <input type="checkbox" id="show-mypage">
                <label for="show-mypage">마이페이지</label>
                <ul class="mypage-menu">
                  <li><a id="myinfo" class="nav-item" href="../template/mypage.html">회원정보수정</a></li>
                  <li><a class="nav-item" href="../template/mywrite.html">작성글 / 작성댓글</a></li>
                </ul>
              </li>
            </ul>
            <ul class="main-logout">
              <div class="user-name"><span>${user_id}</span>님</div>
              <li><a id="logout" class="nav-item" href="../template/index.html">Logout</a></li>
            </ul>
          </div>
        </div>
      </nav>`
      this.root.insertAdjacentHTML('afterend', logout_navbar_HTML);
      this.navbarLogout();
      this.userLogout();
      this.loadInfoPage();
    }

  }

  navbarLogin() {
    const mainNav = document.querySelector('.sfolio-navbar'),
      mainLogin = document.querySelector(".main-login")

    window.onscroll = () => {
      if (window.scrollY > 25) {
        mainNav.classList.add('nav-active');
        mainLogin.classList.add('nav-active');
      } else {
        mainNav.classList.remove('nav-active');
        mainLogin.classList.remove('nav-active');
      }
    };
  }

  navbarLogout() {
    const mainNav = document.querySelector('.sfolio-navbar'),
      mainLogout = document.querySelector(".main-logout");

    window.onscroll = () => {
      if (window.scrollY > 25) {
        mainNav.classList.add('nav-active');
        mainLogout.classList.add('nav-active');
      } else {
        mainNav.classList.remove('nav-active');
        mainLogout.classList.remove('nav-active');
      }
    };
  }

  userLogout() {
    const removeUser = document.getElementById("logout");

    removeUser.addEventListener("click", () => {
      localStorage.removeItem("token");
    })
  }

  loadInfoPage() {
    const myInfo = document.getElementById("myinfo");

    this.api.loadUserInfo();

  }
}

export default Navbar;
