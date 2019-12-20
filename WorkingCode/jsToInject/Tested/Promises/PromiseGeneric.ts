class PromiseGeneric extends ManagerBase {
  constructor(xyyz: Hub) {
    xyyz.debug.FuncStart(PromiseChainRestoreDesktop.name);
    super(xyyz)
    xyyz.debug.FuncEnd(PromiseChainRestoreDesktop.name);
  }

  async WaitForPageReadyNative(targetWindow: IDataBroswerWindow) {
    return new Promise(async (resolve, reject) => {
      this.debug().FuncStart(this.WaitForPageReadyNative.name);
      let iterationJr = new IterationHelper(this.Xyyz, 5, this.WaitAndClick.name);
      var loaded: boolean = false;

      if (this.MiscMan().NotNullOrUndefined(targetWindow, this.WaitForPageReadyNative.name + ' document'))
      //&& this.MiscMan().NotNullOrUndefined(document.location, this.WaitForPageReadyNative.name + ' location'))
      {
        //this.debug().LogVal('document', targetWindow.DataDocSelf.Document.location.href);

      
      }
      //  this.debug().FuncEnd(this.WaitForPageReadyNative.name);

      //  if (loaded) {
      //    resolve();
      //  } else {
      //    reject();
      //  }
    });
  }

  async WaitForPageReady(targetWindow: IDataBroswerWindow) {
    return new Promise<void>(async (resolve, reject) => {
      this.debug().FuncStart(this.WaitForPageReady.name);

      this.debug().NotNullCheck('toReturn', targetWindow);
      this.debug().NotNullCheck('toReturn', targetWindow.DataDocSelf);
      this.debug().NotNullCheck('toReturn', targetWindow.DataDocSelf.Document);
      this.debug().NotNullCheck('toReturn', targetWindow.DataDocSelf.Document.location);
      this.debug().NotNullCheck('toReturn', targetWindow.DataDocSelf.Document.location.href);
      this.debug().LogVal('targetWindow.DataDocSelf.Document.location.href', targetWindow.DataDocSelf.Document.location.href);

      if (targetWindow) {
        await this.WaitForPageReadyNative(targetWindow)
          .then(() => resolve())
          .catch((ex) => {
            reject(ex);
          })
      }
      this.debug().FuncEnd(this.WaitForPageReady.name);
    });
  }

  async RaceWaitAndClick(selector: IScVerSpec, targetDoc: IDataOneDoc, resolveFn: Function = null) {
    this.debug().FuncStart(this.RaceWaitAndClick.name);

    var prom1 = this.WaitAndClick(selector.sc920, targetDoc, resolveFn);
    var prom2 = this.WaitAndClick(selector.sc820, targetDoc, resolveFn);

    this.debug().FuncEnd(this.RaceWaitAndClick.name);
    return await Promise.race([prom1, prom2]);
  }

  WaitAndClick(selector: string, targetDoc: IDataOneDoc, resolveFn: Function = null) {
    return new Promise<void>(async (resolve, reject) => {
      this.debug().FuncStart(this.WaitAndClick.name, selector);

      var found: HTMLElement = null;

      var iterationJr = new IterationHelper(this.Xyyz, 10, this.WaitAndClick.name);

      while (!found && iterationJr.DecrementAndKeepGoing() && !this.UiMan().OperationCancelled) {
        found = targetDoc.Document.querySelector(selector);

        if (found) {
          this.debug().Log('found and clicking');
          found.click();

          this.debug().FuncEnd(this.WaitAndClick.name, selector);
          if (resolveFn) {
            resolveFn();
          }
          resolve();
        } else {
          await iterationJr.Wait()
        }
      }

      this.debug().FuncEnd(this.WaitAndClick.name, selector);
      if (!found && iterationJr.IsExhausted) {
        reject('exhausted');
      }
    });
  }
}