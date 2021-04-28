class User {
  constructor() {
    this.userInfo = {};
  }

  signupUser(value) {
    this.userInfo.user_id = value.id;
    this.userInfo.password = value.pw;
    this.userInfo.user_name = value.name;
    this.userInfo.birth_date = value.birth;
    this.userInfo.phone_number = value.phone;
    this.userInfo.email = value.email;
    // console.log(this.id);
  }
}

export default User;