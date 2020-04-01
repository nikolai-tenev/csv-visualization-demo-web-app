import {action, observable} from "mobx";

export class UiService {

    @observable
    drawerOpen = true;

    @action
    closeDrawer = () => {this.drawerOpen = false};

    @action
    openDrawer = () => {this.drawerOpen = true};
}
