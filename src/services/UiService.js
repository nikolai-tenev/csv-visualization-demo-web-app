import {action, observable} from "mobx";
import {uniqueId} from "lodash";
import {BaseService} from "./BaseService";

export class UiService extends BaseService {

    @observable
    drawerOpen = true;

    @observable
    snackbars = [];

    @action
    closeDrawer = () => {
        this.drawerOpen = false
    };

    @action
    openDrawer = () => {
        this.drawerOpen = true
    };

    @action
    closeSnackbar = (id) => {
        this.snackbars = this.snackbars.filter((el) => {
            return el.id !== id;
        })
    };

    @action
    showSuccessSnackbar = (snackbar) => {
        this.snackbars.push({
            ...snackbar,
            type: "success",
            id: uniqueId()
        });
    };

    @action
    showErrorSnackbar = (snackbar) => {
        this.snackbars.push({
            ...snackbar,
            type: "error",
            id: uniqueId()
        });
    };
}
