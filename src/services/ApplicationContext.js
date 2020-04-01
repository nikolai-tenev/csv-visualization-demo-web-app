import {UiService} from "./UiService";

class ApplicationContext {

    constructor() {
        this.uiService = new UiService();
    }
}

const applicationContext = new ApplicationContext();

export {applicationContext};
