import { ContentAtticManager } from './ContentAtticManager';
import { MiscManager } from './MiscManager';
import { OneScWindowManager } from "./OneScWindowManager";
import { PromiseHelper } from '../../../Shared/scripts/Classes/PromiseGeneric';
import { PromiseOneStep } from '../Promises/PromiseOneStep';
import { UtilityHelper } from "../../../Shared/scripts/Helpers/UtilityHelper";
import { ContentMessageManager } from './ContentMessageManager';
import { IContentConst } from '../../../Shared/scripts/Interfaces/IContentConst';
import { MsgFlag } from '../../../Shared/scripts/Enums/MessageFlag';
import { ContentConst } from '../../../Shared/scripts/Interfaces/InjectConst';
import { ContentFactories } from "../Classes/ContentFactories";
import { SharedConst } from '../../../Shared/scripts/SharedConst';
import { ISharedConst } from '../../../Shared/scripts/Interfaces/ISharedConst';
import { SitecoreUiManager } from './SitecoreUiManager';
import { HelperHub } from '../../../Shared/scripts/Helpers/Helpers';
import { IAllConentAgents } from '../../../Shared/scripts/Interfaces/Agents/IAllConentAgents';
import { AllHelperAgents } from '../../../Shared/scripts/Classes/AllHelperAgents';

export class ContentHub {
  AtticMan: ContentAtticManager;
  Const: IContentConst;
  ContentAgents: IAllConentAgents;

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

  constructor(contentAgents: IAllConentAgents) {
    this.ContentAgents = contentAgents;
    this.ContentAgents.Logger.FuncStart(ContentHub.name);
    console.log('(ctor) logger enabled ' + this.ContentAgents.Logger.EnabledStatus());
    this.Instantiate();
    this.ContentAgents.Logger.FuncEnd(ContentHub.name);
  }

  Instantiate() {
    this.ContentAgents.Logger.FuncStart(this.Instantiate.name);

    this.AtticMan = new ContentAtticManager(this, this.ContentAgents);



    this.Helpers = new HelperHub(this.ContentAgents.HelperAgents    );
    this.MsgMan = new ContentMessageManager(this, this.ContentAgents);
    this.MiscMan = new MiscManager(this, this.ContentAgents);
    this.ContentFactory = new ContentFactories(this, this.ContentAgents);

    this.ContentAgents.Logger.MarkerA();

    this.OneWindowMan = new OneScWindowManager(this, this.ContentAgents);

    this.PromiseOneStep = new PromiseOneStep(this, this.ContentAgents);

    this.SharedConst = SharedConst.Const;

    this.SitecoreUiMan = new SitecoreUiManager(this, this.ContentAgents);
    this.Init();

    this.ContentAgents.Logger.Log('ready for messages');
    this.ReadyForMessages = true;

    this.ContentAgents.Logger.FuncEnd(this.Instantiate.name);
  }
  Init() {
    this.ContentAgents.Logger.FuncStart(ContentHub.constructor.name + ' ' + this.Init.name);
    this.Const = ContentConst.Const;

    this.AtticMan.Init();
    this.MsgMan.Init();

    this.ContentAgents.Logger.SetEnabled(this.MsgMan.IsLogEnabled());

    this.OneWindowMan.Init();

    this.ContentAgents.Logger.FuncEnd(ContentHub.constructor.name + ' ' + this.Init.name);
  }
}