import LoginView from "./login.view.js"
import LoginController from "./login.ctrl.js";
import LoginService from "./login.service.js"
import API from '../api/api.js';

const loginApp = new LoginController(new API(new LoginService()), new LoginView());
