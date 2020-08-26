﻿import { MiscManager } from '../MiscManager/MiscManager';
import { OneScWindowManager } from "../OneScWindowManager";
import { PromisesBasic } from '../../../../Shared/scripts/Classes/PromiseGeneric';
import { PromiseOneStep } from '../../Promises/PromiseOneStep';
import { UtilityHelper } from "../../../../Shared/scripts/Helpers/UtilityHelper";
import { ContentMessageManager } from '../ContentMessageManager/ContentMessageManager';
import { IContentConst } from '../../../../Shared/scripts/Interfaces/IContentConst';
import { MsgFlag } from '../../../../Shared/scripts/Enums/1xxx-MessageFlag';
import { ContentConst } from '../../../../Shared/scripts/Interfaces/InjectConst';
import { ContentStateManager } from "../../Classes/ContentStateManager/ContentStateManager";
import { SharedConst } from '../../../../Shared/scripts/SharedConst';
import { ISharedConst } from '../../../../Shared/scripts/Interfaces/ISharedConst';
import { IAllAgents } from '../../../../Shared/scripts/Interfaces/Agents/IAllAgents';
import { QueryStrKey } from '../../../../Shared/scripts/Enums/QueryStrKey';
import { IGuid } from '../../../../Shared/scripts/Interfaces/IGuid';
import { CacheMode } from '../../../../Shared/scripts/Enums/CacheMode';
import { IDataOneDoc } from '../../../../Shared/scripts/Interfaces/IDataOneDoc';
import { ContentAPIManager } from '../ContentAPIManager/ContentAPIManager';
import { SitecoreUiManager } from '../SitecoreUiManager/SitecoreUiManager';
import { ContentAtticManager } from '../ContentAtticManager/ContentAtticManager';
import { RepoAgent } from '../../../../Shared/scripts/Agents/Agents/RepositoryAgent/RepoAgent';

export class ContentHub {
  AtticMan: ContentAtticManager;
  Const: IContentConst;
  private AllAgents: IAllAgents;

  ContentAPIMan: ContentAPIManager;
  MsgMan: ContentMessageManager;
  MiscMan: MiscManager;
  OneWindowMan: OneScWindowManager;
  PromiseHelper: PromisesBasic;
  PromiseOneStep: PromiseOneStep;
  SitecoreUiMan: SitecoreUiManager;

  Utilities: UtilityHelper;
  MessageFlag: MsgFlag;
  ContentFactory: ContentStateManager;
  SharedConst: ISharedConst;

  constructor(allAgents: IAllAgents) {
    this.AllAgents = allAgents;

    this.AllAgents.Logger.IsNotNullOrUndefinedBool("AllAgents.HelperAgent", this.AllAgents.HelperAgent);

    this.AllAgents.Logger.FuncStart(ContentHub.name);
    console.log('(ctor) logger enabled ' + this.AllAgents.Logger.EnabledStatus());
    this.Instantiate();
    this.AllAgents.Logger.FuncEnd(ContentHub.name);
  }

  Instantiate() {
    this.AllAgents.Logger.FuncStart(this.Instantiate.name);

    let Repo: RepoAgent = new RepoAgent(this.AllAgents.Logger);

    this.AtticMan = new ContentAtticManager(this, this.AllAgents, Repo);

    this.ContentAPIMan = new ContentAPIManager(this, this.AllAgents);
    this.MsgMan = new ContentMessageManager(this, this.AllAgents);
    this.MiscMan = new MiscManager(this, this.AllAgents);
    this.ContentFactory = new ContentStateManager(this, this.AllAgents);

    this.AllAgents.Logger.MarkerA();

    this.OneWindowMan = new OneScWindowManager(this, this.AllAgents);

    this.PromiseOneStep = new PromiseOneStep(this, this.AllAgents);

    this.SharedConst = SharedConst.Const;

    this.SitecoreUiMan = new SitecoreUiManager(this, this.AllAgents);

    this.Init();

    this.AllAgents.Logger.Log('ready for messages');

    this.AllAgents.Logger.FuncEnd(this.Instantiate.name);
  }
  Init() {
    this.AllAgents.Logger.FuncStart(ContentHub.constructor.name + ' ' + this.Init.name);
    this.Const = ContentConst.Const;

    this.AtticMan.Init();
    this.MsgMan.Init();

    this.AllAgents.Logger.SetEnabled(this.MsgMan.IsLogEnabled());

    this.OneWindowMan.Init();

    this.InjectCss();

    this.AllAgents.Logger.FuncEnd(ContentHub.constructor.name + ' ' + this.Init.name);
  }

  InjectCss(): void {
    let tabs = browser.tabs;
    //let targetTab: browser.tabs.Tab = tabs[0];

    //let targetTab = this.man
    //browser.tabs.insertCSS( {
    //  file: 'AutoBuild/final/content.min.css'
    //});

    const style = document.createElement('link');
    style.type = 'text/css';
    style.href = browser.extension.getURL('AutoBuild/final/content.min.css');
    style.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(style);
  }

  InitFromQueryStr(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.InitFromQueryStr.name);

      try {
        if (this.AllAgents.QueryStrAgent.HasKey(QueryStrKey.hsTargetSs)) {
          let qsValue: string = this.AllAgents.QueryStrAgent.QsValueByKey(QueryStrKey.hsTargetSs);
          let targetGuid: IGuid = this.AllAgents.HelperAgent.GuidHelper.ParseGuid(qsValue, false);

          if (targetGuid && targetGuid !== this.AllAgents.HelperAgent.GuidHelper.EmptyGuid()) {
            this.AllAgents.Logger.LogVal("targetGuid", targetGuid);
            var dataOneWindowStorage;

            await this.AtticMan.GetFromStorageById(targetGuid, CacheMode.DoNotUseCache)
              .then((result) => dataOneWindowStorage = result);

            var self = this;

            var targetDoc: IDataOneDoc = this.SitecoreUiMan.TopLevelDoc();

            if (targetDoc) {
              await this.AllAgents.HelperAgent.PromisesBasic.WaitForPageReadyNative(targetDoc);

              await self.OneWindowMan.RestoreWindowStateToTargetDoc(targetDoc, dataOneWindowStorage)
                .then(() => resolve())
                .catch((err) => reject(err));
            }
            else {
              self.AllAgents.Logger.ErrorAndThrow(this.InitFromQueryStr.name, 'no targetDoc');
            }
          } else {
            this.AllAgents.Logger.Log('Either no snapshot provided or an illegal one was found');
          }
        }
      } catch (ex) {
        this.AllAgents.Logger.ErrorAndThrow(this.InitFromQueryStr.name, ex)
      }

      this.AllAgents.Logger.FuncEnd(this.InitFromQueryStr.name);
    });
  }
}