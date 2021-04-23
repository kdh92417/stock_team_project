import User from "../model/user.js";
import LoginView from "../view/view.js/login.view.js"
import LoginController from "../controller/login.ctrl.js";
import LoginService from "../service/login.service.js"

const loginApp = new LoginController(new LoginService(new User()), new LoginView());
