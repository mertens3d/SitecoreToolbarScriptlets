class PromiseChainRestoreDesktop extends ManagerBase {
  constructor(xyyz: Hub) {
    xyyz.debug.FuncStart(PromiseChainRestoreDesktop.name);
    super(xyyz)
    xyyz.debug.FuncEnd(PromiseChainRestoreDesktop.name);
  }

  private __waitForAndClickRedStartButtonPromise(promiseBucket: IDataBucketRestoreDesktop) {
    return new Promise<IDataBucketRestoreDesktop>((resolve, reject) => {
      this.debug().FuncStart(this.__waitForAndClickRedStartButtonPromise.name, 'tagetDoc not null: ' + (promiseBucket.targetDoc !== null));

      var success = this.DesktopMan().WaitForAndClickRedStartButtonWorker(promiseBucket.targetWindow);
      if (success) {
        resolve(promiseBucket);
      } else {
        reject(this.__waitForAndClickRedStartButtonPromise.name);
      }
      this.debug().FuncEnd(this.__waitForAndClickRedStartButtonPromise.name);
    });
  }

  private __waitForIframeReady(promiseBucket: IDataBucketRestoreDesktop) {
    return new Promise<IDataBucketRestoreDesktop>(async (resolve, reject) => {
      this.debug().FuncStart(this.__waitForIframeReady.name, 'promiseBucket not null: ' + (promiseBucket !== null));

      this.debug().PromiseBucketDebug(promiseBucket, this.__waitForIframeReady.name);

      //this.debug().Log(promiseBucket.NewIframe.IframeElem.id);

      var success = await this.DesktopMan().WaitForReadyIframe(promiseBucket.NewIframe);
      //.then(() => resolve(promiseBucket))
      //.catch(reject);

      //this.debug().Log('success : ' + success);

      if (success) {
        this.debug().Log('resolved! : ');

        //promiseBucket.NewIframe.IframeElem.contentDocument.body.innerHTML = '<div>dog9999999999999999999</div>';

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
      //this.debug().PromiseBucketDebug(promiseBucket, this.__waitForIframeCountDiffPromise.name);

      //this.debug().ClearDebugText();
      this.debug().MarkerA();
      //var success: null;

      //this.debug().PromiseBucketDebug(promiseBucket, this.__waitForIframeCountDiffPromise.name);
      var success: IDataOneIframe = await this.DesktopMan().WaitForIframeCountDiffWorker(promiseBucket.IFramesbefore, promiseBucket.targetWindow);
      this.debug().MarkerB();
      if (success) {
        this.debug().MarkerC();

        promiseBucket.NewIframe = success;

        this.debug().DebugDataOneIframe(promiseBucket.NewIframe);

        resolve(promiseBucket);
      } else {
        reject(this.__waitForIframeCountDiffPromise.name);
      }
      this.debug().FuncEnd(this.__waitForIframeCountDiffPromise.name);
    });
  }

  private __waitForAndThenClickCEFromMenuPromise(promiseBucket: IDataBucketRestoreDesktop) {
    return new Promise<IDataBucketRestoreDesktop>(async (resolve, reject) => {
      var success = await this.DesktopMan().WaitForAndThenClickCEFromMenuWorker(promiseBucket.targetWindow);
      if (success) {
        //this.debug().PromiseBucketDebug(promiseBucket, this.__waitForAndThenClickCEFromMenuPromise.name);

        resolve(promiseBucket);
      } else {
        reject(this.__waitForAndThenClickCEFromMenuPromise.name);
      }
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

  async RunOneChain(targetWindow: IDataBroswerWindow, dataToRestore: IDataOneStorageCE) {
    var allIframeData = this.DesktopMan().GetAllLiveIframeData(targetWindow);

    var dataBucket: IDataBucketRestoreDesktop = {
      targetWindow: targetWindow,
      targetDoc: null,
      IFramesbefore: allIframeData,
      oneCEdata: dataToRestore,
      NewIframe: null,
      LastChainLinkSuccessful: false,
    }
    //this.debug().PromiseBucketDebug(dataBucket, this.RunOneChain.name);

    await this.__waitForAndClickRedStartButtonPromise(dataBucket)
      .then(dataBucket => this.__waitForAndThenClickCEFromMenuPromise(dataBucket))
      .then(dataBucket => this.__waitForIframeCountDiffPromise(dataBucket))
      .then(dataBucket => this.__waitForIframeReady(dataBucket))
      .then(dataBucket => this.__restoreDataToOneIframe(dataBucket))
      .catch(ex => {
        this.debug().Error(this.RunOneChain.name, ex);
      });
  }
}