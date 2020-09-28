import { SnapShotFlavor } from "../../../Enums/SnapShotFlavor";
import { IDataStateOfLiveHindSite } from "../../Data/States/IDataStateOfSitecoreWindow";
import { IApiCallPayload } from "../../ICommandHandlerDataForContent";

export interface IHindSiteScUiProxy {
  GetStateOfSitecoreWindow(Manual: SnapShotFlavor);
  OnReady_InitScWindowManager(): any;
  RaiseToastNotification(arg0: string): any;
  AddContentEditorToDesktopAsync(commandData: IApiCallPayload): Promise<void>
  AdminB(commandData: IApiCallPayload);
  GetStateOfScWindow();
  OpenContentEditor();
  PublischActiveCE(commandData: IApiCallPayload): Promise<void>;
  SetStateOfSitecoreWindowAsync(commandData: IApiCallPayload, dataOneWindowStorage: IDataStateOfLiveHindSite): Promise<void>;
  ToggleCompactCss(commandData: IApiCallPayload);
}