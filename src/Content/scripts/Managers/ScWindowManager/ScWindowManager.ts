import { DefaultStateOfSitecoreWindow } from '../../../../Shared/scripts/Classes/Defaults/DefaultStateOfSitecoreWindow';
import { RecipeBasics } from '../../../../Shared/scripts/Classes/RecipeBasics';
import { StaticHelpers } from '../../../../Shared/scripts/Classes/StaticHelpers';
import { QueryStrKey } from '../../../../Shared/scripts/Enums/QueryStrKey';
import { ScWindowType } from '../../../../Shared/scripts/Enums/scWindowType';
import { SnapShotFlavor } from '../../../../Shared/scripts/Enums/SnapShotFlavor';
import { Guid } from '../../../../Shared/scripts/Helpers/Guid';
import { IContentAtticAgent } from '../../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent';
import { ILoggerAgent } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IScUrlAgent } from '../../../../Shared/scripts/Interfaces/Agents/IScUrlAgent/IScUrlAgent';
import { IScWindowManager } from '../../../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager';
import { ISettingsAgent, InitResultsScWindowManager } from '../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { IToastAgent } from '../../../../Shared/scripts/Interfaces/Agents/IToastAgent';
import { IDataOneDoc } from '../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { IDataMetaData } from '../../../../Shared/scripts/Interfaces/Data/States/IDataMetaData';
import { IDataStateOfContentEditor } from '../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfContentEditor';
import { IDataStateOfDesktop } from '../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfDesktop';
import { IDataStateOfSitecoreWindow } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { ContentConst } from '../../../../Shared/scripts/Interfaces/InjectConst';
import { MiscAgent } from '../../Agents/MiscAgent/MiscAgent';
import { RecipeInitFromQueryStr } from '../../ContentApi/Recipes/RecipeInitFromQueryStr/RecipeInitFromQueryStr';
import { ContentEditorProxy } from '../../Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy';
import { DesktopProxy } from '../../Proxies/Desktop/DesktopProxy/DesktopProxy';
import { LoggableBase } from '../LoggableBase';
import { ScUiManager } from '../SitecoreUiManager/SitecoreUiManager';
import { ScWindowRecipePartials } from './ScWindowRecipePartials';

export class ScWindowManager extends LoggableBase implements IScWindowManager {
  __desktopProxyLazy: DesktopProxy = null;
  __contentEditorProxyLazy: ContentEditorProxy = null;
  private MiscAgent: MiscAgent;
  private ToastAgent: IToastAgent;
  private ScUrlAgent: IScUrlAgent;
  private TopDoc: IDataOneDoc;
  private AtticAgent: IContentAtticAgent;
  SettingsAgent: ISettingsAgent;
  TabSessionId: string;

  constructor(logger: ILoggerAgent, scUiMan: ScUiManager, miscAgent: MiscAgent, toastAgent: IToastAgent, atticAgent: IContentAtticAgent,
    scUrlAgent: IScUrlAgent, settingsAgent: ISettingsAgent) {
    super(logger);
    this.Logger.InstantiateStart(ScWindowManager.name);
    this.MiscAgent = miscAgent;
    this.ToastAgent = toastAgent;
    this.AtticAgent = atticAgent;
    this.ScUrlAgent = scUrlAgent;
    this.SettingsAgent = settingsAgent;

    this.TabSessionId = sessionStorage.getItem(ContentConst.Const.Storage.SessionKey);

    if (!this.TabSessionId) {
      this.TabSessionId = Guid.WithoutDashes(Guid.NewRandomGuid());
      sessionStorage.setItem(ContentConst.Const.Storage.SessionKey, this.TabSessionId);
    }

    this.Logger.InstantiateEnd(ScWindowManager.name);
  }

  DesktopProxy(): DesktopProxy {
    if (!this.__desktopProxyLazy) {
      this.__desktopProxyLazy = new DesktopProxy(this.Logger, this.MiscAgent, this.GetTopLevelDoc(), this.SettingsAgent);
    }
    return this.__desktopProxyLazy;
  }

  ContentEditorProxy(): ContentEditorProxy {
    if (!this.__contentEditorProxyLazy) {
      this.__contentEditorProxyLazy = new ContentEditorProxy(this.GetTopLevelDoc(), this.Logger, this.SettingsAgent);
      return this.__contentEditorProxyLazy;
    }
  }

  async OnReadyInitScWindowManager(): Promise<InitResultsScWindowManager> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.OnReadyInitScWindowManager.name);
      //this.Logger.LogVal('auto rename', this.SettingsAgent.GetByKey(SettingKey.AutoRenameCeButton).ValueAsBool());

      try {
        let recipesBasic = new RecipeBasics(this.Logger, this.SettingsAgent);
        let initResultsScWindowManager: InitResultsScWindowManager = new InitResultsScWindowManager();

        await recipesBasic.WaitForPageReadyNative(this.GetTopLevelDoc())
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

    try {
      if (this.GetScUrlAgent().QueryStringHasKey(QueryStrKey.hsTargetSs)) {
        let recipe = new RecipeInitFromQueryStr(this.Logger, this.GetScUrlAgent(), this.AtticAgent, this.GetTopLevelDoc(), this.MakeScWinRecipeParts(), this.DesktopProxy(), this.ContentEditorProxy(), this.SettingsAgent);
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

  GetStateOfSiteCoreWindow(): Promise<IDataStateOfSitecoreWindow> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetStateOfSiteCoreWindow.name);

      let toReturnStateOfSitecoreWindow: IDataStateOfSitecoreWindow = new DefaultStateOfSitecoreWindow();
      toReturnStateOfSitecoreWindow.Meta.SessionId = this.TabSessionId;

      this.PopulateMetaData(toReturnStateOfSitecoreWindow.Meta);

      if (this.ScUrlAgent.GetScWindowType() === ScWindowType.Desktop) {
        await this.DesktopProxy().GetStateOfDesktop()
          .then((result: IDataStateOfDesktop) => toReturnStateOfSitecoreWindow.States.StateOfDesktop = result)
          .catch((err) => reject(this.GetStateOfSiteCoreWindow.name + ' | ' + err));
      }

      if (this.ScUrlAgent.GetScWindowType() === ScWindowType.ContentEditor) {
        let result = this.ContentEditorProxy().GetStateOfContentEditor();
        toReturnStateOfSitecoreWindow.States.StateOfContentEditor = result;
      }

      resolve(toReturnStateOfSitecoreWindow);

      this.Logger.FuncEnd(this.GetStateOfSiteCoreWindow.name);
    });
  }

  PopulateMetaData(Friendly: IDataMetaData): void {
    Friendly.WindowType = this.ScUrlAgent.GetScWindowType();
  }

  //GetStateOfSitecore(snapShotFlavor: SnapShotFlavor): Promise<IDataStateOfSitecoreWindow> {
  //  return new Promise(async (resolve, reject) => {
  //    this.Logger.FuncStart(this.GetStateOfSitecore.name);

  //    let currentPageType = this.GetCurrentPageType();
  //    var toReturnStateOfSitecore: IDataStateOfSitecoreWindow = this.CreateShellIDataScWindowState(currentPageType, snapShotFlavor);

  //    await this.DesktopProxy().GetStateOfDesktop()
  //      .then((stateOfDesktop: IDataStateOfDesktop) => toReturnStateOfSitecore.StateOfDesktop = stateOfDesktop)
  //      .then(() => this.ContentEditorProxy().GetStateOfContentEditor())
  //      .then((stateOfContentEditor: IDataStateOfContentEditor) => toReturnStateOfSitecore.StateOfContentEditor = stateOfContentEditor)
  //      .then(() => resolve(toReturnStateOfSitecore))
  //      .catch((err) => reject(err));

  //    this.Logger.FuncEnd(this.GetStateOfSitecore.name);
  //  });
  //}
}