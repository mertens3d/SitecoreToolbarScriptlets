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
        reject()
      }
      this.debug().FuncEnd(this.__waitForAndClickRedStartButtonPromise.name);
    });
  }

  private __waitForIframeCountDiffPromise(promiseBucket: IDataBucketRestoreDesktop) {
    return new Promise<IDataBucketRestoreDesktop>((resolve, reject) => {
      this.debug().FuncStart(this.__waitForIframeCountDiffPromise.name, 'promiseBucket not null: ' + (promiseBucket !== null));

      this.__promiseBucketDebug(promiseBucket, this.__waitForIframeCountDiffPromise.name);

      this.debug().MarkerA();
      //var success: null;

      this.__promiseBucketDebug(promiseBucket, this.__waitForIframeCountDiffPromise.name);
      var success = this.DesktopMan().WaitForIframeCountDiffWorker(promiseBucket.IFramesbefore, promiseBucket.targetWindow);
      this.debug().MarkerB();
      if (success) {
          this.debug().MarkerC();
          promiseBucket.NewIframe = success;
          resolve(promiseBucket);
        } else {
          reject();
      }
    });
  }

  private IsNullOrUndefined(subject) {
    var toReturn = '{unknown}';
    if (subject) {
      if ((typeof subject) == 'undefined') {
        toReturn = 'Is Undefined';
      } else {
        toReturn = subject;
      }
    } else {
      toReturn = 'Is Null';
    }

    return toReturn;
  }

  private __promiseBucketDebug(promiseBucket: IDataBucketRestoreDesktop, friendlyName: string) {
    this.debug().FuncStart(this.__promiseBucketDebug.name, friendlyName);
    this.debug().Log('promiseBucket : ' + this.IsNullOrUndefined(promiseBucket));

    if (promiseBucket && typeof (promiseBucket) !== 'undefined') {
      this.debug().Log('promiseBucket.IFramesbefore: ' + this.IsNullOrUndefined(promiseBucket.IFramesbefore));
      this.debug().Log('promiseBucket.targetWindow: ' + this.IsNullOrUndefined(promiseBucket.targetWindow));
      this.debug().Log('promiseBucket.oneCEdata: ' + this.IsNullOrUndefined(promiseBucket.oneCEdata));
    }
    this.debug().FuncEnd(this.__promiseBucketDebug.name, friendlyName);
  }

  private __waitForAndThenClickCEFromMenuPromise(promiseBucket: IDataBucketRestoreDesktop) {
    return new Promise<IDataBucketRestoreDesktop>((resolve, reject) => {
      var success = this.DesktopMan().WaitForAndThenClickCEFromMenuWorker(promiseBucket.targetWindow);
      if (success) {
        this.__promiseBucketDebug(promiseBucket, this.__waitForAndThenClickCEFromMenuPromise.name);
        resolve(promiseBucket);
      } else {
        reject();
      }
    });
  }

  private __restoreDataToOneIframe(promiseBucket: IDataBucketRestoreDesktop) {
    return new Promise<IDataBucketRestoreDesktop>((resolve, reject) => {
      this.debug().FuncStart(this.__restoreDataToOneIframe.name);

      var success = this.DesktopMan().RestoreDataToOneIframeWorker(promiseBucket.oneCEdata, promiseBucket.NewIframe);
      if (success) {
        resolve(promiseBucket);
      } else {
        reject();
      }

      this.debug().FuncEnd(this.__restoreDataToOneIframe.name);
    });
  }

  RunOneChain(targetWindow: IDataBroswerWindow, dataToRestore: IDataOneStorageCE) {
    var allIframeData = this.DesktopMan().GetAllLiveIframeData(targetWindow);

    var dataBucket: IDataBucketRestoreDesktop = {
      targetWindow: targetWindow,
      targetDoc: null,
      IFramesbefore: allIframeData,
      oneCEdata: dataToRestore,
      NewIframe: null,
      LastChainLinkSuccessful: false,
      
    }
    this.__promiseBucketDebug(dataBucket, this.RunOneChain.name);

    this.__waitForAndClickRedStartButtonPromise(dataBucket)
      .then(dataBucket => this.__waitForAndThenClickCEFromMenuPromise(dataBucket))
      .then(dataBucketb => this.__waitForIframeCountDiffPromise(dataBucketb))
      .then(dataBucketc => this.__restoreDataToOneIframe(dataBucketc))
      .catch(ex => {
        this.debug().Error(this.RunOneChain.name, ex);
      });
  }
}