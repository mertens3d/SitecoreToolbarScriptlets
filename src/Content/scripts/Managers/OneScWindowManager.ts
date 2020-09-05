import { RecipeBasics } from '../../../Shared/scripts/Classes/PromiseGeneric';
import { StaticHelpers } from '../../../Shared/scripts/Classes/StaticHelpers';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { SnapShotFlavor } from '../../../Shared/scripts/Enums/SnapShotFlavor';
import { Guid } from '../../../Shared/scripts/Helpers/Guid';
import { GuidData } from "../../../Shared/scripts/Helpers/GuidData";
import { ILoggerAgent } from '../../../Shared/scripts/Interfaces/Agents/ILoggerBase';
import { IToastAgent } from '../../../Shared/scripts/Interfaces/Agents/IToastAgent';
import { IDataDesktopState } from '../../../Shared/scripts/Interfaces/IDataDtState';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { IDataOneIframe } from '../../../Shared/scripts/Interfaces/IDataOneIframe';
import { IDataOneStorageOneTreeState } from '../../../Shared/scripts/Interfaces/IDataOneStorageOneTreeState';
import { IDataOneWindowStorage } from '../../../Shared/scripts/Interfaces/IDataOneWindowStorage';
import { IDataPayloadSnapShot } from '../../../Shared/scripts/Interfaces/IDataPayloadSnapShot';
import { LoggableBase } from './LoggableBase';
import { MiscManager } from './MiscManager/MiscManager';
import { OneCEAgent } from './OneCEAgent/OneCEAgent';
import { OneDesktopManager } from './OneDesktopManager/OneDesktopManager';
import { SitecoreUiManager } from './SitecoreUiManager/SitecoreUiManager';

export class OneScWindowManager extends LoggableBase {
  OneDesktopMan: OneDesktopManager = null;
  OneCEAgent: OneCEAgent = null;
  private ScUiMan: SitecoreUiManager;
  private RecipeBasics: RecipeBasics;
  private MiscMan: MiscManager;
  private ToastAgent: IToastAgent;

  constructor(logger: ILoggerAgent, scUiMan: SitecoreUiManager, recipeBasics: RecipeBasics, miscMan: MiscManager, toastAgent: IToastAgent) {
    super(logger);
    this.Logger.FuncStart(OneScWindowManager.name);

    this.ScUiMan = scUiMan;
    this.RecipeBasics = recipeBasics;
    this.MiscMan = miscMan;
    this.ToastAgent = toastAgent;

    this.Logger.FuncEnd(OneScWindowManager.name);
  }

  InitOneScWindowManager() {
    let currPageType = this.ScUiMan.GetCurrentPageType();

    if (currPageType === scWindowType.Desktop) {
      this.OneDesktopMan = new OneDesktopManager(this.Logger, this.ScUiMan.TopLevelDoc(), this.RecipeBasics, this.MiscMan, this);
    } else if (currPageType === scWindowType.ContentEditor) {
      this.OneCEAgent = new OneCEAgent(this.ScUiMan.TopLevelDoc(), this.Logger);
    }
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

  GetWindowState(snapShotSettings: IDataPayloadSnapShot): Promise<IDataOneWindowStorage> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetWindowState.name);

      var snapShot: IDataOneWindowStorage = this.CreateShellIDataOneWindowStorage(snapShotSettings.CurrentPageType, snapShotSettings.Flavor);

      if (snapShotSettings) {
        if (snapShotSettings.SnapShotNewNickname) {
          snapShot.NickName = snapShotSettings.SnapShotNewNickname;
        }
        snapShot.Flavor = snapShotSettings.Flavor;
      }

      if (snapShotSettings.CurrentPageType === scWindowType.ContentEditor) {
        this.Logger.MarkerA();
        var id = GuidData.GetEmptyGuid();

        await this.OneCEAgent.GetTreeState(id)
          .then((state: IDataOneStorageOneTreeState) => {
            snapShot.AllCEAr.push(state);
            resolve(snapShot);
          })
          .catch((err) => reject(err));
      }
      else if (snapShotSettings.CurrentPageType === scWindowType.Desktop) {
        this.Logger.MarkerB();

        await this.OneDesktopMan.GetStateDesktop()
          .then((states: IDataDesktopState) => {
            snapShot.AllCEAr = states.AllCeData;
            resolve(snapShot);
          })
          .catch((err) => reject(err));
      }
      else {
        this.Logger.ErrorAndThrow(this.GetWindowState.name, 'Invalid page location ' + snapShotSettings.CurrentPageType);
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
        .catch((err) => this.Logger.ErrorAndThrow(this.__getTopLevelIframe.name, err));
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