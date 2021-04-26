class UserInfo {

  constructor() {
    this.root = document.querySelector('.root');
    console.log(this.root);
    this.loadUserInfo ();
  }
  
  loadUserInfo () {
    fetch("http://192.168.1.32:8000/account/user/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.showMyInfo (res.user_data);
      })
  }
  
  showMyInfo (res) {
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
              <p class="modify-btn">수정</p>
            </td>
          </tr>
          <tr>
            <th>
              <span>사용자이름</span>
            </th>
            <td>
              <p class="contxt-title">${userName}</p>
              <p class="modify-btn">수정</p>
            </td>
          </tr>
          <tr>
            <th>
              <span>생년월일</span>
            </th>
            <td>
              <p class="contxt-title">${userBirth}</p>
              <p class="modify-btn">수정</p>
            </td>
          </tr>
          <tr>
            <th>
              <span>전화번호</span>
            </th>
            <td>
              <p class="contxt-title">${userPhone}</p>
              <p class="modify-btn">수정</p>
            </td>
          </tr>
          <tr>
            <th>
              <span>이메일</span>
            </th>
            <td>
              <p class="contxt-title">${userEmail}</p>
              <p class="modify-btn">수정</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>`

    this.root.insertAdjacentHTML('afterend', myInfo_HTML);
  }
}

window.onload = new UserInfo;