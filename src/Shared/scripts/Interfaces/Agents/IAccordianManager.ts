import { IHindSiteSetting } from "./IGenericSetting";

export interface IAccordianManager {
    AddAccordianDrone( oneSetting: IHindSiteSetting, uiElem: HTMLElement);
    RestoreAccordionState(oneSetting: IHindSiteSetting);
}
