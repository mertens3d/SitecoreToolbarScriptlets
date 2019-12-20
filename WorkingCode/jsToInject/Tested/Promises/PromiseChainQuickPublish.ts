class PromiseChainQuickPublish extends ManagerBase {
  constructor(xyyz: Hub) {
    xyyz.debug.FuncStart(PromiseChainRestoreDesktop.name);
    super(xyyz)
    xyyz.debug.FuncEnd(PromiseChainRestoreDesktop.name);
  }

  private __debugDataPublishChain(dataPublishChain: IDataPublishChain) {
    this.debug().FuncStart(this.__debugDataPublishChain.name);

    this.debug().LogVal('docToPublish', this.debug().IsNullOrUndefined(dataPublishChain.docToPublish));
    this.debug().LogVal('jq', this.debug().IsNullOrUndefined(dataPublishChain.jq) + ' ' + (dataPublishChain.jq ? dataPublishChain.jq.src : ''));
    this.debug().LogVal('blue', this.debug().IsNullOrUndefined(dataPublishChain.blue) + ' ' + (dataPublishChain.blue ? dataPublishChain.blue.src : ''));
    this.debug().LogVal('red', this.debug().IsNullOrUndefined(dataPublishChain.red) + ' ' + (dataPublishChain.red ? dataPublishChain.red.src : ''));

    this.debug().FuncEnd(this.__debugDataPublishChain.name);
  }
  private __waitForAndClick(selector: string, targetDoc: IDataOneDoc, dataPublishChain: IDataPublishChain) {
    return new Promise<IDataPublishChain>(async (resolve, reject) => {
      this.debug().FuncStart(this.__waitForAndClick.name, selector);

      await this.PromiseGen().WaitAndClick(selector, targetDoc)
        .then(() => resolve(dataPublishChain))
        .catch(ex => {
          this.debug().Error(this.__waitForAndClick.name, ex);
          reject(ex);
        });
    });
  }
  async PublishCE(docToPublish: IDataOneDoc) {
    this.debug().FuncStart(this.PublishCE.name);
    var targetDocA = docToPublish;
    var targetDoc = docToPublish.Document;

    var dataPublishChain: IDataPublishChain = {
      docToPublish: docToPublish,
      blue: null,
      jq: null,
      red: null
    }

    await this.__waitForAndClick('[id*=_Nav_PublishStrip]', targetDocA, dataPublishChain)
      .then((dataPublishChain) => this.__waitForAndClick('[id=B414550BADAF4542C9ADF44BED5FA6CB3E_menu_button]', targetDocA, dataPublishChain)) // publish drop down
      .then((dataPublishChain) => this.__waitForAndClick('[id=B414550BADAF4542C9ADF44BED5FA6CB3E_menu_98719A90225A4802A0625D3967E4DD47]', targetDocA, dataPublishChain)) // opens publish item dialog
      .then((dataPublishChain) => this.__waitFor('[id=jqueryModalDialogsFrame]', targetDoc, dataPublishChain,
        (found, dataPublishChain) => {
          dataPublishChain.jq = found;
          return dataPublishChain;
        })) // opens publish item dialog
      .then((dataPublishChain) => this.__waitFor('[id=scContentIframeId0]', dataPublishChain.jq.contentDocument, dataPublishChain,
        (found, dataPublishChain) => {
          this.debug().Log('before');
          this.__debugDataPublishChain(dataPublishChain);
          dataPublishChain.blue = found;
          this.debug().Log('after');
          this.__debugDataPublishChain(dataPublishChain);
          return dataPublishChain;
        }))
      .then((dataPublishChain) => this.__waitFor('[id=NextButton]', dataPublishChain.blue.contentDocument, dataPublishChain))
      .then((dataPublishChain) => this.__waitFor('[id=scContentIframeId1]', dataPublishChain.jq.contentDocument, dataPublishChain,
        (found, dataPublishChain) => {
          dataPublishChain.red = found;
          return dataPublishChain;
        }))
      .then((dataPublishChain) => this.__waitFor('[id=OK]', dataPublishChain.red.contentDocument, dataPublishChain))
      .then((dataPublishChain) => this.__waitFor('[id=CancelButton]', dataPublishChain.blue.contentDocument, dataPublishChain))

      .catch(ex => {
        this.debug().Error(this.PublishCE.name, ex);
      });

    this.debug().FuncEnd(this.PublishCE.name);
  }
  private __waitFor(selector: string, targetDoc: Document, dataPublishChain: IDataPublishChain, optionFunc: Function = null) {
    return new Promise<IDataPublishChain>(async (resolve, reject) => {
      this.debug().FuncStart(this.__waitFor.name, selector + ' ' + targetDoc.location.href);
      var found: HTMLElement = null;

      var iterationJr = new IterationHelper(this.Xyyz, 6, this.__waitFor.name);

      while (!found && iterationJr.DecrementAndKeepGoing()) {
        found = targetDoc.querySelector(selector);

        if (found) {
          this.debug().Log('found');
          if (optionFunc) {
            this.debug().Log('executing func');
            dataPublishChain = await optionFunc(found, dataPublishChain);
          }
          this.__debugDataPublishChain(dataPublishChain);

          this.debug().FuncEnd(this.__waitFor.name, selector + targetDoc.location.href);

          resolve(dataPublishChain)
        } else {
          await iterationJr.Wait()
        }
      }

      if (!found && iterationJr.IsExhausted) {
        this.debug().FuncEnd(this.__waitFor.name, selector + targetDoc.location.href);
        reject('exhausted');
      }
    });
  }
}