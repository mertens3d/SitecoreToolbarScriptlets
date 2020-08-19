import { IOneGenericSetting } from "./IOneGenericSetting";
import { PopUpHub } from "../../../../PopUp/scripts/Managers/PopUpHub";

export interface IAccordianManager {
    AddAccordianDrone(PopHub: PopUpHub, oneSetting: IOneGenericSetting, uiElem: HTMLElement);
    RestoreAccordionState(oneSetting: IOneGenericSetting);
}
