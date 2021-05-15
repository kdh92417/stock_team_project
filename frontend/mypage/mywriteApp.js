import WriteView from "./mywrite.view.js"
import WriteCtrl from "./mywrite.ctrl.js"
import WriteService from "./mywrite.service.js"

const app = new WriteCtrl(new WriteService(), new WriteView());