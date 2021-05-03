import API from "../api/api.js"

class MyInfoService {

  saveCheckName(userName) {
    const tdName = document.querySelector(".td-name");

    tdName.innerHTML = `<input class="change-name" type="text" value=${userName}>`;
    tdName.innerHTML += `<p id="modify-name" class="modify-btn">확인</p>`;
    this.saveName(userName);
  }

  changeName(userName) {
    const modifyBtn = document.getElementById("modify-name"),
      name = document.getElementById("name"),
      tdName = document.querySelector(".td-name");

    modifyBtn.addEventListener("click", () => {
      tdName.removeChild(name);
      this.saveCheckName(userName);
    });
  }

  saveName(userName) {
    const modifyBtn = document.getElementById("modify-name"),
      saveName = document.querySelector(".change-name"),
      tdName = document.querySelector(".td-name");

    modifyBtn.addEventListener("click", () => {
      tdName.removeChild(saveName);
      let nameReg = /^[가-힣]+$/;
      try {
        if (saveName.value === "") {
          alert("이름을 입력해주세요")
          this.saveCheckName(userName);
        } else if (!nameReg.test(saveName.value)) {
          alert("잘못된 이름입니다.")
          this.saveCheckName(userName);
        } else {
          tdName.innerHTML = `<p id="name" class="contxt-title">${saveName.value}</p>`;
          tdName.innerHTML += `<p id="modify-name" class="modify-btn">수정</p>`;
          API.put("http://192.168.1.32:8000/account/user/name/", {
            user_name: `${saveName.value}`,
          })
          this.changeName(userName);
        }
      } catch (error) {
        alert(error);
      }
    });
  }

  changeBirth(userBirth) {
    const modifyBtn = document.getElementById("modify-birth"),
      birth = document.getElementById("birth"),
      tdBirth = document.querySelector(".td-birth");

    modifyBtn.addEventListener("click", () => {
      tdBirth.removeChild(birth);
      tdBirth.innerHTML = `<input class="change-birth" type="date" value=${userBirth}>`;
      tdBirth.innerHTML += `<p id="modify-birth" class="modify-btn">확인</p>`;
      this.saveBirth(userBirth);
    });
  }

  saveBirth(userBirth) {
    const modifyBtn = document.getElementById("modify-birth"),
      saveBirth = document.querySelector(".change-birth"),
      tdBirth = document.querySelector(".td-birth");
    modifyBtn.addEventListener("click", () => {

      tdBirth.removeChild(saveBirth);
      tdBirth.innerHTML = `<p id="birth" class="contxt-title">${saveBirth.value}</p>`;
      tdBirth.innerHTML += `<p id="modify-birth" class="modify-btn">수정</p>`;
      API.put("http://192.168.1.32:8000/account/user/birth-date/", {
        birth_date: `${saveBirth.value}`,
      });
      this.changeBirth(userBirth);
    });
  }


  saveCheckPhone(userPhone) {
    const tdPhone = document.querySelector(".td-phone");
    tdPhone.innerHTML = `<input class="change-phone" type="text" value="${userPhone}">`;
    tdPhone.innerHTML += `<p id="modify-phone" class="modify-btn">확인</p>`;
    this.savePhone(userPhone);
  }

  changePhone(userPhone) {
    const modifyBtn = document.getElementById("modify-phone"),
      phone = document.getElementById("phone"),
      tdPhone = document.querySelector(".td-phone");

    modifyBtn.addEventListener("click", () => {
      tdPhone.removeChild(phone);
      this.saveCheckPhone(userPhone);
    });
  }

  savePhone(userPhone) {
    const modifyBtn = document.getElementById("modify-phone"),
      savePhone = document.querySelector(".change-phone"),
      tdPhone = document.querySelector(".td-phone");

    modifyBtn.addEventListener("click", () => {
      tdPhone.removeChild(savePhone);
      let phoneReg = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/
      try {
        if (savePhone.value === "") {
          alert("전화번호를 입력해주세요")
          this.saveCheckPhone(userPhone);
        } else if (!phoneReg.test(savePhone.value)) {
          alert("잘못된 전화번호입니다.")
          this.saveCheckPhone(userPhone);
        } else {
          tdPhone.innerHTML = `<p id="phone" class="contxt-title">${savePhone.value}</p>`;
          tdPhone.innerHTML += `<p id="modify-phone" class="modify-btn">수정</p>`;
          API.put("http://192.168.1.32:8000/account/user/phone/", {
            phone_number: `${savePhone.value}`,
          });
          this.changePhone(userPhone);
        }
      } catch (error) {
        alert(error);
      }
    });
  }

  saveCheckEmail(userEmail) {
    const tdEmail = document.querySelector(".td-email");
    tdEmail.innerHTML = `<input class="change-email" type="email" value="${userEmail}">`;
    tdEmail.innerHTML += `<p id="modify-email" class="modify-btn">확인</p>`;
    this.saveEmail(userEmail)

  }

  changeEmail(userEmail) {
    const modifyBtn = document.getElementById("modify-email"),
      email = document.getElementById("email"),
      tdEmail = document.querySelector(".td-email");

    modifyBtn.addEventListener("click", () => {
      tdEmail.removeChild(email);
      this.saveCheckEmail(userEmail)
    });
  }

  saveEmail(userEmail) {
    const modifyBtn = document.getElementById("modify-email"),
      saveEmail = document.querySelector(".change-email"),
      tdEmail = document.querySelector(".td-email");

    modifyBtn.addEventListener("click", () => {
      tdEmail.removeChild(saveEmail);
      let emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/
      try {
        if (saveEmail.value === "") {
          alert("이메일을 입력해주세요");
          this.saveCheckEmail(userEmail);
        } else if (!emailReg.test(saveEmail.value)) {
          alert("잘못된 이메일입니다.");
          this.saveCheckEmail(userEmail);
        } else {
          tdEmail.innerHTML = `<p id="email" class="contxt-title">${saveEmail.value}</p>`;
          tdEmail.innerHTML += `<p id="modify-email" class="modify-btn">수정</p>`;
          API.put("http://192.168.1.32:8000/account/user/email/", {
            email: `${saveEmail.value}`,
          });
          this.changeEmail(userEmail);
        }
      } catch (error) {
        alert(error);
      }
    });
  }

}

export default MyInfoService;