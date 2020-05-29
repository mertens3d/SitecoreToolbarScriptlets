﻿import { ContentHub } from '../Managers/ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { IDataBucketRestoreDesktop } from '../../../Shared/scripts/Interfaces/IDataBucketRestoreDesktop';
import { IDataOneStorageCE } from '../../../Shared/scripts/Interfaces/IDataOneStorageCE';
import { IDataOneIframe } from '../../../Shared/scripts/Interfaces/IDataOneIframe';
import { PromiseResult } from "../../../Shared/scripts/Classes/PromiseResult";
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { ContentConst } from '../../../Shared/scripts/Interfaces/InjectConst';
import { IAllAgents } from '../../../Shared/scripts/Interfaces/Agents/IAllAgents';

export class PromiseChainRestoreDesktop extends ContentManagerBase {
  constructor(hub: ContentHub, AllAgents: IAllAgents) {
    super(hub, AllAgents);
    this.AllAgents.Logger.FuncStart(PromiseChainRestoreDesktop.name);
    this.AllAgents.Logger.FuncEnd(PromiseChainRestoreDesktop.name);
  }

  private __waitForAndClickRedStartButtonPromise(promiseBucket: IDataBucketRestoreDesktop) {
    return new Promise<IDataBucketRestoreDesktop>(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.__waitForAndClickRedStartButtonPromise.name);

      if (this.MiscMan().NotNullOrUndefined([promiseBucket, promiseBucket.targetDoc], this.__waitForAndClickRedStartButtonPromise.name)) {
        this.AllAgents.Logger.MarkerB();

        await this.Helpers().PromiseHelp.RaceWaitAndClick(ContentConst.Const.Selector.SC.scStartButton, promiseBucket.targetDoc)
          .then(() => resolve(promiseBucket))
          .catch(ex => {
            this.AllAgents.Logger.Error(this.__waitForAndClickRedStartButtonPromise.name, ex);
            reject(ex);
          });
      } else {
        reject(this.__waitForAndClickRedStartButtonPromise.name + ' something was null or undefined');
      }
      this.AllAgents.Logger.FuncEnd(this.__waitForAndClickRedStartButtonPromise.name);
    });
  }

  private __waitForIframeReady(promiseBucket: IDataBucketRestoreDesktop) {
    return new Promise<IDataBucketRestoreDesktop>(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.__waitForIframeReady.name, 'promiseBucket not null: ' + (promiseBucket !== null));

      this.AllAgents.Logger.PromiseBucketDebug(promiseBucket, this.__waitForIframeReady.name);

      var success = await this.Helpers().PromiseHelp.WaitForReadyIframe(promiseBucket.NewIframe);

      if (success) {
        this.AllAgents.Logger.Log('resolved! : ');

        promiseBucket.NewIframe.ContentDoc.ContentDoc = promiseBucket.NewIframe.IframeElem.contentDocument;
        this.AllAgents.Logger.DebugDataOneIframe(promiseBucket.NewIframe);

        resolve(promiseBucket);
      } else {
        this.AllAgents.Logger.Log('rejected ! : ');
        reject(this.__waitForIframeReady.name);
      }
      this.AllAgents.Logger.FuncEnd(this.__waitForIframeReady.name);
    });
  }

  private __waitForIframeCountDiff(promiseBucket: IDataBucketRestoreDesktop) {
    return new Promise<IDataBucketRestoreDesktop>(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.__waitForIframeCountDiff.name);

      var result: PromiseResult = new PromiseResult(this.__waitForIframeCountDiff.name, this.AllAgents.Logger);

      var iframeResult: IDataOneIframe = await this.OneScWinMan().OneDesktopMan.WaitForIframeCountDiffWorker(promiseBucket.IFramesbefore);
      this.AllAgents.Logger.MarkerB();
      if (iframeResult) {
        this.AllAgents.Logger.MarkerC();

        promiseBucket.NewIframe = iframeResult;

        this.AllAgents.Logger.DebugDataOneIframe(promiseBucket.NewIframe);

        result.MarkSuccessful();
      } else {
        result.MarkFailed('no iframe result')
      }

      this.AllAgents.Logger.FuncEnd(this.__waitForIframeCountDiff.name);

      if (result.WasSuccessful) {
        resolve(promiseBucket);
      } else {
        reject(result.RejectReasons);
      }
    });
  }

  private __waitForAndThenClickCEFromMenuPromise(promiseBucket: IDataBucketRestoreDesktop) {
    return new Promise<IDataBucketRestoreDesktop>(async (resolve, reject) => {
      await this.Helpers().PromiseHelp.WaitForThenClick([ContentConst.Const.Selector.SC.StartMenuLeftOption], promiseBucket.targetDoc)
        .then(() => { resolve(promiseBucket); })
        .catch((ex) => { reject(this.__waitForAndThenClickCEFromMenuPromise.name); });
    });
  }

  private __restoreDataToOneIframe(promiseBucket: IDataBucketRestoreDesktop) {
    return new Promise<IDataBucketRestoreDesktop>(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.__restoreDataToOneIframe.name);

      this.AllAgents.Logger.DebugDataOneIframe(promiseBucket.NewIframe);

      var success = await this.OneScWinMan().OneDesktopMan.RestoreDataToOneIframeWorker(promiseBucket.oneCEdata, promiseBucket.NewIframe);
      if (success) {
        resolve(promiseBucket);
      } else {
        reject(this.__restoreDataToOneIframe.name);
      }

      this.AllAgents.Logger.FuncEnd(this.__restoreDataToOneIframe.name);
    });
  }

  async RunOneChain(targetDoc: IDataOneDoc, dataToRestore: IDataOneStorageCE) {
    this.AllAgents.Logger.FuncStart(this.RunOneChain.name);

    if (this.MiscMan().NotNullOrUndefined([targetDoc, dataToRestore], this.RunOneChain.name)) {
      var allIframeData = this.OneScWinMan().OneDesktopMan.GetAllLiveIframeData();

      var dataBucket: IDataBucketRestoreDesktop = {
        targetDoc: targetDoc,
        IFramesbefore: allIframeData,
        oneCEdata: dataToRestore,
        NewIframe: null,
        LastChainLinkSuccessful: false,
      }
      //this.debug().PromiseBucketDebug(dataBucket, this.RunOneChain.name);

      //guaranteed to be on the correct page
      await this.__waitForAndClickRedStartButtonPromise(dataBucket)
        .then(dataBucket => this.__waitForAndThenClickCEFromMenuPromise(dataBucket))
        .then(dataBucket => this.__waitForIframeCountDiff(dataBucket))
        .then(dataBucket => this.__waitForIframeReady(dataBucket))
        .then(dataBucket => this.__restoreDataToOneIframe(dataBucket))
        .catch(ex => {
          this.AllAgents.Logger.Error(this.RunOneChain.name, ex);
        });

      this.AllAgents.Logger.FuncEnd(this.RunOneChain.name);
    }
  }
}