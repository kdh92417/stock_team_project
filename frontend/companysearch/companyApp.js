import CompanyView from "./company.view.js"
import CompanyCtrl from "./company.ctrl.js"
import CompanyService from "./company.service.js"



const app = new CompanyCtrl(new CompanyService(), new CompanyView());