import { IOneGenericSetting } from "./IOneGenericSetting";

export interface IAccordianManager {
    AddAccordianDrone( oneSetting: IOneGenericSetting, uiElem: HTMLElement);
    RestoreAccordionState(oneSetting: IOneGenericSetting);
}
