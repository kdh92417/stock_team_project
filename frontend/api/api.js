import { sendRequest } from '../lib/ajax.js';


class API {

    getLogin() {
        console.log("실행")
        let url = '/asd';
        let response = sendRequest('GET', url);

        return response;
    }

}

export default API;