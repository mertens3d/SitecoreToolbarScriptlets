import { ContentAtticManager } from '../Managers/ContentAtticManager';
import { ContentHub } from '../Managers/ContentHub';
import { iSitecoreUiManager } from '../../../Shared/scripts/Interfaces/ISitecoreUiManager';
import { LocationManager } from '../Managers/LocationManager';
import { MiscManager } from '../Managers/MiscManager';
import { OneCEManager } from '../Managers/OneCEManager';
import { OneDesktopManager } from '../Managers/OneDesktopManager';
import { OneWindowManager } from '../Managers/OneWindowManager';
import { PageDataManager } from '../Managers/PageDataManager';
import { PromiseGeneric } from '../Promises/PromiseGeneric';

import { Utilities } from '../../../Shared/scripts/Classes/Utilities';
import { IContentConst } from '../../../Shared/scripts/Interfaces/IContentConst';
import { PromiseOneStep } from '../Promises/PromiseOneStep';
import { ContentMessageManager } from '../Managers/ContentMessageManager';
import { ContentDebug } from '../Classes/ContentDebug';
import { GuidHelper } from '../../../Shared/scripts/Classes/GuidHelper';
import { MsgFlag } from '../../../Shared/scripts/Enums/MessageFlag';
import { Factories } from '../Classes/Factories';
import { PromiseHelper } from '../../../Shared/scripts/Classes/PromiseHelper';
import { SharedConst } from '../../../Shared/scripts/SharedConst';
import { ISharedConst } from '../../../Shared/scripts/Interfaces/ISharedConst';

export class ContentManagerBase {
  protected ContentHub: ContentHub;

  constructor(contentHub: ContentHub) {
    this.ContentHub = contentHub;
  }

  AtticMan(): ContentAtticManager { return this.ContentHub.AtticMan; }
  Const(): IContentConst { return this.ContentHub.Const; }
  debug(): ContentDebug { return this.ContentHub.debug; }
  DesktopMan(): OneDesktopManager { return this.ContentHub.OneDesktopMan; }
  GuidMan(): GuidHelper { return this.ContentHub.GuidMan; }
  locMan(): LocationManager { return this.ContentHub.LocationMan; }
  OneCEMan(): OneCEManager { return this.ContentHub.OneCEMan; }
  OneWinMan(): OneWindowManager { return this.ContentHub.OneWindowMan; }
  PageDataMan(): PageDataManager { return this.ContentHub.PageDataMan; }
  MsgMan(): ContentMessageManager { return this.ContentHub.MsgMan; }
  Utilites(): Utilities { return this.ContentHub.Utilities; }
  Factoryman(): Factories { return this.ContentHub.Factory; }
  MiscMan(): MiscManager { return this.ContentHub.MiscMan; }
  PromiseGen(): PromiseGeneric { return this.ContentHub.PromiseGeneric; }
  PromiseOneStep(): PromiseOneStep { return this.ContentHub.PromiseOneStep; }
  ScUiMan(): iSitecoreUiManager { return this.ContentHub.SitecoreUiMan; }
  MsgFlag(): MsgFlag { return this.ContentHub.MessageFlag; }
  PromiseHelper(): PromiseHelper { return this.ContentHub.PromiseHelper; }
  SharedConst(): ISharedConst { return this.ContentHub.SharedConst; }
  ReadyForMessages(): boolean { return this.ContentHub.ReadyForMessages; }
}