import { ContentAtticManager } from '../Managers/ContentAtticManager';
import { ContentHub } from '../Managers/ContentHub';
import { MiscManager } from '../Managers/MiscManager';
import { OneScWindowManager } from "../Managers/OneScWindowManager";
import { PromiseOneStep } from '../Promises/PromiseOneStep';
import { ContentMessageManager } from '../Managers/ContentMessageManager';
import { MsgFlag } from '../../../Shared/scripts/Enums/MessageFlag';
import { ContentFactories } from "../Classes/ContentFactories";
import { ISharedConst } from '../../../Shared/scripts/Interfaces/ISharedConst';
import { SitecoreUiManager } from '../Managers/SitecoreUiManager';
import { HelperHub } from '../../../Shared/scripts/Helpers/Helpers';
import { IContentLoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/IContentLogger";

export class ContentManagerBase {
  protected ContentHub: ContentHub;
    ContentLogger: IContentLoggerAgent;

  constructor(contentHub: ContentHub, logger: IContentLoggerAgent) {
    this.ContentHub = contentHub;
    this.ContentLogger = logger;
  }

  AtticMan(): ContentAtticManager { return this.ContentHub.AtticMan; }
  //Const(): IContentConst { return this.ContentHub.Const; }
  Log(): IContentLoggerAgent { return this.ContentHub.Logger; }
  Helpers(): HelperHub { return this.ContentHub.Helpers; }
  OneScWinMan(): OneScWindowManager { return this.ContentHub.OneWindowMan; }
  ScUiMan(): SitecoreUiManager { return this.ContentHub.SitecoreUiMan; }
  MsgMan(): ContentMessageManager { return this.ContentHub.MsgMan; }
  ContentFactory(): ContentFactories { return this.ContentHub.ContentFactory; }
  MiscMan(): MiscManager { return this.ContentHub.MiscMan; }
  PromiseOneStep(): PromiseOneStep { return this.ContentHub.PromiseOneStep; }
  MsgFlag(): MsgFlag { return this.ContentHub.MessageFlag; }
  SharedConst(): ISharedConst { return this.ContentHub.SharedConst; }
  ReadyForMessages(): boolean { return this.ContentHub.ReadyForMessages; }
}