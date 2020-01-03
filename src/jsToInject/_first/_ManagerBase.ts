import { AtticManager } from '../Managers/AtticManager';
import { Debug } from '../Classes/debug';
import { EventManager } from '../Managers/EventManager';
import { FeedbackManager } from '../Managers/FeedbackManager';
import { GuidManager } from '../Managers/GuidManager';
import { Hub } from '../Managers/Hub';
import { iSitecoreUiManager } from '../interfaces/ISitecoreUiManager';
import { IterationHelper } from '../Classes/IterationHelper';
import { LocationManager } from '../Managers/LocationManager';
import { MiscManager } from '../Managers/MiscManager';
import { OneCEManager } from '../Managers/OneCEManager';
import { OneDesktopManager } from '../Managers/OneDesktopManager';
import { OneWindowManager } from '../Managers/OneWindowManager';
import { PageDataManager } from '../Managers/PageDataManager';
import { PromiseChainQuickPublish } from '../Promises/PromiseChainQuickPublish';
import { PromiseChainRestoreDesktop } from '../Promises/PromiseChainRestoreDesktop';
import { PromiseGeneric } from '../Promises/PromiseGeneric';
import { SitecoreUiManager } from '../Managers/SitecoreUiManager';
import { UiManager } from '../Managers/UiManager';
import { Utilities } from '../Classes/Utilities';
import { scWindowType } from '../Enums/WindowType';
import { IConst } from '../Interfaces/IConst';
import { PromiseOneStep } from '../Promises/PromiseOneStep';

export class ManagerBase {
  Xyyz: Hub;

  constructor(xyyz: Hub) {
    this.Xyyz = xyyz;
  }

  AtticMan(): AtticManager { return this.Xyyz.AtticMan; }
  Const(): IConst { return this.Xyyz.Const; }
  debug(): Debug { return this.Xyyz.debug; }
  DesktopMan(): OneDesktopManager { return this.Xyyz.OneDesktopMan; }
  GuidMan(): GuidManager { return this.Xyyz.GuidMan; }
  locMan(): LocationManager { return this.Xyyz.LocationMan; }
  OneCEMan(): OneCEManager { return this.Xyyz.OneCEMan; }
  OneWinMan(): OneWindowManager { return this.Xyyz.OneWindowMan; }
  PageDataMan(): PageDataManager { return this.Xyyz.PageDataMan; }
  UiMan(): UiManager { return this.Xyyz.UiMan; }
  Utilites(): Utilities { return this.Xyyz.Utilities; }
  MiscMan(): MiscManager { return this.Xyyz.MiscMan; }
  PromiseGen(): PromiseGeneric { return this.Xyyz.PromiseGeneric; }
  PromiseOneStep(): PromiseOneStep { return this.Xyyz.PromiseOneStep; }
  ScUiMan(): iSitecoreUiManager { return this.Xyyz.SitecoreUiMan; }
}