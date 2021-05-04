import CompanyView from "../companysearch/company.view.js"
import CompanyCtrl from "../companysearch/company.ctrl.js"
import CompanyService from "../companysearch/company.service.js"



const app = new CompanyCtrl(new CompanyService(), new CompanyView());