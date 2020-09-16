import { MenuCommandKey } from "../Enums/2xxx-MenuCommand";
import { VisibilityType } from "../Enums/VisibilityType";
import { IEventHandlerData } from "./IEventHandlerData";
import { ModuleType } from "../Enums/ModuleType";

export interface IMenuCommandParamsBucket {

  MenuCommandParamsAr: IMenuCommandParams[];
}
export interface IMenuCommandParams {
  PlaceHolderSelector: string,
  MenuCommandKey: MenuCommandKey,
  EventData: IEventHandlerData,
  IconClassName: string,
  InnerText: string
  VisibilityControllers: VisibilityType[],
  ModuleType: ModuleType,
}