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
import { HelperAgent } from '../../../Shared/scripts/Helpers/Helpers';
import { IAllAgents } from '../../../Shared/scripts/Interfaces/Agents/IAllAgents';

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
  MsgMan(): ContentMessageManager { return this.ContentHub.MsgMan; }
  ContentFactory(): ContentFactories { return this.ContentHub.ContentFactory; }
  MiscMan(): MiscManager { return this.ContentHub.MiscMan; }
  PromiseOneStep(): PromiseOneStep { return this.ContentHub.PromiseOneStep; }
  MsgFlag(): MsgFlag { return this.ContentHub.MessageFlag; }
  SharedConst(): ISharedConst { return this.ContentHub.SharedConst; }
  ReadyForMessages(): boolean { return this.ContentHub.ReadyForMessages; }
}