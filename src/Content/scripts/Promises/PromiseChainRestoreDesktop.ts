import { IAllAgents } from '../../../Shared/scripts/Interfaces/Agents/IAllAgents';
import { IDataBucketRestoreDesktop } from '../../../Shared/scripts/Interfaces/IDataBucketRestoreDesktop';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { IDataOneIframe } from '../../../Shared/scripts/Interfaces/IDataOneIframe';
import { IDataOneStorageOneTreeState } from '../../../Shared/scripts/Interfaces/IDataOneStorageOneTreeState';
import { ContentConst } from '../../../Shared/scripts/Interfaces/InjectConst';
import { ContentHub } from '../Managers/ContentHub/ContentHub';
import { OneCEAgent } from '../Managers/OneCEAgent/OneCEAgent';
import { ContentManagerBase } from '../_first/_ContentManagerBase';

export class PromiseChainRestoreDesktop extends ContentManagerBase {
  constructor(hub: ContentHub, AllAgents: IAllAgents) {
    super(hub, AllAgents);
    this.AllAgents.Logger.FuncStart(PromiseChainRestoreDesktop.name);
    this.AllAgents.Logger.FuncEnd(PromiseChainRestoreDesktop.name);
  }

  private __waitForAndClickRedStartButton(targetDoc: IDataOneDoc) {
    return new Promise<IDataBucketRestoreDesktop>(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.__waitForAndClickRedStartButton.name);

      if (this.MiscMan().NotNullOrUndefined(targetDoc, this.__waitForAndClickRedStartButton.name)) {
        this.AllAgents.Logger.MarkerB();

        await this.AllAgents.HelperAgent.PromisesBasic.RaceWaitAndClick(ContentConst.Const.Selector.SC.scStartButton, targetDoc)
          .then(() => resolve())
          .catch((ex) => reject(ex));
      } else {
        reject(this.__waitForAndClickRedStartButton.name + ' something was null or undefined');
      }
      this.AllAgents.Logger.FuncEnd(this.__waitForAndClickRedStartButton.name);
    });
  }

  private __waitForIframeReady(targetIframe: IDataOneIframe) {
    return new Promise<void>(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.__waitForIframeReady.name, 'targetIframe not null: ' + (targetIframe !== null));

      //  var promResult: PromiseResult = new PromiseResult(this.__waitForIframeCountDiff.name, this.AllAgents.Logger);

      await this.AllAgents.HelperAgent.PromisesBasic.WaitForReadyIframe(targetIframe)
        .then((result) => {
          this.AllAgents.Logger.Log('resolved! : ');

          targetIframe.ContentDoc.ContentDoc = targetIframe.IframeElem.contentDocument;
          this.AllAgents.Logger.DebugDataOneIframe(targetIframe);

          resolve();
        })
        .catch((err) => {
          this.AllAgents.Logger.Log('rejected ! : ');
          reject(this.__waitForIframeReady.name + ' ' + err);
        })

      this.AllAgents.Logger.FuncEnd(this.__waitForIframeReady.name);
    });
  }
  private __waitForAndThenClickCEFromMenu(targetDoc: IDataOneDoc) {
    return new Promise<IDataBucketRestoreDesktop>(async (resolve, reject) => {
      await this.AllAgents.HelperAgent.PromisesBasic.WaitForThenClick([ContentConst.Const.Selector.SC.StartMenuLeftOption], targetDoc)
        .then(() => { resolve(); })
        .catch((ex) => { reject(this.__waitForAndThenClickCEFromMenu.name + ' ' + ex); });
    });
  }

  private __restoreDataToOneIframe(oneTreeState: IDataOneStorageOneTreeState, targetCeAgent: OneCEAgent) {
    return new Promise<void>(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.__restoreDataToOneIframe.name);

      //this.AllAgents.Logger.DebugDataOneIframe(targetCeAgent);

      var success = await this.OneScWinMan().OneDesktopMan.RestoreDataToOneIframeWorker(oneTreeState, targetCeAgent);

      if (success) {
        resolve();
      } else {
        reject(this.__restoreDataToOneIframe.name);
      }

      this.AllAgents.Logger.FuncEnd(this.__restoreDataToOneIframe.name);
    });
  }

  async RunOneChain(targetDoc: IDataOneDoc, dataToRestore: IDataOneStorageOneTreeState): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.RunOneChain.name);

      if (this.MiscMan().NotNullOrUndefined([targetDoc, dataToRestore], this.RunOneChain.name)) {
        var dataBucket: IDataBucketRestoreDesktop = {
          targetDoc: targetDoc,
          IFramesbefore: allIframeDataAtBeginning,
          oneTreeState: dataToRestore,
          LastChainLinkSuccessful: false,
        }
        //guaranteed to be on the correct page

        var allIframeDataAtBeginning: IDataOneIframe[];
        var targetCeAgent: OneCEAgent;

        await this.AllAgents.HelperAgent.PromisesBasic.GetAllLiveIframeData(targetDoc)
          .then((result) => allIframeDataAtBeginning = result)
          .then(() => this.__waitForAndClickRedStartButton(dataBucket.targetDoc))
          .then(() => this.__waitForAndThenClickCEFromMenu(dataBucket.targetDoc))

          .then(() => this.AllAgents.HelperAgent.PromisesBasic.WaitForNewIframe(allIframeDataAtBeginning, dataBucket.targetDoc))

          .then((result) => {
            targetCeAgent = new OneCEAgent(result.ContentDoc, this.AllAgents.Logger, this.AllAgents.HelperAgent);
            this.__waitForIframeReady(result);
          })
          .then(() => this.__restoreDataToOneIframe(dataToRestore, targetCeAgent))
          .then(() => resolve())
          .catch(ex => {
            this.AllAgents.Logger.ErrorAndThrow(this.RunOneChain.name, ex);
          });
      }
      else {
        reject(this.RunOneChain.name + ' missing data');
      }

      this.AllAgents.Logger.FuncEnd(this.RunOneChain.name);
    });
  }
}