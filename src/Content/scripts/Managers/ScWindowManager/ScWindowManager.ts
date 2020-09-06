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
import { IToastAgent } from '../../../../Shared/scripts/Interfaces/Agents/IToastAgent';
import { IContentState } from '../../../../Shared/scripts/Interfaces/Data/IContentState';
import { IDataDesktopState } from '../../../../Shared/scripts/Interfaces/Data/IDataDesktopState';
import { IDataOneDoc } from '../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { IDataOneStorageOneTreeState } from '../../../../Shared/scripts/Interfaces/Data/IDataOneStorageOneTreeState';
import { IDataOneWindowStorage } from '../../../../Shared/scripts/Interfaces/Data/IDataOneWindowStorage';
import { IDataSnapShots } from '../../../../Shared/scripts/Interfaces/Data/IDataSnapShots';
import { MiscAgent } from '../../Agents/MiscAgent/MiscAgent';
import { OneCEAgent } from '../../Agents/OneCEAgent/OneCEAgent';
import { RecipeInitFromQueryStr } from '../../ContentApi/Recipes/RecipeInitFromQueryStr/RecipeInitFromQueryStr';
import { DesktopAgent } from '../DesktopManager/DesktopManager';
import { LoggableBase } from '../LoggableBase';
import { ScUiManager } from '../SitecoreUiManager/SitecoreUiManager';
import { ScWindowRecipePartials } from './ScWindowRecipePartials';

export class ScWindowManager extends LoggableBase implements IScWindowManager {
  OneDesktopMan: DesktopAgent = null;
  OneCEAgent: OneCEAgent = null;
  private MiscAgent: MiscAgent;
  private ToastAgent: IToastAgent;
  private ScUrlAgent: IScUrlAgent;
  private TopDoc: IDataOneDoc;
  private AtticAgent: IContentAtticAgent;

  constructor(logger: ILoggerAgent, scUiMan: ScUiManager, miscAgent: MiscAgent, toastAgent: IToastAgent, atticAgent: IContentAtticAgent,
    scUrlAgent: IScUrlAgent) {
    super(logger);
    this.Logger.InstantiateStart(ScWindowManager.name);
    this.MiscAgent = miscAgent;
    this.ToastAgent = toastAgent;
    this.AtticAgent = atticAgent;
    this.ScUrlAgent = scUrlAgent;
    this.Logger.InstantiateEnd(ScWindowManager.name);
  }

  MakeScWinRecipeParts(): ScWindowRecipePartials {
    return new ScWindowRecipePartials(this.Logger, this.ToastAgent);
  }

  GetCurrentStateByPageType(scWindowType: ScWindowType) {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetCurrentStateByPageType.name, StaticHelpers.ScWindowTypeFriendly(scWindowType));

      if (scWindowType === ScWindowType.Desktop) {
        await this.OneDesktopMan.GetStateDesktop()
          .then((result: IDataDesktopState) => resolve(result.ActiveCeState))
          .then(() => resolve())
          .catch((err) => reject(err));
      }
      else if (scWindowType === ScWindowType.ContentEditor) {
        await this.OneCEAgent.GetTreeState()
          .then((result: IDataOneStorageOneTreeState) => resolve(result))
          .then(() => resolve())
          .catch((err) => reject(err));
      }
      else if (scWindowType === ScWindowType.LoginPage
        || scWindowType === ScWindowType.Launchpad
        || scWindowType === ScWindowType.Edit
        || scWindowType === ScWindowType.Preview
        || scWindowType === ScWindowType.Normal) {
        resolve(null);
      }
      else {
        reject('unknown page type ' + StaticHelpers.ScWindowTypeFriendly(scWindowType));
      }

      this.Logger.FuncEnd(this.GetCurrentStateByPageType.name);
    });
  }

  GetScUrlAgent(): IScUrlAgent {
    return this.ScUrlAgent;
  }

  GetCurrentPageType(): ScWindowType {
    return this.ScUrlAgent.GetScWindowType()
  }

  async InitScWindowManager(): Promise<void> {
    this.Logger.FuncStart(this.InitScWindowManager.name);

    try {
      let currPageType = this.GetCurrentPageType();

      if (currPageType === ScWindowType.Desktop) {
        this.OneDesktopMan = new DesktopAgent(this.Logger, this.MiscAgent, this.GetTopLevelDoc());
      } else if (currPageType === ScWindowType.ContentEditor) {
        this.OneCEAgent = new OneCEAgent(this.GetTopLevelDoc(), this.Logger);
      }

      await this.InitFromQueryStr()
        .catch((err) => { throw (err) });
    } catch (err) {
      throw (err);
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
      let recipe = new RecipeInitFromQueryStr(this.Logger, this.GetScUrlAgent(), this.AtticAgent, this.GetTopLevelDoc(), this.MakeScWinRecipeParts(), this.OneDesktopMan, this.ToastAgent, this.OneCEAgent);
      await recipe.Execute();

      this.Logger.FuncEnd(this.InitFromQueryStr.name);
    }
    catch (err) {
      throw (err);
    }
  }

  async SetCompactCss(targetDoc: IDataOneDoc) {
    //if (this.ScUiMan().GetCurrentPageType() === scWindowType.ContentEditor) {
    await this.OneCEAgent.SetCompactCss();
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
        let ceAgent = new OneCEAgent(this.GetTopLevelDoc(), this.Logger);

        await ceAgent.GetTreeState()
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

        await this.OneDesktopMan.GetStateDesktop()
          .then((states: IDataDesktopState) => {
            scWindowState.AllCEAr = states.HostedContentEditors;
          })
          .catch((err) => { throw (err); });
      }
    } catch (err) {
      this.Logger.ErrorAndThrow(this.PopulateIfTopIsContentEditor.name, err);
    }
    this.Logger.FuncEnd(this.PopulateIfTopIsDeskTop.name);
  }
  GetScWindowStateA(): Promise<IContentState> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetScWindowStateA.name);

      let toReturnScWindowState: IContentState = new DefaultScWindowState();

      await this.AtticAgent.GetAllSnapShotsMany()
        .then((result: IDataSnapShots) => toReturnScWindowState.SnapShotsMany = result)
        .then(() => toReturnScWindowState.ErrorStack = this.Logger.ErrorStack)
        .then(() => this.GetCurrentStateByPageType(this.GetCurrentPageType()))
        .then((result: IDataOneStorageOneTreeState) => {
          toReturnScWindowState.ActiveCe = result;
          resolve(toReturnScWindowState);
        })
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.GetScWindowStateA.name);
    });
  }
  GetScWindowStateB(targetSnapShotFlavor: SnapShotFlavor): Promise<IDataOneWindowStorage> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetScWindowStateB.name);

      let currentPageType = this.GetCurrentPageType();
      var scWindowState: IDataOneWindowStorage = this.CreateShellIDataScWindowState(currentPageType, targetSnapShotFlavor);

      await this.PopulateIfTopIsContentEditor(scWindowState)
        .then(() => this.PopulateIfTopIsDeskTop(scWindowState))
        .then(() => resolve(scWindowState))
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.GetScWindowStateB.name);
    });
  }
}