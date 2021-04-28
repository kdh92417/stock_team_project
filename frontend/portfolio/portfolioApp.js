import PortfolioView from "./portfolio.view.js";
import PortfolioController from "./portfolio.ctrl.js";
import PortfolioService from "./portfolio.service.js";
import API from "../api/api.js"

const portfolioApp = new PortfolioController(new PortfolioService(), new PortfolioView(new API()));