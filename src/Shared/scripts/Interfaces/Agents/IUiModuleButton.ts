import { SingleClickEvent_Subject } from "../../../../PopUpUi/scripts/Events/SingleClickEvent/SingleClickEvent_Subject";
import { IUiModule } from "./IUiModule";

export interface IUiModuleButton extends IUiModule {
    SingleButtonClickEvent_Subject: SingleClickEvent_Subject;

}
