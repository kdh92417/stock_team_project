import SignupView from "../view/signup.view.js";
import SignupController from "../controller/signup.ctrl.js";
import SignupService from "../service/signup.service.js"
import User from "../model/user.js";

const signupApp = new SignupController(new SignupService(new User()), new SignupView());
