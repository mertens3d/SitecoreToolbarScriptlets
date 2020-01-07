import { InjectConst } from '../Interfaces/InjectConst';
import { AtticManager } from '../Managers/AtticManager';
import { Debug } from '../Classes/debug';
import { EventManager } from '../Managers/EventManager';
import { FeedbackManager } from '../Managers/FeedbackManager';
import { GuidManager } from '../Managers/GuidManager';
import { LocationManager } from '../Managers/LocationManager';
import { MiscManager } from '../Managers/MiscManager';
import { OneCEManager } from '../Managers/OneCEManager';
import { OneDesktopManager } from '../Managers/OneDesktopManager';
import { OneTreeManager } from '../Managers/OneTreeManager';
import { OneWindowManager } from '../Managers/OneWindowManager';
import { PageDataManager } from '../Managers/PageDataManager';
import { PromiseGeneric } from '../Promises/PromiseGeneric';
import { PromiseOneStep } from '../Promises/PromiseOneStep';
import { UiManager } from '../Managers/UiManager';
import { Utilities } from '../Classes/Utilities';
import { iSitecoreUiManager } from '../interfaces/ISitecoreUiManager';
import { IConst } from '../Interfaces/IConst';
import { IDataBrowserWindow } from '../Interfaces/IDataBrowserWindow';

export class Hub {
  AtticMan: AtticManager;
  Const: IConst;
  debug: Debug;
  EventMan: EventManager;
  FeedbackMan: FeedbackManager;
  GuidMan: GuidManager;
  LocationMan: LocationManager;
  MiscMan: MiscManager;
  OneCEMan: OneCEManager;
  OneDesktopMan: OneDesktopManager;
  OneTreeMan: OneTreeManager;
  OneWindowMan: OneWindowManager;
  PageDataMan: PageDataManager;
  PromiseGeneric: PromiseGeneric;
  PromiseOneStep: PromiseOneStep;
  SitecoreUiMan: iSitecoreUiManager;
  UiMan: UiManager;
  Utilities: Utilities;

  constructor(sitecoreUiMan: iSitecoreUiManager, debug: Debug) {
    debug.FuncStart(Hub.name);
    this.debug = debug;
    this.SitecoreUiMan = sitecoreUiMan;
    this.Start();
    debug.FuncEnd(Hub.name);
  }



  Start() {
    this.debug.FuncStart(this.Start.name);

    this.AtticMan = new AtticManager(this);
    this.EventMan = new EventManager(this);
    this.FeedbackMan = new FeedbackManager(this);
    this.GuidMan = new GuidManager(this);
    this.LocationMan = new LocationManager(this);
    this.MiscMan = new MiscManager(this);
    this.OneCEMan = new OneCEManager(this);
    this.OneDesktopMan = new OneDesktopManager(this);
    this.OneTreeMan = new OneTreeManager(this);
    this.OneWindowMan = new OneWindowManager(this);
    this.PageDataMan = new PageDataManager(this);
    this.PromiseGeneric = new PromiseGeneric(this);
    this.PromiseOneStep = new PromiseOneStep(this);

    this.UiMan = new UiManager(this);
    this.Utilities = new Utilities(this);

    this.init();
    this.debug.FuncEnd(this.Start.name);
  }
  init() {
    this.debug.FuncStart(Hub.constructor.name + ' ' + this.init.name);
    this.Const = InjectConst.const;

    this.AtticMan.Init();
    this.debug.Enabled = this.AtticMan.CurrentSettings().DebugSettings.ShowDebugData;

    this.EventMan.Init();
    this.PageDataMan.Init();
    this.OneWindowMan.Init();

    this.UiMan.Init();

    this.debug.FuncEnd(Hub.constructor.name + ' ' + this.init.name);
  }


 

}

