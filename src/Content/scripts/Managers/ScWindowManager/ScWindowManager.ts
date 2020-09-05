import { RecipeBasics } from '../../../../Shared/scripts/Classes/RecipeBasics';
import { StaticHelpers } from '../../../../Shared/scripts/Classes/StaticHelpers';
import { QueryStrKey } from '../../../../Shared/scripts/Enums/QueryStrKey';
import { scWindowType } from '../../../../Shared/scripts/Enums/scWindowType';
import { SnapShotFlavor } from '../../../../Shared/scripts/Enums/SnapShotFlavor';
import { Guid } from '../../../../Shared/scripts/Helpers/Guid';
import { GuidData } from "../../../../Shared/scripts/Helpers/GuidData";
import { IContentAtticAgent } from '../../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent';
import { ILoggerAgent } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IScUrlAgent } from '../../../../Shared/scripts/Interfaces/Agents/IScUrlAgent/IScUrlAgent';
import { IScWindowManager } from '../../../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager';
import { IToastAgent } from '../../../../Shared/scripts/Interfaces/Agents/IToastAgent';
import { IDataDesktopState } from '../../../../Shared/scripts/Interfaces/IDataDtState';
import { IDataOneDoc } from '../../../../Shared/scripts/Interfaces/IDataOneDoc';
import { IDataOneIframe } from '../../../../Shared/scripts/Interfaces/IDataOneIframe';
import { IDataOneStorageOneTreeState } from '../../../../Shared/scripts/Interfaces/IDataOneStorageOneTreeState';
import { IDataOneWindowStorage } from '../../../../Shared/scripts/Interfaces/IDataOneWindowStorage';
import { LoggableBase } from '../LoggableBase';
import { MiscManager } from '../MiscManager/MiscManager';
import { OneCEAgent } from '../../Agents/OneCEAgent/OneCEAgent';
import { OneDesktopManager } from '../OneDesktopManager/OneDesktopManager';
import { SitecoreUiManager } from '../SitecoreUiManager/SitecoreUiManager';

export class ScWindowManager extends LoggableBase implements IScWindowManager {
  OneDesktopMan: OneDesktopManager = null;
  OneCEAgent: OneCEAgent = null;
  private RecipeBasics: RecipeBasics;
  private MiscMan: MiscManager;
  private ToastAgent: IToastAgent;
  private ScUrlAgent: IScUrlAgent;
  private topDoc: IDataOneDoc;
  private AtticAgent: IContentAtticAgent;

  constructor(logger: ILoggerAgent, scUiMan: SitecoreUiManager, recipeBasics: RecipeBasics, miscMan: MiscManager, toastAgent: IToastAgent, atticAgent: IContentAtticAgent,
    scUrlAgent: IScUrlAgent) {
    super(logger);
    this.Logger.InstantiateStart(ScWindowManager.name);
    this.RecipeBasics = recipeBasics;
    this.MiscMan = miscMan;
    this.ToastAgent = toastAgent;
    this.AtticAgent = atticAgent;
    this.ScUrlAgent = scUrlAgent;
    this.Logger.InstantiateEnd(ScWindowManager.name);
  }

  GetCurrentPageType(): scWindowType {
    return this.ScUrlAgent.GetScWindowType()
  }

  async InitScWindowManager() {
    this.Logger.FuncStart(this.InitScWindowManager.name);

    let currPageType = this.GetCurrentPageType();

    if (currPageType === scWindowType.Desktop) {
      this.OneDesktopMan = new OneDesktopManager(this.Logger, this.TopLevelDoc(), this.RecipeBasics, this.MiscMan, this);
    } else if (currPageType === scWindowType.ContentEditor) {
      this.OneCEAgent = new OneCEAgent(this.TopLevelDoc(), this.Logger);
    }

    await this.InitFromQueryStr(this.AtticAgent, this.RecipeBasics)
      .catch ((err) => { throw (err) });

    this.Logger.FuncEnd(this.InitScWindowManager.name);
  }

  TopLevelDoc(): IDataOneDoc {
    if (!this.topDoc) {
      this.topDoc = {
        //ParentDoc: null,
        ContentDoc: window.document,
        DocId: Guid.NewRandomGuid(),
        Nickname: 'top doc'
      }
    }
    return this.topDoc;
  }

  InitFromQueryStr(atticMan: IContentAtticAgent, recipeBasics: RecipeBasics): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.InitFromQueryStr.name);

      try {
        if (this.ScUrlAgent.QueryStringHasKey(QueryStrKey.hsTargetSs)) {
          let qsValue: string = (this.ScUrlAgent.GetQueryStringValueByKey(QueryStrKey.hsTargetSs));
          let targetGuid: GuidData = Guid.ParseGuid(qsValue, false);

          if (targetGuid && targetGuid !== GuidData.GetEmptyGuid()) {
            this.Logger.LogVal("targetGuid", targetGuid.Raw);
            var dataOneWindowStorage;

            var targetDoc: IDataOneDoc = this.TopLevelDoc();
            if (targetDoc) {
              await atticMan.GetFromStorageById(targetGuid)
                .then((result) => dataOneWindowStorage = result)
                .then(() => recipeBasics.WaitForPageReadyNative(targetDoc))
                .then(() => this.RestoreStateToTargetDoc(targetDoc, dataOneWindowStorage))
                .then(() => resolve())
                .catch((err) => reject(this.InitFromQueryStr.name + ' ' + err));
            }
            else {
              reject(this.InitFromQueryStr.name + ' no targetDoc');
            }
          } else {
            reject('Either no snapshot provided or an illegal one was found');
          }
        }
      } catch (ex) {
        reject(this.InitFromQueryStr.name + ' ' + ex)
      }

      this.Logger.FuncEnd(this.InitFromQueryStr.name);
    });
  }

  private CreateShellIDataOneWindowStorage(windowType: scWindowType, flavor: SnapShotFlavor): IDataOneWindowStorage {
    this.Logger.FuncStart(this.CreateShellIDataOneWindowStorage.name);
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

    this.Logger.FuncEnd(this.CreateShellIDataOneWindowStorage.name);

    return activeWindowSnapShot;
  }

  GetWindowState(targetSnapShotFlavor: SnapShotFlavor): Promise<IDataOneWindowStorage> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetWindowState.name);

      let currentPageType = this.GetCurrentPageType();
      var snapShot: IDataOneWindowStorage = this.CreateShellIDataOneWindowStorage(currentPageType, targetSnapShotFlavor);

      if (currentPageType === scWindowType.ContentEditor) {
        this.Logger.MarkerA();
        var id = GuidData.GetEmptyGuid();

        await this.OneCEAgent.GetTreeState(id)
          .then((state: IDataOneStorageOneTreeState) => {
            snapShot.AllCEAr.push(state);
            resolve(snapShot);
          })
          .catch((err) => reject(err));
      }
      else if (currentPageType === scWindowType.Desktop) {
        this.Logger.MarkerB();

        await this.OneDesktopMan.GetStateDesktop()
          .then((states: IDataDesktopState) => {
            snapShot.AllCEAr = states.AllCeData;
            resolve(snapShot);
          })
          .catch((err) => reject(err));
      }
      else {
        this.Logger.ErrorAndThrow(this.GetWindowState.name, 'Invalid page location ' + currentPageType);
      }

      this.Logger.FuncEnd(this.GetWindowState.name);
    });
  }

  private async __getTopLevelIframe(targetDoc: IDataOneDoc): Promise<IDataOneIframe> {
    return new Promise(async (resolve, reject) => {
      var toReturn: IDataOneIframe = null;

      var allIframe: IDataOneIframe[];

      await this.RecipeBasics.GetAllLiveIframeData(targetDoc)
        .then((result) => {
          allIframe = result

          var maxZVal = -1;
          if (allIframe && allIframe.length > 0) {
            for (var idx = 0; idx < allIframe.length; idx++) {
              var candidateIframe = allIframe[idx];
              if (candidateIframe && candidateIframe.Zindex > maxZVal) {
                toReturn = candidateIframe;
                maxZVal = candidateIframe.Zindex;
              }
            }
          }
        })
        .then(() => resolve(toReturn))
        .catch((err) => reject(this.__getTopLevelIframe.name + ' ' + err));
    })
  }

  async SetCompactCss(targetDoc: IDataOneDoc) {
    //if (this.ScUiMan().GetCurrentPageType() === scWindowType.ContentEditor) {
    await this.OneCEAgent.SetCompactCss();
    //}
  }

  async RestoreStateToTargetDoc(targetDoc: IDataOneDoc, dataToRestore: IDataOneWindowStorage): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.RestoreStateToTargetDoc.name);

      if (dataToRestore) {
        if (dataToRestore.WindowType === scWindowType.ContentEditor || dataToRestore.WindowType === scWindowType.Desktop) {
          if (dataToRestore.WindowType === scWindowType.ContentEditor) {
            await this.OneCEAgent.RestoreCEStateAsync(dataToRestore.AllCEAr[0])
              .then(() => this.ToastAgent.PopUpToastNotification(targetDoc, 'Restore Completed'))
              .then(() => resolve())
              .catch((err) => reject(err));
          } else {
            await this.OneDesktopMan.RestoreDesktopState(targetDoc, dataToRestore)
              .then(() => this.ToastAgent.PopUpToastNotification(targetDoc, 'Restore Completed'))
              .then(() => {
                this.Logger.LogVal('resolving', this.RestoreStateToTargetDoc.name)
                resolve();
              })
              .catch((err) => reject(err));
          }
        }
        else {
          reject(this.RestoreStateToTargetDoc.name + 'Data not restored. Not in Desktop or Content Editor');
        }
      }
      else {
        reject(this.RestoreStateToTargetDoc.name + " No data found to restore");
      }

      reject(this.RestoreStateToTargetDoc.name + ' : unknown reason');

      this.Logger.FuncEnd(this.RestoreStateToTargetDoc.name);
    });
  }
}