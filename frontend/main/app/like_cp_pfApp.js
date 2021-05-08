import LikeCpPfCtrl from "../controller/like_cp_pf.ctrl.js"
import LikeCpPfService from "../service/like_cp_pf.service.js"
import LikeCpPfView from "../view/like_cp_pf.view.js"

const likeApp = new LikeCpPfCtrl(new LikeCpPfService(), new LikeCpPfView());