class MyInfoController {

  constructor(service) {
    this.api = service.api

  }

  changeName(res) {
    const userName = res.user_name;
    const modifyBtn = document.getElementById("modify-name"),
      name = document.getElementById("name"),
      tdName = document.querySelector(".td-name");

    modifyBtn.addEventListener("click", () => {
      tdName.removeChild(name);
      tdName.innerHTML = `<input class="change-name" type="text" value=${userName}>`;
      tdName.innerHTML += `<p id="modify-name" class="modify-btn">확인</p>`;
      this.saveName();
    });
  }

  saveName(res) {
    const modifyBtn = document.getElementById("modify-name"),
      saveName = document.querySelector(".change-name"),
      tdName = document.querySelector(".td-name");

    modifyBtn.addEventListener("click", () => {
      console.dir(saveName.value);
      tdName.removeChild(saveName);
      tdName.innerHTML = `<p id="name" class="contxt-title">${saveName.value}</p>`;
      tdName.innerHTML += `<p id="modify-name" class="modify-btn">수정</p>`;
      this.put("http://3.35.169.52:8000/account/user/name/", {
        user_name: `${saveName.value}`,
      });
      this.changeName();
    });
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
      tdBirth.innerHTML += `<p id="modify-birth" class="modify-btn">확인</p>`;
    });
  }

  changePhone(res) {
    const modifyBtn = document.getElementById("modify-phone"),
      phone = document.getElementById("phone"),
      tdPhone = document.querySelector(".td-phone");

    modifyBtn.addEventListener("click", () => {
      tdPhone.removeChild(phone);
      tdPhone.innerHTML = `<input class="change-phone" type="text" value="010-2414-2892">`;
      tdPhone.innerHTML += `<p id="modify-phone" class="modify-btn">확인</p>`;
    });
  }

  changeEmail(res) {
    const modifyBtn = document.getElementById("modify-email"),
      email = document.getElementById("email"),
      tdEmail = document.querySelector(".td-email");

    modifyBtn.addEventListener("click", () => {
      tdEmail.removeChild(email);
      tdEmail.innerHTML = `<input class="change-email" type="text" value="dave@gmail.com">`;
      tdEmail.innerHTML += `<p id="modify-email" class="modify-btn">확인</p>`;
    });
  }

}

export default MyInfoController