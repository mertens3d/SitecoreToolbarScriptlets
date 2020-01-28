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
import { MessagesManager } from '../Managers/MessagesManager';
import { ContentDebug } from '../Classes/ContentDebug';
import { GuidHelper } from '../../../Shared/scripts/Classes/GuidHelper';
import { MsgFlag } from '../../../Shared/scripts/Enums/MessageFlag';
import { Factories } from '../Classes/Factories';

export class ContentManagerBase {
  Xyyz: ContentHub;

  constructor(xyyz: ContentHub) {
    this.Xyyz = xyyz;
  }

  AtticMan(): ContentAtticManager { return this.Xyyz.AtticMan; }
  Const(): IContentConst { return this.Xyyz.Const; }
  debug(): ContentDebug { return this.Xyyz.debug; }
  DesktopMan(): OneDesktopManager { return this.Xyyz.OneDesktopMan; }
  GuidMan(): GuidHelper { return this.Xyyz.GuidMan; }
  locMan(): LocationManager { return this.Xyyz.LocationMan; }
  OneCEMan(): OneCEManager { return this.Xyyz.OneCEMan; }
  OneWinMan(): OneWindowManager { return this.Xyyz.OneWindowMan; }
  PageDataMan(): PageDataManager { return this.Xyyz.PageDataMan; }
  MsgMan(): MessagesManager { return this.Xyyz.MsgMan; }
  Utilites(): Utilities { return this.Xyyz.Utilities; }
  Factoryman(): Factories { return this.Xyyz.Factory; }
  MiscMan(): MiscManager { return this.Xyyz.MiscMan; }
  PromiseGen(): PromiseGeneric { return this.Xyyz.PromiseGeneric; }
  PromiseOneStep(): PromiseOneStep { return this.Xyyz.PromiseOneStep; }
  ScUiMan(): iSitecoreUiManager { return this.Xyyz.SitecoreUiMan; }
  MsgFlag(): MsgFlag { return this.Xyyz.MessageFlag; }
}