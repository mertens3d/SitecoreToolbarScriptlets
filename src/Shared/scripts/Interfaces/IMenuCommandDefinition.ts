import { MenuCommandKey } from "../Enums/20 - MenuCommand";
import { VisibilityType } from "../Enums/VisibilityType";
import { IEventHandlerData } from "./IEventHandlerData";
import { ModuleKey } from "../Enums/ModuleKey";

export interface IMenuCommandDefinition {
    PlaceHolderSelector: string;
    MenuCommandKey: MenuCommandKey;
    EventHandlerData: IEventHandlerData;
    IconClassName: string;
    InnerText: string;
    VisibilityControllers: VisibilityType[];
    ModuleKey: ModuleKey;
}
