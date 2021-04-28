import API from './api.js';
import LoginService from "../login/login.service.js"
import MyInfoView from "../mypage/myinfo.view.js"
import Navbar from "../main/view/navbar.view.js"

const app = new API(new MyInfoView(), new LoginService(), new Navbar());