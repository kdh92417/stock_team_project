import User from "../model/user.js";
import LoginView from "../view/login.view.js"
import LoginController from "../controller/login.ctrl.js";
import LoginService from "../service/login.service.js"
import API from '../api/api.js';
import MyInfoView from '../view/myinfo.view.js';

const loginApp = new LoginController(new LoginService(new User(), new API(new MyInfoView())), new LoginView());
