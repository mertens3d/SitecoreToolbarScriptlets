import { SnapShotFlavor } from "../../../Enums/SnapShotFlavor";
import { IDataStateOfSitecoreWindow } from "../../Data/States/IDataStateOfSitecoreWindow";
import { IApiCallPayload } from "../../ICommandHandlerDataForContent";

export interface IHindSiteScUiProxy {
  GetStateOfSitecoreWindow(Manual: SnapShotFlavor);
  OnReadyInitScWindowManager(): any;
  RaiseToastNotification(arg0: string): any;
  AddCETabAsync(commandData: IApiCallPayload): Promise<void>
  AdminB(commandData: IApiCallPayload);
  GetStateOfScWindow();
  OpenContentEditor();
  PublischActiveCE(commandData: IApiCallPayload): Promise<void>;
  SetStateOfSitecoreWindowAsync(commandData: IApiCallPayload, dataOneWindowStorage: IDataStateOfSitecoreWindow): Promise<void>;
  ToggleCompactCss(commandData: IApiCallPayload);
}