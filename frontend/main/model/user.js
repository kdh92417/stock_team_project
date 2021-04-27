class User {
  constructor() {
    this.user = {};
  }

  signupUser(value) {
    this.user.user_id = value.id;
    this.user.password = value.pw;
    this.user.user_name = value.name;
    this.user.birth_date = value.birth;
    this.user.phone_number = value.phone;
    this.user.email = value.email;
    // console.log(this.id);
  }
}

export default User;