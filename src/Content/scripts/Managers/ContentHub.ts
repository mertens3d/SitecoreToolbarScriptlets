import { ContentAtticManager } from './ContentAtticManager';
import { MiscManager } from './MiscManager';
import { OneScWindowManager } from "./OneScWindowManager";
import { PromiseHelper } from '../../../Shared/scripts/Classes/PromiseGeneric';
import { PromiseOneStep } from '../Promises/PromiseOneStep';
import { UtilityHelper } from "../../../Shared/scripts/Helpers/UtilityHelper";
import { ContentMessageManager } from './ContentMessageManager';
import { LoggerContent } from "../Classes/LoggerContent";
import { IContentConst } from '../../../Shared/scripts/Interfaces/IContentConst';
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
  Logger: LoggerContent;

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

  constructor(logger: LoggerContent) {
    logger.FuncStart(ContentHub.name);
    this.Logger = logger;
    console.log('(ctor) logger enabled ' + this.Logger.EnabledStatus());
    this.Instantiate();
    logger.FuncEnd(ContentHub.name);
  }

  Instantiate() {
    this.Logger.FuncStart(this.Instantiate.name);

    this.AtticMan = new ContentAtticManager(this);

    this.Helpers = new HelperHub(this.Logger);
    this.MsgMan = new ContentMessageManager(this);
    this.MiscMan = new MiscManager(this);
    this.ContentFactory = new ContentFactories(this);

    this.Logger.MarkerA();

    this.OneWindowMan = new OneScWindowManager(this);

    this.PromiseOneStep = new PromiseOneStep(this);

    this.SharedConst = SharedConst.Const;

    this.SitecoreUiMan = new SitecoreUiManager(this);
    this.Init();

    this.Logger.Log('ready for messages');
    this.ReadyForMessages = true;

    this.Logger.FuncEnd(this.Instantiate.name);
  }
  Init() {
    this.Logger.FuncStart(ContentHub.constructor.name + ' ' + this.Init.name);
    this.Const = ContentConst.Const;

    this.AtticMan.Init();
    this.MsgMan.Init();

    this.Logger.SetEnabled(this.MsgMan.IsLogEnabled());

    this.OneWindowMan.Init();

    this.Logger.FuncEnd(ContentHub.constructor.name + ' ' + this.Init.name);
  }
}