import { ContentHub } from '../Managers/ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { IDataBucketRestoreDesktop } from '../../../Shared/scripts/Interfaces/IDataBucketRestoreDesktop';
import { IDataBrowserTab } from '../../../Shared/scripts/Interfaces/IDataBrowserWindow';
import { IDataOneStorageCE } from '../../../Shared/scripts/Interfaces/IDataOneStorageCE';
import { IDataOneIframe } from '../../../Shared/scripts/Interfaces/IDataOneIframe';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { ResultSuccessFail } from '../../../Shared/scripts/Classes/ResultSuccessFail';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';

export class PromiseChainRestoreDesktop extends ContentManagerBase {
  constructor(hub: ContentHub) {
    hub.debug.FuncStart(PromiseChainRestoreDesktop.name);
    super(hub)
    hub.debug.FuncEnd(PromiseChainRestoreDesktop.name);
  }

  private __waitForAndClickRedStartButtonPromise(promiseBucket: IDataBucketRestoreDesktop) {
    return new Promise<IDataBucketRestoreDesktop>(async (resolve, reject) => {
      this.debug().FuncStart(this.__waitForAndClickRedStartButtonPromise.name);

      if (this.MiscMan().NotNullOrUndefined([promiseBucket, promiseBucket.targetDoc], this.__waitForAndClickRedStartButtonPromise.name)) {
        await this.PromiseGen().RaceWaitAndClick(this.Const().Selector.SC.scStartButton, promiseBucket.targetDoc)
          .then(() => resolve(promiseBucket))
          .catch(ex => {
            this.debug().Error(this.__waitForAndClickRedStartButtonPromise.name, ex);
            reject();
          });
      } else {
        reject();
      }
      this.debug().FuncEnd(this.__waitForAndClickRedStartButtonPromise.name);
    });
  }

  private __waitForIframeReady(promiseBucket: IDataBucketRestoreDesktop) {
    return new Promise<IDataBucketRestoreDesktop>(async (resolve, reject) => {
      this.debug().FuncStart(this.__waitForIframeReady.name, 'promiseBucket not null: ' + (promiseBucket !== null));

      this.debug().PromiseBucketDebug(promiseBucket, this.__waitForIframeReady.name);

      var success = await this.PromiseGen().WaitForReadyIframe(promiseBucket.NewIframe);

      if (success) {
        this.debug().Log('resolved! : ');

        promiseBucket.NewIframe.ContentDoc.Document = promiseBucket.NewIframe.IframeElem.contentDocument;
        this.debug().DebugDataOneIframe(promiseBucket.NewIframe);

        resolve(promiseBucket);
      } else {
        this.debug().Log('rejected ! : ');
        reject(this.__waitForIframeReady.name);
      }
      this.debug().FuncEnd(this.__waitForIframeReady.name);
    });
  }

  private __waitForIframeCountDiffPromise(promiseBucket: IDataBucketRestoreDesktop) {
    return new Promise<IDataBucketRestoreDesktop>(async (resolve, reject) => {
      this.debug().FuncStart(this.__waitForIframeCountDiffPromise.name);

      var success: ResultSuccessFail = new ResultSuccessFail();

      var iframeResult: IDataOneIframe = await this.DesktopMan().WaitForIframeCountDiffWorker(promiseBucket.IFramesbefore, promiseBucket.targetWindow);
      this.debug().MarkerB();
      if (iframeResult) {
        this.debug().MarkerC();

        promiseBucket.NewIframe = iframeResult;

        this.debug().DebugDataOneIframe(promiseBucket.NewIframe);

        success.Succeeded = true;
      } else {
        success.Succeeded = false;
        success.FailMessage = 'fail ' + this.__waitForIframeCountDiffPromise.name;
      }

      this.debug().FuncEnd(this.__waitForIframeCountDiffPromise.name);

      if (success.Succeeded) {
        resolve(promiseBucket);
      } else {
        reject(success.FailMessage);
      }
    });
  }

  private __waitForAndThenClickCEFromMenuPromise(promiseBucket: IDataBucketRestoreDesktop) {
    return new Promise<IDataBucketRestoreDesktop>(async (resolve, reject) => {
      await this.PromiseGen().WaitForThenClick([this.Const().Selector.SC.StartMenuLeftOption], promiseBucket.targetDoc)
        .then(() => { resolve(promiseBucket); })
        .catch((ex) => { reject(this.__waitForAndThenClickCEFromMenuPromise.name); });
    });
  }

  private __restoreDataToOneIframe(promiseBucket: IDataBucketRestoreDesktop) {
    return new Promise<IDataBucketRestoreDesktop>(async (resolve, reject) => {
      this.debug().FuncStart(this.__restoreDataToOneIframe.name);

      this.debug().DebugDataOneIframe(promiseBucket.NewIframe);

      var success = await this.DesktopMan().RestoreDataToOneIframeWorker(promiseBucket.oneCEdata, promiseBucket.NewIframe);
      if (success) {
        resolve(promiseBucket);
      } else {
        reject(this.__restoreDataToOneIframe.name);
      }

      this.debug().FuncEnd(this.__restoreDataToOneIframe.name);
    });
  }



  async RunOneChain(targetDoc: IDataOneDoc, dataToRestore: IDataOneStorageCE) {
    this.debug().FuncStart(this.RunOneChain.name);

    if (this.MiscMan().NotNullOrUndefined([targetDoc, dataToRestore], this.RunOneChain.name)) {
      var allIframeData = this.DesktopMan().GetAllLiveIframeData(targetDoc);

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
        .then(dataBucket => this.__waitForIframeCountDiffPromise(dataBucket))
        .then(dataBucket => this.__waitForIframeReady(dataBucket))
        .then(dataBucket => this.__restoreDataToOneIframe(dataBucket))
        .catch(ex => {
          this.debug().Error(this.RunOneChain.name, ex);
        });

      this.debug().FuncEnd(this.RunOneChain.name);
    }
  }
}