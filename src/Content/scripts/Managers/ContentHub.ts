import { ContentAtticManager } from './ContentAtticManager';
import { MiscManager } from './MiscManager';
import { OneCEManager } from './OneCEManager';
import { OneDesktopManager } from './OneDesktopManager';
import { OneTreeManager } from './OneTreeManager';
import { OneScWindowManager } from "./OneScWindowManager";
import { PromiseHelper } from '../../../Shared/scripts/Classes/PromiseGeneric';
import { PromiseOneStep } from '../Promises/PromiseOneStep';
import { UtilityHelper } from "../../../Shared/scripts/Helpers/UtilityHelper";
import { ContentMessageManager } from './ContentMessageManager';
import { ContentDebug } from '../Classes/ContentDebug';
import { IContentConst } from '../../../Shared/scripts/Interfaces/IContentConst';
import { iSitecoreUiManager } from '../../../Shared/scripts/Interfaces/ISitecoreUiManager';
import { MsgFlag } from '../../../Shared/scripts/Enums/MessageFlag';
import { ContentConst } from '../../../Shared/scripts/Interfaces/InjectConst';
import { ContentFactories } from "../Classes/ContentFactories";
import { SharedConst } from '../../../Shared/scripts/SharedConst';
import { ISharedConst } from '../../../Shared/scripts/Interfaces/ISharedConst';
import { SitecoreUiManager } from './SitecoreUiManager';
import { HelperHub } from '../../../Shared/scripts/Helpers/Helpers';

export class ContentHub {
  AtticMan: ContentAtticManager;
  Const: IContentConst;
  debug: ContentDebug;

  Helpers: HelperHub;
  MsgMan: ContentMessageManager;
  MiscMan: MiscManager;
  OneWindowMan: OneScWindowManager;
  PromiseHelper: PromiseHelper;
  PromiseOneStep: PromiseOneStep;
  SitecoreUiMan: SitecoreUiManager;

  Utilities: UtilityHelper;
  MessageFlag: MsgFlag;
  ContentFactory: ContentFactories;
  SharedConst: ISharedConst;
  ReadyForMessages: boolean = false;

  constructor( debug: ContentDebug) {
    debug.FuncStart(ContentHub.name);
    this.debug = debug;
    this.Instantiate();
    debug.FuncEnd(ContentHub.name);
  }

  Instantiate() {
    this.debug.FuncStart(this.Instantiate.name);

    this.AtticMan = new ContentAtticManager(this);

    this.Helpers = new HelperHub(this.debug);
    this.MsgMan = new ContentMessageManager(this);
    this.MiscMan = new MiscManager(this);
    this.ContentFactory = new ContentFactories(this);
    

    this.debug.MarkerA();

    
    this.OneWindowMan = new OneScWindowManager(this);
    
    this.PromiseOneStep = new PromiseOneStep(this);


    this.SharedConst = SharedConst.SharedConst;

    this.SitecoreUiMan = new SitecoreUiManager(this);
    this.Init();

    this.debug.Log('ready for messages');
    this.ReadyForMessages = true;

    this.debug.FuncEnd(this.Instantiate.name);
  }
  Init() {
    this.debug.FuncStart(ContentHub.constructor.name + ' ' + this.Init.name);
    this.Const = ContentConst.Const;

    this.AtticMan.Init();
    this.MsgMan.Init();

    this.debug.Enabled = this.MsgMan.IsDebugEnabled();


    this.OneWindowMan.Init();

    this.debug.FuncEnd(ContentHub.constructor.name + ' ' + this.Init.name);
  }
}