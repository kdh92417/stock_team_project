import ShowPortfolioView from "./show_portfolio.view.js";
import ShowPortfolioController from "./show_portfolio.ctrl.js";
import Comment from "../main/model/comment.js";

const showPortfolioApp = new ShowPortfolioController(new ShowPortfolioView(new Comment()));
