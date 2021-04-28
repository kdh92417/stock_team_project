import User from "../main/model/user.js";
import LoginView from "./login.view.js"
import LoginController from "./login.ctrl.js";
import LoginService from "./login.service.js"
import API from '../api/api.js';
import MyInfoView from '../mypage/myinfo.view.js';

const loginApp = new LoginController(new LoginService(new User(), new API(new MyInfoView())), new LoginView());
