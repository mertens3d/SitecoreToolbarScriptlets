import { PayloadDataFromPopUp } from '../../../../Shared/scripts/Classes/PayloadDataReqPopUp';
import { RecipeBasics } from '../../../../Shared/scripts/Classes/PromiseGeneric';
import { ILoggerAgent } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerBase';
import { ISettingsAgent } from '../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { IToastAgent } from '../../../../Shared/scripts/Interfaces/Agents/IToastAgent';
import { IDataOneDoc } from '../../../../Shared/scripts/Interfaces/IDataOneDoc';
import { IFactoryHelper } from '../../../../Shared/scripts/Interfaces/IFactoryHelper';
import { ContentMessageBroker } from '../../Drones/ContentMessageBroker/ContentMessageBroker';
import { ContentAPIManager } from '../ContentAPIManager/ContentAPIManager';
import { ContentAtticManager } from '../ContentAtticManager/ContentAtticManager';
import { LoggableBase } from '../LoggableBase';
import { SitecoreUiManager } from '../SitecoreUiManager/SitecoreUiManager';
import { OneScWindowManager } from '../OneScWindowManager';

export class ContentMessageManager extends LoggableBase {
  private ContentMessageBroker: ContentMessageBroker;
  OperationCancelled: any;
  private AtticMan: ContentAtticManager;
  private RecipeBasics: RecipeBasics;
  private FactoryHelp: IFactoryHelper;
  private ToastAgent: IToastAgent;
  private SettingsAgent: ISettingsAgent;
  private ApiMan: ContentAPIManager;
  private ScUiMan: SitecoreUiManager;
  private ScWinMan: OneScWindowManager;

  constructor(logger: ILoggerAgent, atticMan: ContentAtticManager, recipeBasics: RecipeBasics, factoryHelp: IFactoryHelper, toastAgent: IToastAgent, settingsAgent: ISettingsAgent,
    apiMan: ContentAPIManager, scUiMan: SitecoreUiManager, scWinMan: OneScWindowManager
  ) {
    super(logger);
    this.Logger.FuncStart(ContentMessageManager.name);
    this.AtticMan = atticMan;
    this.RecipeBasics = recipeBasics;
    this.FactoryHelp = factoryHelp;
    this.ToastAgent = toastAgent;
    this.SettingsAgent = settingsAgent;
    this.ApiMan = apiMan;
    this.ScUiMan = scUiMan;
    this.ScWinMan = scWinMan;
    this.Logger.FuncEnd(ContentMessageManager.name);
  }

  InitContentMessageManager() {
    this.Logger.FuncStart(this.InitContentMessageManager.name + ' ' + ContentMessageManager.name);
    this.ContentMessageBroker = new ContentMessageBroker(this.Logger, this.SettingsAgent,
      this.ApiMan, this.ScUiMan.TopLevelDoc(), this.AtticMan,
      this.RecipeBasics, this.FactoryHelp, this.ToastAgent,
      this.ScUiMan, this.ScWinMan

    );
    this.ContentMessageBroker.BeginListening();
    this.Logger.FuncEnd(this.InitContentMessageManager.name);
  }

  private ToggleCompactCss(Data: PayloadDataFromPopUp): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.ToggleCompactCss.name);

      var targetDoc: IDataOneDoc = this.ScUiMan.TopLevelDoc();
      if (targetDoc) {
        var self = this;
        await this.ScWinMan.SetCompactCss(targetDoc)
          .then(() => resolve())
          .catch((err) => reject(err));
      }

      this.Logger.FuncEnd(this.ToggleCompactCss.name);
    });
  }

  SetParentInfo(__winDataParent: IDataOneDoc) {
  }
}