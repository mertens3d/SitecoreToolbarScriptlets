﻿import { ICommandHandlerDataForContent } from "../../ICommandHandlerDataForContent";

export interface IHindSiteScWindowApi {
  GetStateOfContent();
  AddCETab(commandData: ICommandHandlerDataForContent): Promise<void>
  AdminB();
  ToggleFavorite(commandData: ICommandHandlerDataForContent);
  OpenContentEditor();
  Ping();
  SetStateOfSitecoreWindow(commandData: ICommandHandlerDataForContent): Promise<void>;
  ToggleCompactCss(commandData: ICommandHandlerDataForContent);
  SaveWindowState(commandData: ICommandHandlerDataForContent): Promise<void>;
  RemoveSnapShot(commandData: ICommandHandlerDataForContent): Promise<void>;
  PublischActiveCE(commandData: ICommandHandlerDataForContent): Promise<void>;
  DebugForceAutoSnapShot(commandData: ICommandHandlerDataForContent): Promise<void>;
  //UpdateNickname(commandData: ICommandHndlrDataForContent): Promise<void>;
}