import MyInfoView from "./myinfo.view.js"
import MyInfoController from "./myinfo.ctrl.js"
import MyInfoService from "./myinfo.service.js"
import LoginUser from './myinfo.model.js';



const app = new MyInfoController(new MyInfoService(), new MyInfoView());