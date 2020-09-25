import { DefaultFriendly, DefaultMetaData, DefaultScWindowStates, DefaultStateOfSitecoreWindow } from '../../../../Shared/scripts/Classes/Defaults/DefaultStateOfSitecoreWindow';
import { RecipeBasicsForContent } from '../../../../Shared/scripts/Classes/RecipeBasics';
import { StaticHelpers } from '../../../../Shared/scripts/Classes/StaticHelpers';
import { QueryStrKey } from '../../../../Shared/scripts/Enums/QueryStrKey';
import { ScWindowType } from '../../../../Shared/scripts/Enums/scWindowType';
import { SnapShotFlavor } from '../../../../Shared/scripts/Enums/SnapShotFlavor';
import { Guid } from '../../../../Shared/scripts/Helpers/Guid';
import { IContentAtticAgent } from '../../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent';
import { IContentBrowserProxy } from '../../../../Shared/scripts/Interfaces/Agents/IContentBrowserProxy';
import { IHindSiteApi } from "../../../../Shared/scripts/Interfaces/Agents/IHindSiteApi.1";
import { ILoggerAgent } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { InitResultsScWindowManager } from "../../../../Shared/scripts/Interfaces/Agents/InitResultsScWindowManager";
import { IScUrlAgent } from '../../../../Shared/scripts/Interfaces/Agents/IScUrlAgent/IScUrlAgent';
import { IScWindowManager } from '../../../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager';
import { ISettingsAgent } from '../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { IToastAgent } from '../../../../Shared/scripts/Interfaces/Agents/IToastAgent';
import { IDataOneDoc } from '../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { IDataFriendly } from '../../../../Shared/scripts/Interfaces/Data/States/IDataFriendly';
import { IDataMetaData } from '../../../../Shared/scripts/Interfaces/Data/States/IDataMetaData';
import { IDataStateOfContentEditor } from '../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfContentEditor';
import { IDataStateOfDesktop } from '../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfDesktop';
import { IDataStateOfSitecoreWindow } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IDataSitecoreWindowStates } from '../../../../Shared/scripts/Interfaces/Data/States/IDataStates';
import { ContentConst } from '../../../../Shared/scripts/Interfaces/InjectConst';
import { IContentEditorProxy, IDesktopProxy } from "../../../../Shared/scripts/Interfaces/Proxies/IDesktopProxy";
import { LoggableBase } from '../../../../Shared/scripts/LoggableBase';
import { MiscAgent } from '../../Agents/MiscAgent/MiscAgent';
import { RecipeInitFromQueryStr } from '../../ContentApi/Recipes/RecipeInitFromQueryStr/RecipeInitFromQueryStr';
import { ContentEditorProxy } from '../../Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy';
import { ScUiManager } from '../SitecoreUiManager/SitecoreUiManager';
import { ScWindowRecipePartials } from './ScWindowRecipePartials';

export class ScWindowManager extends LoggableBase implements IScWindowManager {
  __desktopProxyLazy: IDesktopProxy = null;
  __contentEditorProxyLazy: IContentEditorProxy = null;
  private MiscAgent: MiscAgent;
  private ToastAgent: IToastAgent;
  private ScUrlAgent: IScUrlAgent;
  private TopDoc: IDataOneDoc;
  private AtticAgent: IContentAtticAgent;
  SettingsAgent: ISettingsAgent;
  TabSessionId: string;
   private HindSiteApi: IHindSiteApi;
  private ContentBrowserProxy: IContentBrowserProxy;

  constructor(logger: ILoggerAgent, scUiMan: ScUiManager, miscAgent: MiscAgent, toastAgent: IToastAgent, atticAgent: IContentAtticAgent,
    scUrlAgent: IScUrlAgent, settingsAgent: ISettingsAgent, hindSiteApi: IHindSiteApi, contentBrowserProxy: IContentBrowserProxy) {
    super(logger);
    this.Logger.InstantiateStart(ScWindowManager.name);
    this.MiscAgent = miscAgent;
    this.ToastAgent = toastAgent;
    this.AtticAgent = atticAgent;
    this.ScUrlAgent = scUrlAgent;
    this.SettingsAgent = settingsAgent;
    this.HindSiteApi = hindSiteApi;
    this.ContentBrowserProxy = contentBrowserProxy;

    this.TabSessionId = sessionStorage.getItem(ContentConst.Const.Storage.SessionKey);

    if (!this.TabSessionId) {
      this.TabSessionId = Guid.WithoutDashes(Guid.NewRandomGuid());
      sessionStorage.setItem(ContentConst.Const.Storage.SessionKey, this.TabSessionId);
    }

    this.Logger.InstantiateEnd(ScWindowManager.name);
  }

  DesktopProxy(): IDesktopProxy {
    if (!this.__desktopProxyLazy) {
      this.__desktopProxyLazy = this.HindSiteApi.Factory.NewDesktopProxy(this.GetTopLevelDoc());
    }
    return this.__desktopProxyLazy;
  }

  ContentEditorProxy(): IContentEditorProxy {
    if (!this.__contentEditorProxyLazy) {
      this.__contentEditorProxyLazy = new ContentEditorProxy(this.GetTopLevelDoc(), this.Logger, this.ContentBrowserProxy);
      return this.__contentEditorProxyLazy;
    }
  }

  async OnReadyInitScWindowManager(): Promise<InitResultsScWindowManager> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.OnReadyInitScWindowManager.name);
      //this.Logger.LogVal('auto rename', this.SettingsAgent.GetByKey(SettingKey.AutoRenameCeButton).ValueAsBool());

      try {
        let recipesBasic = new RecipeBasicsForContent(this.Logger, this.ContentBrowserProxy);
        let initResultsScWindowManager: InitResultsScWindowManager = new InitResultsScWindowManager();

        await recipesBasic.WaitForReadyNABDocument(this.GetTopLevelDoc())
          .then(() => this.DesktopProxy().OnReadyInitDesktopProxy())
          .then((results) => initResultsScWindowManager.InitResultsDesktop = results)
          .then(() => this.InitFromQueryStr())
          .then(() => resolve(initResultsScWindowManager))
          .catch((err) => { throw (this.OnReadyInitScWindowManager.name + ' | ' + err) });
      } catch (err) {
        throw (this.OnReadyInitScWindowManager.name + ' ' + err);
      }
      this.Logger.FuncEnd(this.OnReadyInitScWindowManager.name);
    });
  }

  MakeScWinRecipeParts(): ScWindowRecipePartials {
    return new ScWindowRecipePartials(this.Logger, this.ToastAgent);
  }

  async GetCurrentStateByPageType(scWindowType: ScWindowType): Promise<IDataStateOfContentEditor> {
    this.Logger.FuncStart(this.GetCurrentStateByPageType.name, StaticHelpers.ScWindowTypeFriendly(scWindowType));
    let toReturn: IDataStateOfContentEditor = null;

    try {
      if (scWindowType === ScWindowType.Desktop) {
        let dtResult;

        await this.DesktopProxy().GetStateOfDesktop()
          .then((result) => {
            dtResult = result;

            if (dtResult.ActiveCEAgent) {
              toReturn = dtResult.ActiveCEAgent.GetStateTree();
            }
          })
          .catch((err) => this.Logger.ErrorAndThrow(this.GetCurrentStateByPageType.name, err));
      }

      else if (scWindowType === ScWindowType.ContentEditor) {
        toReturn = this.ContentEditorProxy().GetStateOfContentEditor();
      }
      else if (scWindowType === ScWindowType.LoginPage
        || scWindowType === ScWindowType.Launchpad
        || scWindowType === ScWindowType.Edit
        || scWindowType === ScWindowType.Preview
        || scWindowType === ScWindowType.Normal) {
      }
      else {
        this.Logger.ErrorAndThrow(this.GetCurrentStateByPageType.name, 'unknown page type ' + StaticHelpers.ScWindowTypeFriendly(scWindowType));
      }
    } catch (err) {
      this.Logger.ErrorAndThrow(this.GetCurrentStateByPageType.name, err);
    }

    this.Logger.FuncEnd(this.GetCurrentStateByPageType.name);
    return toReturn;
  }

  GetScUrlAgent(): IScUrlAgent {
    return this.ScUrlAgent;
  }

  GetCurrentPageType(): ScWindowType {
    return this.ScUrlAgent.GetScWindowType()
  }

  GetTopLevelDoc(): IDataOneDoc {
    if (!this.TopDoc) {
      this.TopDoc = {
        //ParentDoc: null,
        ContentDoc: window.document,
        DocId: Guid.NewRandomGuid(),
        Nickname: 'top doc'
      }
    }
    return this.TopDoc;
  } 

  async InitFromQueryStr(): Promise<void> {
    this.Logger.FuncStart(this.InitFromQueryStr.name);

    //ICommandHandlerDataForContent

    try {
      if (this.GetScUrlAgent().QueryStringHasKey(QueryStrKey.hsTargetSs)) {
        let recipe = new RecipeInitFromQueryStr(this.Logger, this.GetScUrlAgent(), this.AtticAgent, this.GetTopLevelDoc(), this.MakeScWinRecipeParts(), this.DesktopProxy(), this.ContentEditorProxy(), this.ContentBrowserProxy);
        await recipe.Execute();
      }

      this.Logger.FuncEnd(this.InitFromQueryStr.name);
    }
    catch (err) {
      throw (err);
    }
  }

  async SetCompactCss(targetDoc: IDataOneDoc) {
    //if (this.ScUiMan().GetCurrentPageType() === scWindowType.ContentEditor) {
    await this.ContentEditorProxy().SetCompactCss();
    //}
  }

  private CreateShellIDataScWindowState(windowType: ScWindowType, flavor: SnapShotFlavor): IDataStateOfSitecoreWindow {
    this.Logger.FuncStart(this.CreateShellIDataScWindowState.name);

    var activeWindowSnapShot: IDataStateOfSitecoreWindow = new DefaultStateOfSitecoreWindow();
    activeWindowSnapShot.Meta.Flavor = flavor;
    activeWindowSnapShot.Meta.WindowType = windowType;
    activeWindowSnapShot.Meta.SessionId = this.TabSessionId;

    this.Logger.FuncEnd(this.CreateShellIDataScWindowState.name);

    return activeWindowSnapShot;
  }

  //private async PopulateIfTopIsContentEditor(scWindowState: IDataStateOfSitecore): Promise<void> {
  //  try {
  //    if (this.GetCurrentPageType() === ScWindowType.ContentEditor) {
  //      let contentEditorProxy = new ContentEditorProxy(this.GetTopLevelDoc(), this.Logger, this.SettingsAgent, null);

  //      await contentEditorProxy.WaitForReadyContentEditor()
  //        .then(() => contentEditorProxy.GetStateOfTree())
  //        .then((stateOfContentEditor: IDataStateOfContentEditor) => {
  //          scWindowState.StateOfContentEditor = stateOfContentEditor;
  //        })
  //        .catch((err) => { throw (err) });
  //    }
  //  } catch (err) {
  //    this.Logger.ErrorAndThrow(this.PopulateIfTopIsContentEditor.name, err);
  //  }
  //}

  //private async PopulateIfTopIsDeskTop(scWindowState: IDataStateOfSitecore): Promise<void> {
  //  this.Logger.FuncStart(this.PopulateIfTopIsDeskTop.name);
  //  try {
  //    if (this.GetCurrentPageType() === ScWindowType.Desktop) {
  //      await this.DesktopUiProxy.GetStateDesktop()
  //        .then((desktopState: IDataSateOfDesktop) => scWindowState.StateOfDesktop = desktopState)
  //        .catch((err) => { throw (this.PopulateIfTopIsDeskTop.name + ' ' + err) });
  //    }
  //  } catch (err) {
  //    this.Logger.ErrorAndThrow(this.PopulateIfTopIsContentEditor.name, err);
  //  }
  //  this.Logger.FuncEnd(this.PopulateIfTopIsDeskTop.name);
  //}

  private GetStates(): Promise<IDataSitecoreWindowStates> {
    return new Promise(async (resolve, reject) => {
      let toReturn: IDataSitecoreWindowStates = new DefaultScWindowStates();

      if (this.ScUrlAgent.GetScWindowType() === ScWindowType.Desktop) {
        await this.DesktopProxy().GetStateOfDesktop()
          .then((result: IDataStateOfDesktop) => toReturn.StateOfDesktop = result)
          .then(() => resolve(toReturn))
          .catch((err) => reject(this.GetStateOfSitecoreWindow.name + ' | ' + err));
      }

      if (this.ScUrlAgent.GetScWindowType() === ScWindowType.ContentEditor) {
        let result = this.ContentEditorProxy().GetStateOfContentEditor();
        toReturn.StateOfContentEditor = result;
        resolve(toReturn);
      }
    });
  }

  GetStateOfSitecoreWindow(snapshotFlavor: SnapShotFlavor): Promise<IDataStateOfSitecoreWindow> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetStateOfSitecoreWindow.name);

      let toReturnStateOfSitecoreWindow: IDataStateOfSitecoreWindow = new DefaultStateOfSitecoreWindow();

      await this.GetStates()
        .then((dataSitecoreWindowStates: IDataSitecoreWindowStates) => toReturnStateOfSitecoreWindow.ScWindowStates = dataSitecoreWindowStates)
        .then(() => {
          toReturnStateOfSitecoreWindow.Meta = this.PopulateMetaData(snapshotFlavor);
          toReturnStateOfSitecoreWindow.Friendly = this.PopulateFriendly(toReturnStateOfSitecoreWindow.Meta)
        })
        .then(() => resolve(toReturnStateOfSitecoreWindow))
        .catch((err) => reject(this.GetStateOfSitecoreWindow.name + ' | ' + err));
      this.Logger.FuncEnd(this.GetStateOfSitecoreWindow.name);
    });
  }

  PopulateFriendly(metadata: IDataMetaData): IDataFriendly {
    let toReturn: IDataFriendly = new DefaultFriendly();
    toReturn.WindowType = ScWindowType[metadata.WindowType];
    toReturn.TimeStamp = StaticHelpers.MakeFriendlyDate(metadata.TimeStamp)
    toReturn.Flavor = SnapShotFlavor[metadata.Flavor];
    return toReturn;
  }

  PopulateMetaData(snapshotFlavor: SnapShotFlavor): IDataMetaData {
    let toReturn: IDataMetaData = new DefaultMetaData();
    toReturn.WindowType = this.ScUrlAgent.GetScWindowType();
    toReturn.TimeStamp = new Date();
    toReturn.SessionId = this.TabSessionId;
    toReturn.Flavor = snapshotFlavor;
    return toReturn;
  }
}