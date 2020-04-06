import {DATASETS_URL} from "../configs/api-urls";
import {isNil} from "lodash";
import {BaseCrudService} from "./BaseCrudService";

export class DatasetsService extends BaseCrudService {

    /**
     * Sets the url for the resource this service works with.
     * @param applicationContext
     */
    constructor(applicationContext) {
        super(applicationContext);

        this.resourceUrl = DATASETS_URL;
    }

    buildBody({file, ...values}) {
        const body = new FormData();

        if (!isNil(file)) {
            body.append("file", file);
        }
        body.append('dataset', new Blob([JSON.stringify(values)], {
            type: "application/json"
        }));

        return body;
    }
}
