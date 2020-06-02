import { ContentHub } from '../Managers/ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { IDataBucketRestoreDesktop } from '../../../Shared/scripts/Interfaces/IDataBucketRestoreDesktop';
import { IDataOneStorageOneTreeState } from '../../../Shared/scripts/Interfaces/IDataOneStorageOneTreeState';
import { IDataOneIframe } from '../../../Shared/scripts/Interfaces/IDataOneIframe';
import { PromiseResult } from "../../../Shared/scripts/Classes/PromiseResult";
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { ContentConst } from '../../../Shared/scripts/Interfaces/InjectConst';
import { IAllAgents } from '../../../Shared/scripts/Interfaces/Agents/IAllAgents';
import { OneCEAgent } from '../Managers/OneCEAgent';

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

        await this.AllAgents.HelperAgent.PromiseHelper.RaceWaitAndClick(ContentConst.Const.Selector.SC.scStartButton, targetDoc)
          .then(() => resolve())
          .catch((ex) => reject(ex));
      } else {
        reject(this.__waitForAndClickRedStartButton.name + ' something was null or undefined');
      }
      this.AllAgents.Logger.FuncEnd(this.__waitForAndClickRedStartButton.name);
    });
  }

  private __waitForIframeReady( targetIframe: IDataOneIframe) {
    return new Promise<void>(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.__waitForIframeReady.name, 'targetIframe not null: ' + (targetIframe !== null));


      //  var promResult: PromiseResult = new PromiseResult(this.__waitForIframeCountDiff.name, this.AllAgents.Logger);

      await this.AllAgents.HelperAgent.PromiseHelper.WaitForReadyIframe(targetIframe)
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

  private __waitForNewIframe(iframesBefore: IDataOneIframe[]) {
    return new Promise<IDataOneIframe>(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.__waitForNewIframe.name);

      var result: PromiseResult = new PromiseResult(this.__waitForNewIframe.name, this.AllAgents.Logger);

      var iframeResult: IDataOneIframe;

      await this.OneScWinMan().OneDesktopMan.WaitForNewIframe(iframesBefore)
        .then((result) => iframeResult = result)
        .then(() => resolve(iframeResult))
        .catch((err) => {
          this.AllAgents.Logger.DebugDataOneIframe(iframeResult);
          reject(err);
        });

      this.AllAgents.Logger.FuncEnd(this.__waitForNewIframe.name);
    });
  }

  private __waitForAndThenClickCEFromMenu(targetDoc: IDataOneDoc) {
    return new Promise<IDataBucketRestoreDesktop>(async (resolve, reject) => {
      await this.AllAgents.HelperAgent.PromiseHelper.WaitForThenClick([ContentConst.Const.Selector.SC.StartMenuLeftOption], targetDoc)
        .then(() => { resolve(); })
        .catch((ex) => { reject(this.__waitForAndThenClickCEFromMenu.name + ' ' + ex); });
    });
  }

  private __restoreDataToOneIframe(oneTreeState: IDataOneStorageOneTreeState,targetCeAgent: OneCEAgent) {
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

  async RunOneChain(targetDoc: IDataOneDoc, dataToRestore: IDataOneStorageOneTreeState) {
    this.AllAgents.Logger.FuncStart(this.RunOneChain.name);

    if (this.MiscMan().NotNullOrUndefined([targetDoc, dataToRestore], this.RunOneChain.name)) {
      var dataBucket: IDataBucketRestoreDesktop = {
        targetDoc: targetDoc,
        IFramesbefore: allIframeData,
        oneTreeState: dataToRestore,
        LastChainLinkSuccessful: false,
      }
      //this.debug().PromiseBucketDebug(dataBucket, this.RunOneChain.name);

      //guaranteed to be on the correct page

      var allIframeData = this.OneScWinMan().OneDesktopMan.GetAllLiveIframeData();
      var targetCeAgent: OneCEAgent;
      await

        this.__waitForAndClickRedStartButton(dataBucket.targetDoc)
          .then(() => this.__waitForAndThenClickCEFromMenu(dataBucket.targetDoc))
          .then(() => this.__waitForNewIframe(allIframeData))
          .then((result) => {
            targetCeAgent = new OneCEAgent(result.ContentDoc, this.AllAgents.Logger, this.AllAgents.HelperAgent);
            this.__waitForIframeReady(result);
          })
          .then(() => this.__restoreDataToOneIframe(dataToRestore, targetCeAgent))
          .catch(ex => {
            this.AllAgents.Logger.ErrorAndThrow(this.RunOneChain.name, ex);
          });

      this.AllAgents.Logger.FuncEnd(this.RunOneChain.name);
    }
  }
}