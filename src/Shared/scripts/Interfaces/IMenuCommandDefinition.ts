import { MenuCommandKey } from "../Enums/2xxx-MenuCommand";
import { VisibilityType } from "../Enums/VisibilityType";
import { IEventHandlerData } from "./IEventHandlerData";
import { ModuleType } from "../Enums/ModuleType";

export interface IMenuCommandDefinition {
    PlaceHolderSelector: string;
    MenuCommandKey: MenuCommandKey;
    EventHandlerData: IEventHandlerData;
    IconClassName: string;
    InnerText: string;
    VisibilityControllers: VisibilityType[];
    ModuleType: ModuleType;
}
