import BoardPortfolioController from './board_portfolio.ctrl.js';
import API from '../api/api.js';
import BoardPortfolioView from './board_portfolio.view.js'

const boardPortfolioApp = new BoardPortfolioController(new BoardPortfolioView());