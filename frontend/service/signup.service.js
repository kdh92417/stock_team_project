import API from '../api/api.js'

class SignupService {
  constructor(user) {
    this.user = user
    this.api = new API();
    // console.log(this.user)
  }

  // ctrl에서 호출됨
  checkUser(value) {
    console.log(value);
    this.checkId(value);
    this.checkPw(value);
    this.checkNameAndBirth(value);
    this.checkPhoneAndEmail(value);
    this.user.signupUser(value);
    // console.log(this.user)
    this.api.postSignup(this.user.user);
  }

  checkId(value) {
    const user = this.user;
    let idReg = /^[A-za-z0-9]{5,15}$/g;

    if (value.id === "") {
      console.log("아이디를 입력해주세요")
    } else if (!idReg.test(value.id)) {
      console.log("잘못된 아이디입니다.");
    }
    // else if (user.id.includes(value.id)) {
    //   console.log("아이디 중복")
    // }
  }

  checkPw(value) {
    let pwReg = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/

    if (value.pw === "") {
      console.log("비밀번호를 입력해주세요")
    } else if (!pwReg.test(value.pw)) {
      console.log("잘못된 비밀번호입니다.")
    } else if (value.pw !== value.checkPw) {
      console.log("다름");
    }
  }

  checkNameAndBirth(value) {
    let nameReg = /^[가-힣]+$/;
    if (value.name === "") {
      console.log("이름을 입력해주세요")
    } else if (!nameReg.test(value.name)) {
      console.log("잘못된 이름입니다.")
    } else if (value.birth === "") {
      console.log("생년월일을 입력해주세요")
    }
  }

  checkPhoneAndEmail(value) {
    const user = this.user;
    let phoneReg = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/
    let emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/

    if (value.phone === "") {
      console.log("전화번호를 입력해주세요")
    } else if (!phoneReg.test(value.phone)) {
      console.log("잘못된 전화번호입니다.")
    } else if (value.email === "") {
      console.log("이메일을 입력해주세요")
    } else if (!emailReg.test(value.email)) {
      console.log("잘못된 이메일입니다.")
    }
    // else this.renderLogin();
    // else this.api.getLogin();
  }


}

export default SignupService;