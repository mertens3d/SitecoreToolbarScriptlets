import { DefaultContentReplyPayload } from '../../../../Shared/scripts/Classes/DefaultScWindowState';
import { StaticHelpers } from '../../../../Shared/scripts/Classes/StaticHelpers';
import { ScWindowType } from '../../../../Shared/scripts/Enums/scWindowType';
import { SnapShotFlavor } from '../../../../Shared/scripts/Enums/SnapShotFlavor';
import { Guid } from '../../../../Shared/scripts/Helpers/Guid';
import { GuidData } from '../../../../Shared/scripts/Helpers/GuidData';
import { IContentAtticAgent } from '../../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent';
import { ILoggerAgent } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IScUrlAgent } from '../../../../Shared/scripts/Interfaces/Agents/IScUrlAgent/IScUrlAgent';
import { IScWindowManager } from '../../../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager';
import { ISettingsAgent } from '../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { IToastAgent } from '../../../../Shared/scripts/Interfaces/Agents/IToastAgent';
import { IContentReplyPayload } from '../../../../Shared/scripts/Interfaces/Data/IContentState';
import { IDataSateOfDesktop } from '../../../../Shared/scripts/Interfaces/Data/IDataDesktopState';
import { IDataOneDoc } from '../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { IDataStateOfContentEditor } from '../../../../Shared/scripts/Interfaces/Data/IDataOneStorageOneTreeState';
import { IDataStateOfSitecore } from '../../../../Shared/scripts/Interfaces/Data/IDataOneWindowStorage';
import { IDataSnapShots } from '../../../../Shared/scripts/Interfaces/Data/IDataSnapShots';
import { MiscAgent } from '../../Agents/MiscAgent/MiscAgent';
import { RecipeInitFromQueryStr } from '../../ContentApi/Recipes/RecipeInitFromQueryStr/RecipeInitFromQueryStr';
import { ContentEditorProxy } from '../../Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy';
import { DesktopProxy } from '../../Proxies/Desktop/DesktopProxy/DesktopProxy';
import { LoggableBase } from '../LoggableBase';
import { ScUiManager } from '../SitecoreUiManager/SitecoreUiManager';
import { ScWindowRecipePartials } from './ScWindowRecipePartials';

export class ScWindowManager extends LoggableBase implements IScWindowManager {
  DesktopUiProxy: DesktopProxy = null;
  ContentEditorProxy: ContentEditorProxy = null;
  private MiscAgent: MiscAgent;
  private ToastAgent: IToastAgent;
  private ScUrlAgent: IScUrlAgent;
  private TopDoc: IDataOneDoc;
  private AtticAgent: IContentAtticAgent;
  SettingsAgent: ISettingsAgent;

  constructor(logger: ILoggerAgent, scUiMan: ScUiManager, miscAgent: MiscAgent, toastAgent: IToastAgent, atticAgent: IContentAtticAgent,
    scUrlAgent: IScUrlAgent, settingsAgent: ISettingsAgent) {
    super(logger);
    this.Logger.InstantiateStart(ScWindowManager.name);
    this.MiscAgent = miscAgent;
    this.ToastAgent = toastAgent;
    this.AtticAgent = atticAgent;
    this.ScUrlAgent = scUrlAgent;
    this.SettingsAgent = settingsAgent;
    this.Logger.InstantiateEnd(ScWindowManager.name);
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

        await this.DesktopUiProxy.GetStateDesktop()
          .then((result) => {
            dtResult = result;

            if (dtResult.ActiveCEAgent) {
              toReturn = dtResult.ActiveCEAgent.GetStateTree();
            }
          })
          .catch((err) => this.Logger.ErrorAndThrow(this.GetCurrentStateByPageType.name, err));
      }

      else if (scWindowType === ScWindowType.ContentEditor) {
        toReturn = this.ContentEditorProxy.GetStateTree();
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

  async InitScWindowManager(): Promise<void> {
    this.Logger.FuncStart(this.InitScWindowManager.name);
    //this.Logger.LogVal('auto rename', this.SettingsAgent.GetByKey(SettingKey.AutoRenameCeButton).ValueAsBool());

    try {
      this.DesktopUiProxy = new DesktopProxy(this.Logger, this.MiscAgent, this.GetTopLevelDoc(), this.SettingsAgent);
      this.ContentEditorProxy = new ContentEditorProxy(this.GetTopLevelDoc(), this.Logger, this.SettingsAgent, null);

      await this.DesktopUiProxy.InitDesktopProxy()
        .then(() => this.ContentEditorProxy.WaitForReadyContentEditor())
        .then(() => this.InitFromQueryStr())
        .catch((err) => { throw (this.InitScWindowManager.name + ' | ' + err) })
    } catch (err) {
      throw (this.InitScWindowManager.name + ' ' + err);
    }
    this.Logger.FuncEnd(this.InitScWindowManager.name);
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
      let recipe = new RecipeInitFromQueryStr(this.Logger, this.GetScUrlAgent(), this.AtticAgent, this.GetTopLevelDoc(), this.MakeScWinRecipeParts(), this.DesktopUiProxy, this.ToastAgent, this.ContentEditorProxy, this.SettingsAgent);
      await recipe.Execute();

      this.Logger.FuncEnd(this.InitFromQueryStr.name);
    }
    catch (err) {
      throw (err);
    }
  }

  async SetCompactCss(targetDoc: IDataOneDoc) {
    //if (this.ScUiMan().GetCurrentPageType() === scWindowType.ContentEditor) {
    await this.ContentEditorProxy.SetCompactCss();
    //}
  }

  private CreateShellIDataScWindowState(windowType: ScWindowType, flavor: SnapShotFlavor): IDataStateOfSitecore {
    this.Logger.FuncStart(this.CreateShellIDataScWindowState.name);
    var dateToUse: Date = new Date();
    var newGuid: GuidData = Guid.NewRandomGuid();

    var activeWindowSnapShot: IDataStateOfSitecore = {
      StateOfContentEditor: null,
      StateOfDesktop: null,
      TimeStamp: dateToUse,
      TimeStampFriendly: StaticHelpers.MakeFriendlyDate(dateToUse),
      WindowType: windowType,
      WindowFriendly: windowType[windowType],
      //AllCEAr: [],
      GuidId: newGuid,
      NickName: '',
      RawData: null,
      Flavor: flavor,
    };

    this.Logger.FuncEnd(this.CreateShellIDataScWindowState.name);

    return activeWindowSnapShot;
  }

  private async PopulateIfTopIsContentEditor(scWindowState: IDataStateOfSitecore): Promise<void> {
    try {
      if (this.GetCurrentPageType() === ScWindowType.ContentEditor) {
        let ceAgent = new ContentEditorProxy(this.GetTopLevelDoc(), this.Logger, this.SettingsAgent, null);

        await ceAgent.WaitForReadyContentEditor()
          .then(() => ceAgent.GetStateTree())
          .then((stateOfContentEditor: IDataStateOfContentEditor) => {
            scWindowState.StateOfContentEditor = stateOfContentEditor;
          })
          .catch((err) => { throw (err) });
      }
    } catch (err) {
      this.Logger.ErrorAndThrow(this.PopulateIfTopIsContentEditor.name, err);
    }
  }

  private async PopulateIfTopIsDeskTop(scWindowState: IDataStateOfSitecore): Promise<void> {
    this.Logger.FuncStart(this.PopulateIfTopIsDeskTop.name);
    try {
      if (this.GetCurrentPageType() === ScWindowType.Desktop) {
        await this.DesktopUiProxy.GetStateDesktop()
          .then((desktopState: IDataSateOfDesktop) => scWindowState.StateOfDesktop = desktopState)
          .catch((err) => { throw (this.PopulateIfTopIsDeskTop.name + ' ' + err) });
      }
    } catch (err) {
      this.Logger.ErrorAndThrow(this.PopulateIfTopIsContentEditor.name, err);
    }
    this.Logger.FuncEnd(this.PopulateIfTopIsDeskTop.name);
  }

  GetStateScWindow(): Promise<IContentReplyPayload> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetStateScWindow.name);

      let toReturnScWindowState: IContentReplyPayload = new DefaultContentReplyPayload();

      toReturnScWindowState.SnapShotsStateOfSitecore = this.AtticAgent.GetAllSnapShotsMany();

      toReturnScWindowState.ErrorStack = this.Logger.ErrorStack;

      await this.GetCurrentStateByPageType(this.GetCurrentPageType())
        .then((result: IDataStateOfContentEditor) => toReturnScWindowState.ActiveCe = result)
        .then(() => resolve(toReturnScWindowState))
        .catch((err) => reject(this.GetStateScWindow.name + ' ' + err));

      this.Logger.FuncEnd(this.GetStateScWindow.name);
    });
  }

  GetStateOfSitecore(snapShotFlavor: SnapShotFlavor): Promise<IDataStateOfSitecore> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetStateOfSitecore.name);

      let currentPageType = this.GetCurrentPageType();
      var toReturnStateOfSitecore: IDataStateOfSitecore = this.CreateShellIDataScWindowState(currentPageType, snapShotFlavor);

      await this.DesktopUiProxy.GetStateDesktop()
        .then((stateOfDesktop: IDataSateOfDesktop) => toReturnStateOfSitecore.StateOfDesktop = stateOfDesktop)
        .then(() => this.ContentEditorProxy.GetStateOfContentEditor())
        .then((stateOfContentEditor: IDataStateOfContentEditor) => toReturnStateOfSitecore.StateOfContentEditor = stateOfContentEditor)
        .then(() => resolve(toReturnStateOfSitecore))
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.GetStateOfSitecore.name);
    });
  }
}