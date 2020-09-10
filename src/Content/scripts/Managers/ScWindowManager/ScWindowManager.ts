import { DefaultScWindowState } from '../../../../Shared/scripts/Classes/DefaultScWindowState';
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
import { IContentState } from '../../../../Shared/scripts/Interfaces/Data/IContentState';
import { IDataDesktopState } from '../../../../Shared/scripts/Interfaces/Data/IDataDesktopState';
import { IDataOneDoc } from '../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { IDataOneStorageOneTreeState } from '../../../../Shared/scripts/Interfaces/Data/IDataOneStorageOneTreeState';
import { IDataOneWindowStorage } from '../../../../Shared/scripts/Interfaces/Data/IDataOneWindowStorage';
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
  CeProxy: ContentEditorProxy = null;
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

  GetCurrentStateByPageType(scWindowType: ScWindowType): IDataOneStorageOneTreeState {
    this.Logger.FuncStart(this.GetCurrentStateByPageType.name, StaticHelpers.ScWindowTypeFriendly(scWindowType));

    let toReturn: IDataOneStorageOneTreeState = null;

    if (scWindowType === ScWindowType.Desktop) {
      let dtResult = this.DesktopUiProxy.GetStateDesktop();

      if (dtResult.ActiveCEAgent) {
        toReturn = dtResult.ActiveCEAgent.GetStateTree();
      }
    }

    else if (scWindowType === ScWindowType.ContentEditor) {
      toReturn = this.CeProxy.GetStateTree();
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
      let currPageType = this.GetCurrentPageType();

      if (currPageType === ScWindowType.Desktop) {
        this.DesktopUiProxy = new DesktopProxy(this.Logger, this.MiscAgent, this.GetTopLevelDoc(), this.SettingsAgent);
      } else if (currPageType === ScWindowType.ContentEditor) {
        this.CeProxy = new ContentEditorProxy(this.GetTopLevelDoc(), this.Logger, this.SettingsAgent, null);
        await this.CeProxy.WaitForReadyAssociatedDocandInit();
      }

      await this.InitFromQueryStr()
        .catch((err) => {
          throw (this.InitScWindowManager.name + ' ' + err)
        });
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
      let recipe = new RecipeInitFromQueryStr(this.Logger, this.GetScUrlAgent(), this.AtticAgent, this.GetTopLevelDoc(), this.MakeScWinRecipeParts(), this.DesktopUiProxy, this.ToastAgent, this.CeProxy);
      await recipe.Execute();

      this.Logger.FuncEnd(this.InitFromQueryStr.name);
    }
    catch (err) {
      throw (err);
    }
  }

  async SetCompactCss(targetDoc: IDataOneDoc) {
    //if (this.ScUiMan().GetCurrentPageType() === scWindowType.ContentEditor) {
    await this.CeProxy.SetCompactCss();
    //}
  }

  private CreateShellIDataScWindowState(windowType: ScWindowType, flavor: SnapShotFlavor): IDataOneWindowStorage {
    this.Logger.FuncStart(this.CreateShellIDataScWindowState.name);
    var dateToUse: Date = new Date();
    var newGuid: GuidData = Guid.NewRandomGuid();

    var activeWindowSnapShot: IDataOneWindowStorage = {
      TimeStamp: dateToUse,
      TimeStampFriendly: StaticHelpers.MakeFriendlyDate(dateToUse),
      WindowType: windowType,
      WindowFriendly: windowType[windowType],
      AllCEAr: [],
      GuidId: newGuid,
      NickName: '',
      RawData: null,
      Flavor: flavor,
    };

    this.Logger.FuncEnd(this.CreateShellIDataScWindowState.name);

    return activeWindowSnapShot;
  }

  private async PopulateIfTopIsContentEditor(scWindowState: IDataOneWindowStorage): Promise<void> {
    try {
      if (this.GetCurrentPageType() === ScWindowType.ContentEditor) {
        let ceAgent = new ContentEditorProxy(this.GetTopLevelDoc(), this.Logger, this.SettingsAgent, null);

        await ceAgent.WaitForReadyAssociatedDocandInit()
          .then(() => ceAgent.GetStateTree())
          .then((state: IDataOneStorageOneTreeState) => {
            scWindowState.AllCEAr.push(state);
          })
          .catch((err) => { throw (err) });
      }
    } catch (err) {
      this.Logger.ErrorAndThrow(this.PopulateIfTopIsContentEditor.name, err);
    }
  }

  private async PopulateIfTopIsDeskTop(scWindowState: IDataOneWindowStorage): Promise<void> {
    this.Logger.FuncStart(this.PopulateIfTopIsDeskTop.name);
    try {
      if (this.GetCurrentPageType() === ScWindowType.Desktop) {
        this.Logger.MarkerB();

        let states: IDataDesktopState = this.DesktopUiProxy.GetStateDesktop();

        scWindowState.AllCEAr = states.HostedContentEditors;
      }
    } catch (err) {
      this.Logger.ErrorAndThrow(this.PopulateIfTopIsContentEditor.name, err);
    }
    this.Logger.FuncEnd(this.PopulateIfTopIsDeskTop.name);
  }

  GetStateScWindow(): Promise<IContentState> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetStateScWindow.name);

      let toReturnScWindowState: IContentState = new DefaultScWindowState();

      toReturnScWindowState.SnapShotsMany = this.AtticAgent.GetAllSnapShotsMany();

      toReturnScWindowState.ErrorStack = this.Logger.ErrorStack;

      let result: IDataOneStorageOneTreeState = this.GetCurrentStateByPageType(this.GetCurrentPageType());
      toReturnScWindowState.ActiveCe = result;

      resolve(toReturnScWindowState);

      this.Logger.FuncEnd(this.GetStateScWindow.name);
    });
  }

  GetStateForStorage(targetSnapShotFlavor: SnapShotFlavor): Promise<IDataOneWindowStorage> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetStateForStorage.name);

      let currentPageType = this.GetCurrentPageType();
      var scWindowState: IDataOneWindowStorage = this.CreateShellIDataScWindowState(currentPageType, targetSnapShotFlavor);

      await this.PopulateIfTopIsContentEditor(scWindowState)
        .then(() => this.PopulateIfTopIsDeskTop(scWindowState))
        .then(() => this.Logger.LogVal('resolve length', scWindowState.AllCEAr.length))
        .then(() => resolve(scWindowState))
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.GetStateForStorage.name);
    });
  }
}