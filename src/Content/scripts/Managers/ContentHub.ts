import { ContentAtticManager } from './ContentAtticManager';
import { LocationManager } from './LocationManager';
import { MiscManager } from './MiscManager';
import { OneCEManager } from './OneCEManager';
import { OneDesktopManager } from './OneDesktopManager';
import { OneTreeManager } from './OneTreeManager';
import { OneWindowManager } from './OneWindowManager';
import { PageDataManager } from './PageDataManager';
import { PromiseGeneric } from '../Promises/PromiseGeneric';
import { PromiseOneStep } from '../Promises/PromiseOneStep';
import { Utilities } from '../../../Shared/scripts/Classes/Utilities';
import { MessagesManager } from './MessagesManager';
import { ContentDebug } from '../Classes/ContentDebug';
import { IContentConst } from '../../../Shared/scripts/Interfaces/IContentConst';
import { GuidHelper } from '../../../Shared/scripts/Classes/GuidHelper';
import { iSitecoreUiManager } from '../../../Shared/scripts/Interfaces/ISitecoreUiManager';
import { MsgFlag } from '../../../Shared/scripts/Enums/MessageFlag';
import { InjectConst } from '../../../Shared/scripts/Interfaces/InjectConst';
import { Factories } from '../Classes/Factories';

export class ContentHub {
  AtticMan: ContentAtticManager;
  Const: IContentConst;
  debug: ContentDebug;

  GuidMan: GuidHelper;
  LocationMan: LocationManager;
  MsgMan: MessagesManager;
  MiscMan: MiscManager;
  OneCEMan: OneCEManager;
  OneDesktopMan: OneDesktopManager;
  OneTreeMan: OneTreeManager;
  OneWindowMan: OneWindowManager;
  PageDataMan: PageDataManager;
  PromiseGeneric: PromiseGeneric;
  PromiseOneStep: PromiseOneStep;
  SitecoreUiMan: iSitecoreUiManager;

  Utilities: Utilities;
  MessageFlag: MsgFlag;
  Factory: Factories;

  constructor(sitecoreUiMan: iSitecoreUiManager, debug: ContentDebug) {
    debug.FuncStart(ContentHub.name);
    this.debug = debug;
    this.SitecoreUiMan = sitecoreUiMan;
    this.Init();
    debug.FuncEnd(ContentHub.name);
  }

  Init() {
    this.debug.FuncStart(this.Init.name);

    this.AtticMan = new ContentAtticManager(this);

    this.GuidMan = new GuidHelper();
    this.LocationMan = new LocationManager(this);
    this.MsgMan = new MessagesManager(this);
    this.MiscMan = new MiscManager(this);
    this.OneCEMan = new OneCEManager(this);
    this.OneDesktopMan = new OneDesktopManager(this);
    this.OneTreeMan = new OneTreeManager(this);
    this.OneWindowMan = new OneWindowManager(this);
    this.PageDataMan = new PageDataManager(this);
    this.PromiseGeneric = new PromiseGeneric(this);
    this.PromiseOneStep = new PromiseOneStep(this);
    this.Factory = new Factories(this);

    this.Utilities = new Utilities(this.debug);

    this.init();
    this.debug.FuncEnd(this.Init.name);
  }
  init() {
    this.debug.FuncStart(ContentHub.constructor.name + ' ' + this.init.name);
    this.Const = InjectConst.ContConst;

    this.AtticMan.Init();
    this.debug.Enabled = this.MsgMan.IsDebugEnabled();

    this.PageDataMan.Init();
    this.OneWindowMan.Init();

    this.MsgMan.Init();

    this.debug.FuncEnd(ContentHub.constructor.name + ' ' + this.init.name);
  }
}