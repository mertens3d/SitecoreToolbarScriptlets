import { IGenericSetting } from "./IGenericSetting";

export interface IAccordianManager {
    AddAccordianDrone( oneSetting: IGenericSetting, uiElem: HTMLElement);
    RestoreAccordionState(oneSetting: IGenericSetting);
}
