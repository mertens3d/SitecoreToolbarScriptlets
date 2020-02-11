import { IDataBrowserWindow } from "./IDataBrowserWindow";

export interface iSitecoreUiManager {
  //AssignMenuWindowChanged( handler: Function) : void

  TopLevelWindow(): IDataBrowserWindow;
}