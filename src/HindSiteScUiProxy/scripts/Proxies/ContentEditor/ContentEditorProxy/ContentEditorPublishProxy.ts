import { DocumentJacket } from "../../../../../DOMJacket/scripts/Document/DocumentJacket";
import { IJacketOfType } from "../../../../../Shared/scripts/IJacketOfType";
import { FrameElemJacket } from "../../../../../DOMJacket/scripts/Elements/FrameElemJacket";
import { PromiseResult } from "../../../../../Shared/scripts/Classes/PromiseResult";
import { IAPICore } from "../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IDataPublishChain } from "../../../../../Shared/scripts/Interfaces/Data/IDataPublishChain";
import { ContentConst } from "../../../../../Shared/scripts/Interfaces/InjectConst";
import { SharedConst } from "../../../../../Shared/scripts/SharedConst";
import { _APICoreBase } from "../../../../../Shared/scripts/_APICoreBase";
import { FactoryHelper } from "../../../FactoryHelper";
import { CEFrameProxy } from "../../Desktop/DesktopProxy/FrameProxies/CEFrameProxy";
import { ContentEditorDocProxy } from "./ContentEditorProxy";

export class ContentEditorPublishProxy extends _APICoreBase {
  ContentEditorProxy: ContentEditorDocProxy;
  private DocumentJacket: DocumentJacket;
  private FactoryHelp: FactoryHelper;

  constructor(apiCore: IAPICore, contentEditorProxy: ContentEditorDocProxy, documentJacket: DocumentJacket) {
    super(apiCore);

    this.ContentEditorProxy = contentEditorProxy;
    this.DocumentJacket = documentJacket;
    this.FactoryHelp = new FactoryHelper(this.ApiCore);
  }

  Execute(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await this.PublishActiveCE()
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  //private async GetDocToPublish(scWindowType: ScWindowType, targetDocJacket: DocumentJacket): Promise<DocumentJacket> {
  //  return new Promise(async (resolve, reject) => {
  //    this.Logger.FuncStart(this.GetDocToPublish.name);

  //    try {
  //      if (scWindowType === ScWindowType.Desktop) {
  //        await this.RecipeBasics.GetTopLevelIframe(targetDocJacket)
  //          .then((topIframe: DTFrameProxy) => {
  //            resolve(topIframe.GetDocumentJacket());
  //          })
  //          .catch((err) => reject(this.GetDocToPublish.name + ' ' + err));
  //      }
  //      else {
  //        resolve(this.DocumentJacket);
  //      }
  //    } catch (err) {
  //      reject(this.GetDocToPublish.name + ' ' + err)
  //    }

  //    this.Logger.FuncEnd(this.GetDocToPublish.name);
  //  })
  //}

  async PublishActiveCE(): Promise<void> {
    this.Logger.FuncStart(this.PublishActiveCE.name);
    try {
      await this.PublishCE(this.DocumentJacket);
        //.catch((err) => { throw (err) });
    }
    catch (err) {
      this.ErrorHand.HandleFatalError(this.PublishActiveCE.name ,err);
    }
    this.Logger.FuncEnd(this.PublishActiveCE.name);
  }

  private __debugDataPublishChain(dataPublishChain: IDataPublishChain, nickname: string) {
    this.Logger.FuncStart(this.__debugDataPublishChain.name, nickname);

    this.Logger.LogVal('docToPublish', this.Logger.IsNullOrUndefined(dataPublishChain.ScDocumentProxyToPublish));
    //this.Logger.LogVal('jqIframe', this.Logger.IsNullOrUndefined(dataPublishChain.JqIframe) + ' ' + (dataPublishChain.JqIframe ? dataPublishChain.JqIframe.NativeIFrameProxy.src() : ''));
    //this.Logger.LogVal('Iframe0blueIframe', this.Logger.IsNullOrUndefined(dataPublishChain.Iframe0Blue) + ' ' + (dataPublishChain.Iframe0Blue ? dataPublishChain.Iframe0Blue.NativeIFrameProxy.src() : ''));
    //this.Logger.LogVal('messageDialogIframeRed', this.Logger.IsNullOrUndefined(dataPublishChain.CEFrameRed) + ' ' + (dataPublishChain.CEFrameRed ? dataPublishChain.CEFrameRed.NativeIFrameProxy.src() : ''));

    this.Logger.FuncEnd(this.__debugDataPublishChain.name);

    return dataPublishChain;
  }

  async PublishCE(docToPublish: DocumentJacket): Promise<void> {
    this.Logger.FuncStart(this.PublishCE.name);

    try {
      var dataPublishChain: IDataPublishChain = {
        ScDocumentProxyToPublish: docToPublish,
        TopScDocumentProxy: this.DocumentJacket,// this.scWinProxy.GetTopLevelDoc(),
        Iframe0BlueScContentIFrameId0: null,
        JqIframe: null,
        CEFrameRed: null
      }

      await this.ClickPublishOnNav(dataPublishChain)

        .then((dataPublishChain: IDataPublishChain) => this.ClickMenuButtonPublishDropDown(dataPublishChain))
        //.then((dataPublishChain: IDataPublishChain) => this.__debugDataPublishChain(dataPublishChain, 'post ClickMenuButtonPublishDropDown'))
        .then((dataPublishChain: IDataPublishChain) => this.ClickMenuDropDownPublishItem(dataPublishChain))
        //.then((dataPublishChain: IDataPublishChain) => this.__debugDataPublishChain(dataPublishChain, 'post MenuDropDownPublishItem'))
        .then((dataPublishChain: IDataPublishChain) => this.GetThePublishItemDialog(dataPublishChain))
        //.then((dataPublishChain: IDataPublishChain) => this.__debugDataPublishChain(dataPublishChain, 'post PublishItemDialog'))

        .then((dataPublishChain: IDataPublishChain) => this.GetDialogIframe0Blue(dataPublishChain))
        .then((dataPublishChain: IDataPublishChain) => this.__WaitForAndClickPublishNextButton(dataPublishChain))
        .then((dataPublishChain: IDataPublishChain) => this.GetMessageDialog(dataPublishChain))
        .then((dataPublishChain: IDataPublishChain) => this.__waitForAndClickOk(dataPublishChain))
        .then((dataPublishChain: IDataPublishChain) => this.__waitForAndClickClose(dataPublishChain))

        .catch(ex => {
          this.ErrorHand.HandleFatalError(this.PublishCE.name, ex);
        });
    } catch (err) {
          this.ErrorHand.HandleFatalError(this.PublishCE.name, err);
    }
    this.Logger.FuncEnd(this.PublishCE.name);
  }

  private async ClickPublishOnNav(payload: IDataPublishChain): Promise<IDataPublishChain> {
    this.Logger.FuncStart(this.ClickPublishOnNav.name);
    try {
      await payload.ScDocumentProxyToPublish.WaitForThenClick([ContentConst.Const.Selector.SC.ScRibbon.Publish.NavPublishStrip])
      await payload.ScDocumentProxyToPublish.WaitForThenClick([ContentConst.Const.Selector.SC.ScRibbon.Publish.NavPublishStrip])
    } catch (err) {
      this.ErrorHand.HandleFatalError(this.ClickPublishOnNav.name, err);
    }
    this.Logger.FuncEnd(this.ClickPublishOnNav.name);
    return payload;
  }

  private async __waitForAndClickClose(dataPublishChain: IDataPublishChain) {
    try {
      await dataPublishChain.Iframe0BlueScContentIFrameId0.GetDocumentJacket().WaitForGenericElemJacket(ContentConst.Const.Selector.SC.ScRibbon.Publish.SettingsHidden)
        .then(() => dataPublishChain.Iframe0BlueScContentIFrameId0.GetDocumentJacket().WaitForGenericElemJacket(ContentConst.Const.Selector.SC.ScRibbon.Publish.TheItemHasBeenPublished, SharedConst.Const.IterHelper.MaxCount.OverridePublishing)
        )
        .then(() => dataPublishChain.Iframe0BlueScContentIFrameId0.GetDocumentJacket().WaitForThenClick([ContentConst.Const.Selector.SC.Cancel]));
    } catch (err) {
      this.ErrorHand.HandleFatalError(this.__waitForAndClickClose.name, err);
    }

    return dataPublishChain;
  }

  private async __waitForAndClickOk(dataPublishChain: IDataPublishChain) {
    try {
      await dataPublishChain.CEFrameRed.GetDocumentJacket().WaitForThenClick([ContentConst.Const.Selector.SC.Ok],);
    } catch (err) {
      this.ErrorHand.HandleFatalError(this.__waitForAndClickOk.name, err);
    }

    return dataPublishChain;
  }

  async __WaitForAndClickPublishNextButton(dataPublishChain: IDataPublishChain) {
    await dataPublishChain.Iframe0BlueScContentIFrameId0.GetDocumentJacket().WaitForThenClick([ContentConst.Const.Selector.SC.NextButton],);

    return dataPublishChain;
  }

  async ClickMenuButtonPublishDropDown(payload: IDataPublishChain = null) {
    await payload.ScDocumentProxyToPublish.WaitForThenClick([ContentConst.Const.Selector.SC.ScRibbon.Publish.MenuButtonPublish],);
    return payload;
  }

  async ClickMenuDropDownPublishItem(payload: IDataPublishChain = null) {
    return await payload.ScDocumentProxyToPublish.WaitForAndClickWithPayload(ContentConst.Const.Selector.SC.ScRibbon.Publish.MenuDropDownPublishItem, payload)
  }

  async GetThePublishItemDialog(dataPublishChain: IDataPublishChain = null): Promise<IDataPublishChain> {
    try {
      let frameElemJacketB: FrameElemJacket = null;

      await dataPublishChain.TopScDocumentProxy.WaitForGenericElemJacket(ContentConst.Const.Selector.SC.Frames.JqueryModalDialogsFrame.Id)
        .then((elementJacket: FrameElemJacket) => FrameElemJacket.FactoryFrameElemJackets(this.CommonCore, [elementJacket]))
        .then((frameElemJackets: FrameElemJacket[]) => frameElemJacketB = frameElemJackets[0])
        .then(() => this.FactoryHelp.CEFrameFactory(frameElemJacketB, 'jqIframe'))
        .then((result: CEFrameProxy) => dataPublishChain.JqIframe = result)
        // opens publish item dialog
        .then(() => dataPublishChain.JqIframe.WaitForCompleteNABFrameProxyOrReject())
        .catch((err) => this.ErrorHand.HandleFatalError(this.GetThePublishItemDialog.name, err));
    } catch (err) {
      this.ErrorHand.HandleFatalError(this.GetThePublishItemDialog.name, err);
    }

    return dataPublishChain;
  }

  async GetMessageDialog(dataPublishChain: IDataPublishChain) {
    let toReturnPublishChain: IDataPublishChain = dataPublishChain;

    await this.WaitForIframeElemAndReturnCEFrameProxyWhenReady(ContentConst.Const.Selector.SC.Frames.scContentIframeId1.Id, 'iframeRed') //is id1 correct?
      .then((result: CEFrameProxy) => toReturnPublishChain.CEFrameRed = result)
      .catch((err) => this.ErrorHand.HandleFatalError(this.GetMessageDialog.name, err));

    return toReturnPublishChain;
  }

  async WaitForIframeElemAndReturnCEFrameProxyWhenReady(selector: string, iframeNickName: string): Promise<CEFrameProxy> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForIframeElemAndReturnCEFrameProxyWhenReady.name);

      let factoryHelp = new FactoryHelper(this.ApiCore);

      let frameJacket: FrameElemJacket = null;

      await this.DocumentJacket.WaitForGenericElemJacket(selector)
        .then((genericElemJacket: IJacketOfType) => FrameElemJacket.FactoryFrameElemJackets(this.CommonCore, [genericElemJacket]))
        .then((frameElemJackets: FrameElemJacket[]) => frameJacket = frameElemJackets[0])
        .then(() => factoryHelp.CEFrameFactory(frameJacket, iframeNickName))
        .then((result: CEFrameProxy) => resolve(result))
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.WaitForIframeElemAndReturnCEFrameProxyWhenReady.name);
    });
  }

  async GetDialogIframe0Blue(dataPublishChain: IDataPublishChain = null) {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetDialogIframe0Blue.name);

      let promiseResult: PromiseResult = new PromiseResult(this.GetDialogIframe0Blue.name, this.ApiCore);

      this.Logger.LogAsJsonPretty('dataPublishChain', dataPublishChain);

      await this.WaitForIframeElemAndReturnCEFrameProxyWhenReady(ContentConst.Const.Selector.SC.Frames.ScContentIframeId0.Id, 'Iframe0Blue')
        .then((result: CEFrameProxy) => {
          this.Logger.MarkerC();
          dataPublishChain.Iframe0BlueScContentIFrameId0 = result;
          promiseResult.MarkSuccessful();
        })
        .catch((err) => promiseResult.MarkFailed(err));

      this.Logger.LogAsJsonPretty('dataPublishChain.Iframe0Blue', dataPublishChain.Iframe0BlueScContentIFrameId0);
      //this.ContentAgents.Logger.DebugDataOneIframe(dataPublishChain.Iframe0Blue);

      this.Logger.FuncEnd(this.GetDialogIframe0Blue.name);
      if (promiseResult.WasSuccessful()) {
        resolve(dataPublishChain);
      } else {
        reject(promiseResult.RejectReasons)
      }
    });
  }

  private __waitForThenFunc(selector: string, targetDoc: DocumentJacket, dataPublishChain: IDataPublishChain, optionFunc: Function) {
    return new Promise<IDataPublishChain>(async (resolve, reject) => {
      this.Logger.FuncStart(this.__waitForThenFunc.name, selector);
      this.Logger.LogAsJsonPretty(this.__waitForThenFunc.name, targetDoc);

      var found: FrameElemJacket = null;
      await targetDoc.WaitForGenericElemJacket(selector)
        .then((result: FrameElemJacket) => found = result)
        .catch((err) => this.ErrorHand.HandleFatalError([ContentEditorDocProxy.name, this.__waitForThenFunc.name], err));

      if (found) {
        this.Logger.Log('found');
        if (optionFunc) {
          this.Logger.Log('executing func');
          dataPublishChain = await optionFunc(found, dataPublishChain);
        }
        this.__debugDataPublishChain(dataPublishChain, this.__waitForThenFunc.name);

        this.Logger.FuncEnd(this.__waitForThenFunc.name, selector);

        resolve(dataPublishChain)
      } else {
        reject('not found');
      }
    });
  }
}