import { IStateOfScUi } from "../../StateOf/IDataStateOfSitecoreWindow";
import { IApiCallPayload } from "../../IApiCallPayload";
import { SnapShotFlavor } from "../../../Enums/SnapShotFlavor";
import { ScRibbonCommand } from "../../../Enums/eScRibbonCommand";

export interface IHindSiteScUiProxy {
  CEGoSelected(commandData: IApiCallPayload): Promise<void>;
  TriggerCERibbonCommand(scRibbonCommand: ScRibbonCommand): Promise<void>;
  AddContentEditorToDesktopAsync(commandData: IApiCallPayload): Promise<void>;
  AdminB(commandData: IApiCallPayload): void;
  GetStateOfScUiProxy(): Promise<IStateOfScUi>;
  GetStateOfScUiProxyWindow(Manual: SnapShotFlavor): Promise<IStateOfScUi>;
  InstantiateHindSiteScUiProxy(): Promise<void>;
  OpenContentEditor(): Promise<void>;
  PublischActiveCE(commandData: IApiCallPayload): Promise<void>;
  SetStateOfSitecoreWindowAsync(commandData: IApiCallPayload, dataOneWindowStorage: IStateOfScUi): Promise<void>;
  ToggleCompactCss(commandData: IApiCallPayload): Promise<void>;
}