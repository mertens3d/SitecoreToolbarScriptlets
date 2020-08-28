import { RepoAgent } from '../../../../Shared/scripts/Agents/Agents/RepositoryAgent/RepoAgent';
import { PromisesBasic } from '../../../../Shared/scripts/Classes/PromiseGeneric';
import { MsgFlag } from '../../../../Shared/scripts/Enums/1xxx-MessageFlag';
import { QueryStrKey } from '../../../../Shared/scripts/Enums/QueryStrKey';
import { UtilityHelper } from "../../../../Shared/scripts/Helpers/UtilityHelper";
import { IAllAgents } from '../../../../Shared/scripts/Interfaces/Agents/IAllAgents';
import { IContentConst } from '../../../../Shared/scripts/Interfaces/IContentConst';
import { IDataOneDoc } from '../../../../Shared/scripts/Interfaces/IDataOneDoc';
import { IGuid } from '../../../../Shared/scripts/Interfaces/IGuid';
import { ContentConst } from '../../../../Shared/scripts/Interfaces/InjectConst';
import { ISharedConst } from '../../../../Shared/scripts/Interfaces/ISharedConst';
import { SharedConst } from '../../../../Shared/scripts/SharedConst';
import { ContentStateManager } from "../../Classes/ContentStateManager/ContentStateManager";
import { PromiseOneStep } from '../../Promises/PromiseOneStep';
import { ContentAPIManager } from '../ContentAPIManager/ContentAPIManager';
import { ContentAtticManager } from '../ContentAtticManager/ContentAtticManager';
import { ContentMessageManager } from '../ContentMessageManager/ContentMessageManager';
import { MiscManager } from '../MiscManager/MiscManager';
import { OneScWindowManager } from "../OneScWindowManager";
import { SitecoreUiManager } from '../SitecoreUiManager/SitecoreUiManager';

export class ContentHub {
  AtticMan: ContentAtticManager;
  Const: IContentConst;
  private AllAgents: IAllAgents;

  ContentAPIMan: ContentAPIManager;
  ContentMessageMan: ContentMessageManager;
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
    this.InstantiateMembers();
    this.AllAgents.Logger.FuncEnd(ContentHub.name);
  }

  async InstantiateMembers() {
    this.AllAgents.Logger.FuncStart(this.InstantiateMembers.name);

    let Repo: RepoAgent = new RepoAgent(this.AllAgents.Logger);

    this.AtticMan = new ContentAtticManager(this, this.AllAgents, Repo);

    this.ContentAPIMan = new ContentAPIManager(this, this.AllAgents);
    this.ContentMessageMan = new ContentMessageManager(this, this.AllAgents);
    this.MiscMan = new MiscManager(this, this.AllAgents);
    this.ContentFactory = new ContentStateManager(this, this.AllAgents);

    this.OneWindowMan = new OneScWindowManager(this, this.AllAgents);

    this.PromiseOneStep = new PromiseOneStep(this, this.AllAgents);

    this.SharedConst = SharedConst.Const;

    this.SitecoreUiMan = new SitecoreUiManager(this, this.AllAgents);

    this.AllAgents.Logger.Log('ready for messages');

    this.AllAgents.Logger.FuncEnd(this.InstantiateMembers.name);
  }

  Init(): Promise<void>{
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(ContentHub.constructor.name + ' ' + this.Init.name);
      await this.SitecoreUiMan.Init();

      this.Const = ContentConst.Const;

      this.AtticMan.Init();
      this.ContentMessageMan.Init();

      this.AllAgents.Logger.SetEnabled(this.ContentMessageMan.IsLogEnabled());

      this.OneWindowMan.Init();

      this.InjectCss();

      await this.InitFromQueryStr();

      this.AllAgents.Logger.FuncEnd(ContentHub.constructor.name + ' ' + this.Init.name);
    })
  }

  InjectCss(): void {
    //let tabs = browser.tabs;
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
        if (this.SitecoreUiMan.ScUrlAgent.QueryStringHasKey(QueryStrKey.hsTargetSs)) {
          let qsValue: string = (this.SitecoreUiMan.ScUrlAgent.GetQueryStringValueByKey(QueryStrKey.hsTargetSs));
          let targetGuid: IGuid = this.AllAgents.HelperAgent.GuidHelper.ParseGuid(qsValue, false);

          if (targetGuid && targetGuid !== this.AllAgents.HelperAgent.GuidHelper.EmptyGuid()) {
            this.AllAgents.Logger.LogVal("targetGuid", targetGuid);
            var dataOneWindowStorage;

            await this.AtticMan.GetFromStorageById(targetGuid)
              .then((result) => dataOneWindowStorage = result);

            var self = this;

            var targetDoc: IDataOneDoc = this.SitecoreUiMan.TopLevelDoc();

            if (targetDoc) {
              await this.AllAgents.HelperAgent.PromisesBasic.WaitForPageReadyNative(targetDoc);

              await self.OneWindowMan.RestoreStateToTargetDoc(targetDoc, dataOneWindowStorage)
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