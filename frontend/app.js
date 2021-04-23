import SignupView from "./view/view.js/signup.js";
import Controller from "./controller/signup.ctrl.js";
import SignupService from "./service/signup.service.js"
import User from "./model/user.js";

// const app = new Controller(new SignupService(new User()), new SignupView());

class App {
  constructor() {
    this.signUp();
  }
  signUp() {
    new Controller(new SignupService(new User()), new SignupView())
  }
}

