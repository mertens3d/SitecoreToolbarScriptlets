import { IStateOfScUi } from "../../Data/States/IDataStateOfSitecoreWindow";
import { IApiCallPayload } from "../../IApiCallPayload";
import { SnapShotFlavor } from "../../../Enums/SnapShotFlavor";

export interface IHindSiteScUiAPI {
  TriggerCERibbonCommand: Function;
  AddContentEditorToDesktopAsync(commandData: IApiCallPayload): Promise<void>
  AdminB(commandData: IApiCallPayload);
  GetStateOfScUiProxy(): Promise<IStateOfScUi>;
  GetStateOfScUiProxyWindow(Manual: SnapShotFlavor);
  InstantiateHindSiteScUiProxy(): Promise<void>;
  OpenContentEditor();
  PublischActiveCE(commandData: IApiCallPayload): Promise<void>;
  SetStateOfSitecoreWindowAsync(commandData: IApiCallPayload, dataOneWindowStorage: IStateOfScUi): Promise<void>;
  ToggleCompactCss(commandData: IApiCallPayload);
}