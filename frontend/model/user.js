const users = {
  id : ["abcde"],
  pw : ["1234"],
  name : ["박선아"],
  birth : ["1989-09-26"],
  phone : ["0101111111"],
  email : ["abc@gmail.com"]
}

class User {
  constructor() {
    this.id = ["abcde"];
    this.pw = ["1234"];
    this.name = ["박선아"];
    this.birth = ["1989-09-26"];
    this.phone = ["0202323232"];
    this.email = ["abc@gmail.com"];
  }

  signupUser(value) {
    this.id.push(value.id);
    this.pw.push(value.pw);
    this.name.push(value.name);
    this.birth.push(value.birth);
    this.phone.push(value.phone);
    this.email.push(value.email);
    console.log(this.id);
  }
}

export default User;