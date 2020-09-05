import { RecipeBasics } from '../../../../Shared/scripts/Classes/PromiseGeneric';
import { MsgFlag } from '../../../../Shared/scripts/Enums/1xxx-MessageFlag';
import { SettingKey } from '../../../../Shared/scripts/Enums/3xxx-SettingKey';
import { QueryStrKey } from '../../../../Shared/scripts/Enums/QueryStrKey';
import { Guid } from '../../../../Shared/scripts/Helpers/Guid';
import { GuidData } from "../../../../Shared/scripts/Helpers/GuidData";
import { UtilityHelper } from "../../../../Shared/scripts/Helpers/UtilityHelper";
import { IAllAgents } from '../../../../Shared/scripts/Interfaces/Agents/IAllAgents';
import { IContentConst } from '../../../../Shared/scripts/Interfaces/IContentConst';
import { IDataOneDoc } from '../../../../Shared/scripts/Interfaces/IDataOneDoc';
import { ContentConst } from '../../../../Shared/scripts/Interfaces/InjectConst';
import { ISharedConst } from '../../../../Shared/scripts/Interfaces/ISharedConst';
import { SharedConst } from '../../../../Shared/scripts/SharedConst';
import { ContentStateManager } from "../../Classes/ContentStateManager/ContentStateManager";
import { ContentAPIManager } from '../ContentAPIManager/ContentAPIManager';
import { ContentAtticManager } from '../ContentAtticManager/ContentAtticManager';
import { MiscManager } from '../MiscManager/MiscManager';
import { OneScWindowManager } from "../OneScWindowManager";
import { SitecoreUiManager } from '../SitecoreUiManager/SitecoreUiManager';

export class ContentHub {
  Const: IContentConst;
  private AllAgents: IAllAgents;

  ContentAPIMan: ContentAPIManager;
  MiscMan: MiscManager;
  PromiseHelper: RecipeBasics;
  SitecoreUiMan: SitecoreUiManager;

  Utilities: UtilityHelper;
  MessageFlag: MsgFlag;
  ContentFactory: ContentStateManager;
  SharedConst: ISharedConst;

  constructor(allAgents: IAllAgents, atticMan: ContentAtticManager, miscMan: MiscManager) {
    this.AllAgents = allAgents;
    this.AllAgents.Logger.InstantiateStart(ContentHub.name);
    //console.log('(ctor) logger enabled ' + this.AllAgents.Logger.EnabledStatus());

    this.InstantiateMembers(atticMan, miscMan);
    this.AllAgents.Logger.InstantiateEnd(ContentHub.name);
  }

  InstantiateMembers(atticMan: ContentAtticManager, miscMan: MiscManager) {
    this.AllAgents.Logger.FuncStart(this.InstantiateMembers.name);


    this.SharedConst = SharedConst.Const;

    this.AllAgents.Logger.FuncEnd(this.InstantiateMembers.name);
  }

  InitContentHub(atticMan: ContentAtticManager, recipeBasics: RecipeBasics, oneWindowMan: OneScWindowManager): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.InitContentHub.name);
      this.Const = ContentConst.Const;

      await this.SitecoreUiMan.InitSitecoreUiManager()
        .then(() => {
          atticMan.InitContentAtticManager(this.AllAgents.SettingsAgent.GetByKey(SettingKey.AutoSaveRetainDays).ValueAsInt());

          this.InjectCss();
        })
        .then(() => this.InitFromQueryStr(atticMan, recipeBasics, oneWindowMan))

        .then(() => resolve())
        .catch((err) => reject(err));

      this.AllAgents.Logger.FuncEnd(this.InitContentHub.name);
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

  InitFromQueryStr(atticMan: ContentAtticManager, recipeBasics: RecipeBasics, oneWindowMan: OneScWindowManager): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.InitFromQueryStr.name);

      try {
        if (this.SitecoreUiMan.ScUrlAgent.QueryStringHasKey(QueryStrKey.hsTargetSs)) {
          let qsValue: string = (this.SitecoreUiMan.ScUrlAgent.GetQueryStringValueByKey(QueryStrKey.hsTargetSs));
          let targetGuid: GuidData = Guid.ParseGuid(qsValue, false);

          if (targetGuid && targetGuid !== GuidData.GetEmptyGuid()) {
            this.AllAgents.Logger.LogVal("targetGuid", targetGuid);
            var dataOneWindowStorage;

            await atticMan.GetFromStorageById(targetGuid)
              .then((result) => dataOneWindowStorage = result);

            var self = this;

            var targetDoc: IDataOneDoc = this.SitecoreUiMan.TopLevelDoc();

            if (targetDoc) {
              await recipeBasics.WaitForPageReadyNative(targetDoc);

              await oneWindowMan.RestoreStateToTargetDoc(targetDoc, dataOneWindowStorage)
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