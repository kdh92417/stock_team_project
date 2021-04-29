import API from "../api/api.js"

class MyInfoService {
  constructor() {
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
      this.saveName(res);
    });
  }

  saveName(res) {
    const modifyBtn = document.getElementById("modify-name"),
      saveName = document.querySelector(".change-name"),
      tdName = document.querySelector(".td-name");

    modifyBtn.addEventListener("click", () => {
      tdName.removeChild(saveName);
      tdName.innerHTML = `<p id="name" class="contxt-title">${saveName.value}</p>`;
      tdName.innerHTML += `<p id="modify-name" class="modify-btn">수정</p>`;
      API.put("http://192.168.1.32:8000/account/user/name/", {
        user_name: `${saveName.value}`,
      });
      this.changeName(res);
    });
  }

  changeBirth(res) {
    const userBirth = res.birth_date;
    const modifyBtn = document.getElementById("modify-birth"),
      birth = document.getElementById("birth"),
      tdBirth = document.querySelector(".td-birth");

    modifyBtn.addEventListener("click", () => {
      tdBirth.removeChild(birth);
      tdBirth.innerHTML = `<input class="change-birth" type="text" value=${userBirth}>`;
      tdBirth.innerHTML += `<p id="modify-birth" class="modify-btn">확인</p>`;
      this.saveBirth(res);
    });
  }

  saveBirth(res) {
    const modifyBtn = document.getElementById("modify-birth"),
      saveBirth = document.querySelector(".change-birth"),
      tdBirth = document.querySelector(".td-birth");
    console.dir(saveBirth);
    modifyBtn.addEventListener("click", () => {

      tdBirth.removeChild(saveBirth);
      tdBirth.innerHTML = `<p id="birth" class="contxt-title">${saveBirth.value}</p>`;
      tdBirth.innerHTML += `<p id="modify-birth" class="modify-btn">수정</p>`;
      API.put("http://192.168.1.32:8000/account/user/birth/", {
        birth_date: `${saveBirth.value}`,
      });
      this.changeBirth(res);
    });
  }

  changePhone(res) {
    const userPhone = res.phone_number;
    const modifyBtn = document.getElementById("modify-phone"),
      phone = document.getElementById("phone"),
      tdPhone = document.querySelector(".td-phone");

    modifyBtn.addEventListener("click", () => {
      tdPhone.removeChild(phone);
      tdPhone.innerHTML = `<input class="change-phone" type="text" value="${userPhone}">`;
      tdPhone.innerHTML += `<p id="modify-phone" class="modify-btn">확인</p>`;
      this.savePhone(res);
    });
  }

  savePhone(res) {
    const modifyBtn = document.getElementById("modify-phone"),
      savePhone = document.querySelector(".change-phone"),
      tdPhone = document.querySelector(".td-phone");

    modifyBtn.addEventListener("click", () => {
      tdPhone.removeChild(savePhone);
      tdPhone.innerHTML = `<p id="phone" class="contxt-title">${savePhone.value}</p>`;
      tdPhone.innerHTML += `<p id="modify-phone" class="modify-btn">수정</p>`;
      API.put("http://192.168.1.32:8000/account/user/phone/", {
        phone_number: `${savePhone.value}`,
      });
      this.changePhone(res);
    });
  }

  changeEmail(res) {
    const userEmail = res.email;
    const modifyBtn = document.getElementById("modify-email"),
      email = document.getElementById("email"),
      tdEmail = document.querySelector(".td-email");

    modifyBtn.addEventListener("click", () => {
      tdEmail.removeChild(email);
      tdEmail.innerHTML = `<input class="change-email" type="text" value="${userEmail}">`;
      tdEmail.innerHTML += `<p id="modify-email" class="modify-btn">확인</p>`;
      this.saveEmail(res)
    });
  }

  saveEmail(res) {
    const modifyBtn = document.getElementById("modify-email"),
      saveEmail = document.querySelector(".change-email"),
      tdEmail = document.querySelector(".td-email");

    modifyBtn.addEventListener("click", () => {
      tdEmail.removeChild(saveEmail);
      tdEmail.innerHTML = `<p id="email" class="contxt-title">${saveEmail.value}</p>`;
      tdEmail.innerHTML += `<p id="modify-email" class="modify-btn">수정</p>`;
      API.put("http://192.168.1.32:8000/account/user/email/", {
        email: `${saveEmail.value}`,
      });
      this.changeEmail(res);
    });
  }

}

export default MyInfoService;