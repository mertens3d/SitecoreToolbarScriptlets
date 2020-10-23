import { IToApiCallPayload } from "../../IApiCallPayload";
import { IScUiReturnPayload } from "../../StateOf/IScUiReturnPayload";

export interface IHindSiteScUiProxy {
  StartUp():Promise<void>;
  APICommand(commandData: IToApiCallPayload): Promise<IScUiReturnPayload>;
  //CEGoSelected(apiCallPayload: IApiCallPayload): Promise<IScUiReturnPayload>;
  //TriggerCERibbonCommand(apiCallPayload: IApiCallPayload): Promise<IScUiReturnPayload>;
  //AddContentEditorToDesktopAsync(apiCallPayload: IApiCallPayload): Promise<IScUiReturnPayload>;
  //AdminB(apiCallPayload: IApiCallPayload): Promise<IScUiReturnPayload>;
  //GetStateOfScUiProxy(apiCallPayload: IApiCallPayload): Promise<IScUiReturnPayload>;
  //OpenContentEditor(apiCallPayload: IApiCallPayload): Promise<IScUiReturnPayload>;
  //PublischActiveCE(apiCallPayload: IApiCallPayload): Promise<IScUiReturnPayload>;
  //SetStateOfSitecoreWindowAsync(apiCallPayload: IApiCallPayload): Promise<IScUiReturnPayload>;
  //ToggleCompactCss(apiCallPayload: IApiCallPayload): Promise<IScUiReturnPayload>;
}