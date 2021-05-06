import PortfolioView from "./portfolio.view.js";
import PortfolioService from "./portfolio.service.js";
import API from "../api/api.js";
import ShowPortfolioView from "./show_portfolio.view.js";
import ShowPortfolioController from "./show_portfolio.ctrl.js";

const showPortfolioApp = new ShowPortfolioController(new API(new ShowPortfolioView()));
