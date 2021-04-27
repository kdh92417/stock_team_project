import API from '../../api/api.js';
import MyInfoView from '../../mypage/myinfo.view.js';
import Navbar from "../view/navbar.view.js"


const app = new Navbar(new API(new MyInfoView()));