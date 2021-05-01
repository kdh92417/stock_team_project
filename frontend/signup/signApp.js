import SignupView from "./signup.view.js";
import SignupController from "./signup.ctrl.js";
import SignupService from "./signup.service.js"
import User from "../main/model/user.js";
import API from '../api/api.js';


const signupApp = new SignupController(new SignupService(new User(), new API()), new SignupView());
