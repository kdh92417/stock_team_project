class MyInfoView {

  constructor() {
    this.root = document.querySelector('.root');
  }

  // functionName - showMyInfo
  // Job - 로그인 된 회원정보를 controller에서 전달받아 화면에 보여줌
  // Input(args, params) - user_data
  // Output(return) - none
  showMyInfo(userInfo) {

    let myInfo_HTML = `<section class="mypage-info">
    <div class="mypage-title">
      <h2>회원정보수정</h2>
    </div>
    <div class="content">
      <table class="myinfo">
        <tbody>
          <tr>
            <th>
              <span>아이디</span>
            </th>
            <td>
              <p class="contxt-title">${userInfo.userId}</p>
            </td>
          </tr>
          <tr>
            <th>
              <span>비밀번호</span>
            </th>
            <td class="td-password">
              <p id="modify-password" class="modify-btn">수정</p>
            </td>
          </tr>
          <tr>
            <th>
              <span>사용자이름</span>
            </th>
            <td class="td-name">
              <p id="name" class="contxt-title">${userInfo.userName}</p>
              <p id="modify-name" class="modify-btn">수정</p>
            </td>
          </tr>
          <tr>
            <th>
              <span>생년월일</span>
            </th>
            <td class="td-birth">
              <p id="birth" class="contxt-title">${userInfo.userBirth}</p>
              <p id="modify-birth" class="modify-btn">수정</p>
            </td>
          </tr>
          <tr>
            <th>
              <span>전화번호</span>
            </th>
            <td class="td-phone">
              <p id="phone" class="contxt-title">${userInfo.userPhone}</p>
              <p id="modify-phone" class="modify-btn">수정</p>
            </td>
          </tr>
          <tr>
            <th>
              <span>이메일</span>
            </th>
            <td class="td-email">
              <p id="email" class="contxt-title">${userInfo.userEmail}</p>
              <p id="modify-email" class="modify-btn">수정</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>`

    this.root.insertAdjacentHTML('afterend', myInfo_HTML);
  }

}

export default MyInfoView;