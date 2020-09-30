import { SnapShotFlavor } from "../../../Enums/SnapShotFlavor";
import { IStateOfScUiProxy } from "../../Data/States/IDataStateOfSitecoreWindow";
import { IApiCallPayload } from "../../ICommandHandlerDataForContent";

export interface IHindSiteScUiProxy {
  GetStateOfScUiProxyWindow(Manual: SnapShotFlavor);
  OnReady_InstantiateHindSiteScUiProxy(): any;
  RaiseToastNotification(arg0: string): any;
  AddContentEditorToDesktopAsync(commandData: IApiCallPayload): Promise<void>
  AdminB(commandData: IApiCallPayload);
  GetStateOfScUiProxy(): Promise<IStateOfScUiProxy> ;
  OpenContentEditor();
  PublischActiveCE(commandData: IApiCallPayload): Promise<void>;
  SetStateOfSitecoreWindowAsync(commandData: IApiCallPayload, dataOneWindowStorage: IStateOfScUiProxy): Promise<void>;
  ToggleCompactCss(commandData: IApiCallPayload);
}