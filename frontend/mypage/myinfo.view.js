class MyInfoView {

  constructor(service) {
    this.service = service
    this.root = document.querySelector('.root');
  }

  // functionName - showMyInfo
  // Job - 로그인 된 회원정보를 서버에서 전달받아 화면에 보여줌
  // Input(args, params) - user_data
  // Output(return) - none
  showMyInfo(res) {

    const userId = res.user_id;
    const userName = res.user_name;
    const userBirth = res.birth_date;
    const userPhone = res.phone_number;
    const userEmail = res.email;
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
              <p class="contxt-title">${userId}</p>
            </td>
          </tr>
          <tr>
            <th>
              <span>비밀번호</span>
            </th>
            <td>
              <p id="modify-password" class="modify-btn">수정</p>
            </td>
          </tr>
          <tr>
            <th>
              <span>사용자이름</span>
            </th>
            <td class="td-name">
              <p id="name" class="contxt-title">${userName}</p>
              <p id="modify-name" class="modify-btn">수정</p>
            </td>
          </tr>
          <tr>
            <th>
              <span>생년월일</span>
            </th>
            <td class="td-birth">
              <p id="birth" class="contxt-title">${userBirth}</p>
              <p id="modify-birth" class="modify-btn">수정</p>
            </td>
          </tr>
          <tr>
            <th>
              <span>전화번호</span>
            </th>
            <td class="td-phone">
              <p id="phone" class="contxt-title">${userPhone}</p>
              <p id="modify-phone" class="modify-btn">수정</p>
            </td>
          </tr>
          <tr>
            <th>
              <span>이메일</span>
            </th>
            <td class="td-email">
              <p id="email" class="contxt-title">${userEmail}</p>
              <p id="modify-email" class="modify-btn">수정</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>`

    this.root.insertAdjacentHTML('afterend', myInfo_HTML);
    this.changeInfo(res);
  }

  changeInfo(res) {
    this.service.changeName(res)
    this.service.changeBirth(res)
    this.service.changePhone(res)
    this.service.changeEmail(res)
  }

}

export default MyInfoView;