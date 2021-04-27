

class SignupService {
  constructor(user, api) {
    this.user = user
    this.api = api;
    // console.log(this.user)
  }

  // ctrl에서 호출됨
  checkUser(value) {
    console.log(value);
    this.checkId(value);
    // console.log(this.user)
    this.api.postSignup(this.user.user);
  }

  checkId(value) {
    const user = this.user;
    let idReg = /^[A-za-z0-9]{5,15}$/g;

    try {
      if (value.id === "") {
        throw "아이디를 입력해주세요"
      } else if (!idReg.test(value.id)) {
        throw "잘못된 아이디입니다."
      } else this.checkPw(value);
    } catch (error) {
      alert(error);
    }
    // else if (user.id.includes(value.id)) {
    //   console.log("아이디 중복")
    // }
  }

  checkPw(value) {
    let pwReg = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{1,50}).{5,50}$/

    try {
      if (value.pw === "") {
        throw "비밀번호를 입력해주세요"
      } else if (!pwReg.test(value.pw)) {
        throw "잘못된 비밀번호입니다."
      } else if (value.pw !== value.checkPw) {
        throw "다름"
      } else this.checkNameAndBirth(value);
    } catch (error) {
      alert(error)
    }

  }

  checkNameAndBirth(value) {
    let nameReg = /^[가-힣]+$/;
    try {
      if (value.name === "") {
        throw "이름을 입력해주세요"
      } else if (!nameReg.test(value.name)) {
        throw "잘못된 이름입니다."
      } else if (value.birth === "") {
        throw "생년월일을 입력해주세요"
      } else this.checkPhoneAndEmail(value);
    } catch (error) {
      alert(error);
    }

  }

  checkPhoneAndEmail(value) {
    const user = this.user;
    let phoneReg = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/
    let emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/

    try {
      if (value.phone === "") {
        throw "전화번호를 입력해주세요"
      } else if (!phoneReg.test(value.phone)) {
        throw "잘못된 전화번호입니다."
      } else if (value.email === "") {
        throw "이메일을 입력해주세요"
      } else if (!emailReg.test(value.email)) {
        throw "잘못된 이메일입니다."
      } else this.user.signupUser(value);
    } catch (error) {
      alert(error);
    }
  }
}

export default SignupService;