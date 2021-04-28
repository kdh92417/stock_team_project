import MyInfoView from "./myinfo.view.js"
import MyInfoController from "./myinfo.ctrl.js"
import MyInfoService from "./myinfo.service.js"
import API from "../api/api.js"

const app = new MyInfoController(new MyInfoService(new API(new MyInfoView())));