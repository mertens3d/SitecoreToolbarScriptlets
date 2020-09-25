import { ICommandHandlerDataForContent } from "../ICommandHandlerDataForContent";
import { IFactoryApi } from "../Agents/IFactoryApi";

export interface IHindSiteScWindowApi {
  //UpdateNickname(commandData: ICommandHndlrDataForContent): Promise<void>;
  AddCETab(commandData: ICommandHandlerDataForContent): Promise<void>
  AdminB();
  DebugForceAutoSnapShot(commandData: ICommandHandlerDataForContent): Promise<void>;
  GetStateOfContent();
  OpenContentEditor();
  Ping();
  PublischActiveCE(commandData: ICommandHandlerDataForContent): Promise<void>;
  readonly Factory: IFactoryApi;
  RemoveSnapShot(commandData: ICommandHandlerDataForContent): Promise<void>;
  SaveWindowState(commandData: ICommandHandlerDataForContent): Promise<void>;
  SetNickName(commandData: ICommandHandlerDataForContent): Promise<void>;
  SetStateOfSitecoreWindow(commandData: ICommandHandlerDataForContent): Promise<void>;
  ToggleCompactCss(commandData: ICommandHandlerDataForContent);
  ToggleFavorite(commandData: ICommandHandlerDataForContent);

}