import { MsgFlag } from '../../../Shared/scripts/Enums/1xxx-MessageFlag';
import { IAllAgents } from '../../../Shared/scripts/Interfaces/Agents/IAllAgents';
import { ISharedConst } from '../../../Shared/scripts/Interfaces/ISharedConst';
import { ContentStateManager } from "../Classes/ContentStateManager/ContentStateManager";
import { ContentAPIManager } from '../Managers/ContentAPIManager/ContentAPIManager';
import { ContentAtticManager } from '../Managers/ContentAtticManager/ContentAtticManager';
import { ContentHub } from '../Managers/ContentHub/ContentHub';
import { ContentMessageManager } from '../Managers/ContentMessageManager/ContentMessageManager';
import { MiscManager } from '../Managers/MiscManager/MiscManager';
import { OneScWindowManager } from "../Managers/OneScWindowManager";
import { SitecoreUiManager } from '../Managers/SitecoreUiManager/SitecoreUiManager';
import { PromiseOneStep } from '../Promises/PromiseOneStep';

export class ContentManagerBase {
  protected ContentHub: ContentHub;
  AllAgents: IAllAgents;

  constructor(contentHub: ContentHub, allAgents: IAllAgents) {
    this.ContentHub = contentHub;
    this.AllAgents = allAgents;
  }

  AtticMan(): ContentAtticManager { return this.ContentHub.AtticMan; }
  OneScWinMan(): OneScWindowManager { return this.ContentHub.OneWindowMan; }
  ScUiMan(): SitecoreUiManager { return this.ContentHub.SitecoreUiMan; }
  MsgMan(): ContentMessageManager { return this.ContentHub.ContentMessageMan; }
  ContentFactory(): ContentStateManager { return this.ContentHub.ContentFactory; }
  MiscMan(): MiscManager { return this.ContentHub.MiscMan; }
  PromiseOneStep(): PromiseOneStep { return this.ContentHub.PromiseOneStep; }
  MsgFlag(): MsgFlag { return this.ContentHub.MessageFlag; }
  SharedConst(): ISharedConst { return this.ContentHub.SharedConst; }
  APIMan(): ContentAPIManager { return this.ContentHub.ContentAPIMan; }
}