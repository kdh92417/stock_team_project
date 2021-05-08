import SearchView from './search.view.js'
import SearchCtrl from './search.ctrl.js'
import SearchService from './search.service.js'

const app = new SearchCtrl(new SearchService(), new SearchView());