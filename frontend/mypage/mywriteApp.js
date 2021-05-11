import WriteView from "./mywrite.view.js"
import WriteCtrl from "./mywrite.ctrl.js"
import WriteService from "./mywrite.service.js"
import LoginUser from './myinfo.model.js'

const app = new WriteCtrl(new WriteService(), new WriteView());