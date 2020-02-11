import { ContentAtticManager } from '../Managers/ContentAtticManager';
import { ContentHub } from '../Managers/ContentHub';
import { iSitecoreUiManager } from '../../../Shared/scripts/Interfaces/ISitecoreUiManager';
import { MiscManager } from '../Managers/MiscManager';
import { OneCEManager } from '../Managers/OneCEManager';
import { OneDesktopManager } from '../Managers/OneDesktopManager';
import { OneWindowManager } from '../Managers/OneWindowManager';
import { PromiseHelper } from '../../../Shared/scripts/Classes/PromiseGeneric';

import { UtilityHelper } from '../../../Shared/scripts/Classes/Utilities';
import { IContentConst } from '../../../Shared/scripts/Interfaces/IContentConst';
import { PromiseOneStep } from '../Promises/PromiseOneStep';
import { ContentMessageManager } from '../Managers/ContentMessageManager';
import { ContentDebug } from '../Classes/ContentDebug';
import { MsgFlag } from '../../../Shared/scripts/Enums/MessageFlag';
import { Factories } from '../Classes/Factories';
import { SharedConst } from '../../../Shared/scripts/SharedConst';
import { ISharedConst } from '../../../Shared/scripts/Interfaces/ISharedConst';
import { SitecoreUiManager } from '../Managers/SitecoreUiManager';
import { HelperHub } from '../../../Shared/scripts/Helpers/Helpers';

export class ContentManagerBase {
  protected ContentHub: ContentHub;

  constructor(contentHub: ContentHub) {
    this.ContentHub = contentHub;
  }

  AtticMan(): ContentAtticManager { return this.ContentHub.AtticMan; }
  Const(): IContentConst { return this.ContentHub.Const; }
  debug(): ContentDebug { return this.ContentHub.debug; }
  DesktopMan(): OneDesktopManager { return this.ContentHub.OneDesktopMan; }
  Helpers(): HelperHub { return this.ContentHub.Helpers; }
  OneCEMan(): OneCEManager { return this.ContentHub.OneCEMan; }
  OneWinMan(): OneWindowManager { return this.ContentHub.OneWindowMan; }
  MsgMan(): ContentMessageManager { return this.ContentHub.MsgMan; }
  Utilites(): UtilityHelper { return this.ContentHub.Utilities; }
  Factoryman(): Factories { return this.ContentHub.Factory; }
  MiscMan(): MiscManager { return this.ContentHub.MiscMan; }
  PromiseGen(): PromiseHelper { return this.ContentHub.PromiseHelper; }
  PromiseOneStep(): PromiseOneStep { return this.ContentHub.PromiseOneStep; }
  ScUiMan(): SitecoreUiManager { return this.ContentHub.SitecoreUiMan; }
  MsgFlag(): MsgFlag { return this.ContentHub.MessageFlag; }
  SharedConst(): ISharedConst { return this.ContentHub.SharedConst; }
  ReadyForMessages(): boolean { return this.ContentHub.ReadyForMessages; }
}