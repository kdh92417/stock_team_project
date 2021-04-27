class UserInfo {

  constructor() {
    this.root = document.querySelector('.root');
    console.log(this.root);
    this.loadUserInfo();
  }

  loadUserInfo() {
    fetch("http://3.35.169.52:8000/account/user/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.showMyInfo(res.user_data);
      })
  }

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
    this.changeName(res);
    this.changeBirth(res);
    this.changePhone(res);
    this.changeEmail(res);
  }

  changeName(res) {
    const userName = res.user_name;
    const modifyBtn = document.getElementById("modify-name"),
      name = document.getElementById("name"),
      tdName = document.querySelector(".td-name");

    modifyBtn.addEventListener("click", () => {
      tdName.removeChild(name);
      tdName.innerHTML = `<input class="change-name" type="text" value=${userName}>`;
      tdName.innerHTML += `<p id="modify-name" class="modify-btn">확인</p>`
      this.saveName();
    })
  }
  saveName(res) {
    const modifyBtn = document.getElementById("modify-name"),
      saveName = document.querySelector(".change-name"),
      tdName = document.querySelector(".td-name");

    modifyBtn.addEventListener("click", () => {
      console.dir(saveName.value);
      tdName.removeChild(saveName);
      tdName.innerHTML = `<p id="name" class="contxt-title">${saveName.value}</p>`;
      tdName.innerHTML += `<p id="modify-name" class="modify-btn">수정</p>`
      this.put("http://3.35.169.52:8000/account/user/name/", { "user_name": `${saveName.value}` })
      this.changeName();
    })
  }
  changeBirth(res) {
    // const userBirth = res.user_birth;
    const modifyBtn = document.getElementById("modify-birth"),
      birth = document.getElementById("birth"),
      tdBirth = document.querySelector(".td-birth");

    modifyBtn.addEventListener("click", () => {
      tdBirth.removeChild(birth);
      // tdBirth.appendChild(input);
      tdBirth.innerHTML = `<input class="change-birth" type="text" value="1994-04-04">`;
      tdBirth.innerHTML += `<p id="modify-birth" class="modify-btn">확인</p>`
    })
  }
  changePhone(res) {
    const modifyBtn = document.getElementById("modify-phone"),
      phone = document.getElementById("phone"),
      tdPhone = document.querySelector(".td-phone");

    modifyBtn.addEventListener("click", () => {
      tdPhone.removeChild(phone);
      tdPhone.innerHTML = `<input class="change-phone" type="text" value="010-2414-2892">`;
      tdPhone.innerHTML += `<p id="modify-phone" class="modify-btn">확인</p>`
    })
  }
  changeEmail(res) {
    const modifyBtn = document.getElementById("modify-email"),
      email = document.getElementById("email"),
      tdEmail = document.querySelector(".td-email");

    modifyBtn.addEventListener("click", () => {
      tdEmail.removeChild(email);
      tdEmail.innerHTML = `<input class="change-email" type="text" value="dave@gmail.com">`;
      tdEmail.innerHTML += `<p id="modify-email" class="modify-btn">확인</p>`
    })
  }

  put(url, payload) {
    return fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify(payload)
    })
      .then((res) => res.json())
      .then((res) => {
        this.loadUserInfo()
        console.log(res);
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

window.onload = new UserInfo;