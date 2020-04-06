import {UiService} from "./UiService";
import {DatasetsService} from "./DatasetsService";
import {ApplicationService} from "./ApplicationService";
import {VisualizationsService} from "./VisualizationsService";

class ApplicationContext {

    constructor() {
        this.applicationService = new ApplicationService(this);
        this.applicationService.init();

        this.uiService = new UiService(this);
        this.uiService.init();

        this.datasetsService = new DatasetsService(this);
        this.datasetsService.init();

        this.visualizationsService = new VisualizationsService(this);
        this.visualizationsService.init();
    }
}

const applicationContext = new ApplicationContext();

export {applicationContext};
