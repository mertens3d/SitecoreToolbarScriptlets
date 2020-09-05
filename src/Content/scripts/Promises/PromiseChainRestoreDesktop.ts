import { RecipeBasics } from '../../../Shared/scripts/Classes/RecipeBasics';
import { ILoggerAgent } from '../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IDataBucketRestoreDesktop } from '../../../Shared/scripts/Interfaces/IDataBucketRestoreDesktop';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { IDataOneIframe } from '../../../Shared/scripts/Interfaces/IDataOneIframe';
import { IDataOneStorageOneTreeState } from '../../../Shared/scripts/Interfaces/IDataOneStorageOneTreeState';
import { ContentConst } from '../../../Shared/scripts/Interfaces/InjectConst';
import { LoggableBase } from '../Managers/LoggableBase';
import { MiscManager } from '../Managers/MiscManager/MiscManager';
import { OneCEAgent } from '../Managers/OneCEAgent/OneCEAgent';
import { ScWindowManager } from '../Managers/ScWindowManager/ScWindowManager';

export class PromiseChainRestoreDesktop extends LoggableBase {
  private MiscMan: MiscManager;
  private RecipeBasics: RecipeBasics;
  private OneScWinMan: ScWindowManager;

  constructor(logger: ILoggerAgent, miscMan: MiscManager, recipeBasics: RecipeBasics, oneScWinMan: ScWindowManager) {
    super(logger);
    this.Logger.FuncStart(PromiseChainRestoreDesktop.name);

    this.MiscMan = miscMan;
    this.RecipeBasics = recipeBasics;
    this.OneScWinMan = oneScWinMan;

    this.Logger.FuncEnd(PromiseChainRestoreDesktop.name);
  }

  private __waitForAndClickRedStartButton(targetDoc: IDataOneDoc) {
    return new Promise<IDataBucketRestoreDesktop>(async (resolve, reject) => {
      this.Logger.FuncStart(this.__waitForAndClickRedStartButton.name);

      if (this.MiscMan.NotNullOrUndefined(targetDoc, this.__waitForAndClickRedStartButton.name)) {
        this.Logger.MarkerB();

        await this.RecipeBasics.RaceWaitAndClick(ContentConst.Const.Selector.SC.scStartButton, targetDoc)
          .then(() => resolve())
          .catch((ex) => reject(ex));
      } else {
        reject(this.__waitForAndClickRedStartButton.name + ' something was null or undefined');
      }
      this.Logger.FuncEnd(this.__waitForAndClickRedStartButton.name);
    });
  }

  private __waitForIframeReady(targetIframe: IDataOneIframe) {
    return new Promise<void>(async (resolve, reject) => {
      this.Logger.FuncStart(this.__waitForIframeReady.name, 'targetIframe not null: ' + (targetIframe !== null));

      //  var promResult: PromiseResult = new PromiseResult(this.__waitForIframeCountDiff.name, this.Logger);

      await this.RecipeBasics.WaitForReadyIframe(targetIframe)
        .then((result) => {
          this.Logger.Log('resolved! : ');

          targetIframe.ContentDoc.ContentDoc = targetIframe.IframeElem.contentDocument;
          this.Logger.DebugDataOneIframe(targetIframe);

          resolve();
        })
        .catch((err) => {
          this.Logger.Log('rejected ! : ');
          reject(this.__waitForIframeReady.name + ' ' + err);
        })

      this.Logger.FuncEnd(this.__waitForIframeReady.name);
    });
  }
  private __waitForAndThenClickCEFromMenu(targetDoc: IDataOneDoc) {
    return new Promise<IDataBucketRestoreDesktop>(async (resolve, reject) => {
      await this.RecipeBasics.WaitForThenClick([ContentConst.Const.Selector.SC.StartMenuLeftOption], targetDoc)
        .then(() => { resolve(); })
        .catch((ex) => { reject(this.__waitForAndThenClickCEFromMenu.name + ' ' + ex); });
    });
  }

  private __restoreDataToOneIframe(oneTreeState: IDataOneStorageOneTreeState, targetCeAgent: OneCEAgent) {
    return new Promise<void>(async (resolve, reject) => {
      this.Logger.FuncStart(this.__restoreDataToOneIframe.name);

      await this.OneScWinMan.OneDesktopMan.RestoreDataToOneIframeWorker(oneTreeState, targetCeAgent)
        .then(() => resolve())
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.__restoreDataToOneIframe.name);
    });
  }

  async RunOneChain(targetDoc: IDataOneDoc, dataToRestore: IDataOneStorageOneTreeState, promisesBasic: RecipeBasics): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.RunOneChain.name);

      if (this.MiscMan.NotNullOrUndefined([targetDoc, dataToRestore], this.RunOneChain.name)) {
        var dataBucket: IDataBucketRestoreDesktop = {
          targetDoc: targetDoc,
          IFramesbefore: allIframeDataAtBeginning,
          oneTreeState: dataToRestore,
          LastChainLinkSuccessful: false,
        }
        //guaranteed to be on the correct page

        var allIframeDataAtBeginning: IDataOneIframe[];
        var targetCeAgent: OneCEAgent;

        await promisesBasic.GetAllLiveIframeData(targetDoc)
          .then((result) => allIframeDataAtBeginning = result)
          .then(() => this.__waitForAndClickRedStartButton(dataBucket.targetDoc))
          .then(() => this.__waitForAndThenClickCEFromMenu(dataBucket.targetDoc))

          .then(() => promisesBasic.WaitForNewIframe(allIframeDataAtBeginning, dataBucket.targetDoc))

          .then((result) => {
            targetCeAgent = new OneCEAgent(result.ContentDoc, this.Logger);
            this.__waitForIframeReady(result);
          })
          .then(() => this.__restoreDataToOneIframe(dataToRestore, targetCeAgent))
          .then(() => resolve())
          .catch(ex => {
            this.Logger.ErrorAndThrow(this.RunOneChain.name, ex);
          });
      }
      else {
        reject(this.RunOneChain.name + ' missing data');
      }

      this.Logger.FuncEnd(this.RunOneChain.name);
    });
  }
}