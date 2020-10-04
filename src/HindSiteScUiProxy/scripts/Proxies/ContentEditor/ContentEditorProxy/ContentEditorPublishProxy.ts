import { PromiseResult } from "../../../../../Shared/scripts/Classes/PromiseResult";
import { ScWindowType } from "../../../../../Shared/scripts/Enums/scWindowType";
import { IApiCallPayload } from "../../../../../Shared/scripts/Interfaces/IApiCallPayload";
import { ICommandRecipes } from "../../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { ScDocumentProxy } from "../../ScDocumentProxy";
import { IDataPublishChain } from "../../../../../Shared/scripts/Interfaces/Data/IDataPublishChain";
import { ContentConst } from "../../../../../Shared/scripts/Interfaces/InjectConst";
import { SharedConst } from "../../../../../Shared/scripts/SharedConst";
import { _ApiRecipeBase } from "../../../ContentApi/Recipes/__RecipeBase/_ApiRecipeBase";
import { IFactoryHelper } from "../../../../../Shared/scripts/Interfaces/IFactoryHelper";
import { IScWindowProxy } from "../../../../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager";
import { IHindeCore } from "../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { _HindeCoreBase } from "../../../../../Shared/scripts/LoggableBase";
import { ContentEditorProxy } from "./ContentEditorProxy";
import { RecipeBasics } from "../../../../../Shared/scripts/Classes/RecipeBasics";
import { FactoryHelper } from "../../../../../Shared/scripts/Helpers/FactoryHelper";
import { DTFrameProxy } from "../../Desktop/DesktopProxy/FrameProxies/DTFrameProxy";
import { NativeIframeProxy } from "../../NativeScIframeProxy";
import { CEFrameProxy } from "../../Desktop/DesktopProxy/FrameProxies/CEFrameProxy";

export class ContentEditorPublishProxy extends _HindeCoreBase  {
  ContentEditorProxy: ContentEditorProxy;
    RecipeBasics: RecipeBasics;
    AssociatedDoc: ScDocumentProxy;
    FactoryHelp: FactoryHelper;

  constructor(hindeCore: IHindeCore, contentEditorProxy: ContentEditorProxy, associatedDoc: ScDocumentProxy) {
    super(hindeCore);

    this.ContentEditorProxy = contentEditorProxy;
    this.AssociatedDoc = associatedDoc;
    this.RecipeBasics = new RecipeBasics(this.HindeCore);
    this.FactoryHelp = new FactoryHelper(this.HindeCore);

  }

  Execute(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await this.PublishActiveCE()
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  private async GetDocToPublish(scWindowType: ScWindowType, targetDoc: ScDocumentProxy): Promise<ScDocumentProxy> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetDocToPublish.name);

      try {
        if (scWindowType === ScWindowType.Desktop) {
          await this.RecipeBasics.GetTopLevelIframe(targetDoc)
            .then((topIframe: DTFrameProxy) => {
              resolve(topIframe.GetContentDoc());
            })
            .catch((err) => reject(this.GetDocToPublish.name + ' ' + err));
        }
        else {
          resolve(this.AssociatedDoc);
        }
      } catch (err) {
        reject(this.GetDocToPublish.name + ' ' + err)
      }

      this.Logger.FuncEnd(this.GetDocToPublish.name);
    })
  }

  async PublishActiveCE(): Promise<void> {
    this.Logger.FuncStart(this.PublishActiveCE.name);
    try {
      await this.PublishCE(this.AssociatedDoc)
        .catch((err) => { throw (err) });
    }
    catch (err) {
      throw (this.PublishActiveCE.name + ' ' + err);
    }
    this.Logger.FuncEnd(this.PublishActiveCE.name);
  }

  private __debugDataPublishChain(dataPublishChain: IDataPublishChain, nickname: string) {
    this.Logger.FuncStart(this.__debugDataPublishChain.name, nickname);

    this.Logger.LogVal('docToPublish', this.Logger.IsNullOrUndefined(dataPublishChain.DocToPublish));
    this.Logger.LogVal('jqIframe', this.Logger.IsNullOrUndefined(dataPublishChain.JqIframe) + ' ' + (dataPublishChain.JqIframe ? dataPublishChain.JqIframe.NativeIFrameProxy.src() : ''));
    this.Logger.LogVal('Iframe0blueIframe', this.Logger.IsNullOrUndefined(dataPublishChain.Iframe0Blue) + ' ' + (dataPublishChain.Iframe0Blue ? dataPublishChain.Iframe0Blue.NativeIFrameProxy.src() : ''));
    this.Logger.LogVal('messageDialogIframeRed', this.Logger.IsNullOrUndefined(dataPublishChain.MessageDialogIframeRed) + ' ' + (dataPublishChain.MessageDialogIframeRed ? dataPublishChain.MessageDialogIframeRed.NativeIFrameProxy.src() : ''));

    this.Logger.FuncEnd(this.__debugDataPublishChain.name);

    return dataPublishChain;
  }

  async PublishCE(docToPublish: ScDocumentProxy): Promise<void> {
    this.Logger.FuncStart(this.PublishCE.name);

    try {
      var dataPublishChain: IDataPublishChain = {
        DocToPublish: docToPublish,
        TopScDocumentProxy: this.AssociatedDoc,// this.scWinProxy.GetTopLevelDoc(),
        Iframe0Blue: null,
        JqIframe: null,
        MessageDialogIframeRed: null
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
          this.ErrorHand.ErrorAndThrow(this.PublishCE.name, ex);
        });
    } catch (err) {
      throw (this.PublishCE.name + ' ' + err);
    }
    this.Logger.FuncEnd(this.PublishCE.name);
  }

  private async ClickPublishOnNav(payload: IDataPublishChain): Promise<IDataPublishChain> {
    this.Logger.FuncStart(this.ClickPublishOnNav.name);
    try {
      await payload.DocToPublish.WaitForThenClick([ContentConst.Const.Selector.SC.NavPublishStrip])
      await payload.DocToPublish.WaitForThenClick([ContentConst.Const.Selector.SC.NavPublishStrip] )
    } catch (err) {
      throw (this.ClickPublishOnNav.name + ' ' + err);
    }
    this.Logger.FuncEnd(this.ClickPublishOnNav.name);
    return payload;
  }

  private async __waitForAndClickClose(dataPublishChain: IDataPublishChain) {
    await dataPublishChain.Iframe0Blue.GetContentDoc().WaitForAndReturnFoundElem(ContentConst.Const.Selector.SC.Publish.SettingsHidden)
      .then(async () => {
        await dataPublishChain.Iframe0Blue.GetContentDoc().WaitForAndReturnFoundElem(ContentConst.Const.Selector.SC.Publish.TheItemHasBeenPublished, SharedConst.Const.IterHelper.MaxCount.OverridePublishing)
      })
      .then(async () => {
        await dataPublishChain.Iframe0Blue.GetContentDoc().WaitForThenClick([ContentConst.Const.Selector.SC.Cancel] );
      });

    return dataPublishChain;
  }

  private async __waitForAndClickOk(dataPublishChain: IDataPublishChain) {
    await dataPublishChain.MessageDialogIframeRed.GetContentDoc().WaitForThenClick([ContentConst.Const.Selector.SC.Ok], );

    return dataPublishChain;
  }

  async __WaitForAndClickPublishNextButton(dataPublishChain: IDataPublishChain) {
    await dataPublishChain.Iframe0Blue.GetContentDoc().WaitForThenClick([ContentConst.Const.Selector.SC.NextButton], );

    return dataPublishChain;
  }

  async ClickMenuButtonPublishDropDown(payload: IDataPublishChain = null) {
    await payload.DocToPublish.WaitForThenClick([ContentConst.Const.Selector.SC.MenuButtonPublish], );
    return payload;
  }

  async ClickMenuDropDownPublishItem(payload: IDataPublishChain = null) {
    return await payload.DocToPublish.WaitForAndClickWithPayload(ContentConst.Const.Selector.SC.MenuDropDownPublishItem,  payload)
  }

  async GetThePublishItemDialog(dataPublishChain: IDataPublishChain = null): Promise<IDataPublishChain> {
    try {

      let iframeProxy: NativeIframeProxy = null;

      await dataPublishChain.TopScDocumentProxy.WaitForAndReturnFoundElem( ContentConst.Const.Selector.SC.JqueryModalDialogsFrame)
        .then((htmlIFrameElement: HTMLIFrameElement) => iframeProxy = new NativeIframeProxy(this.HindeCore, htmlIFrameElement))
        .then(() => this.FactoryHelp.CEFrameFactory(iframeProxy, 'jqIframe'))
        .then((result: CEFrameProxy) => dataPublishChain.JqIframe = result)
        // opens publish item dialog
        .then(() => dataPublishChain.JqIframe.WaitForCompleteNABFrameProxyOrReject())
        .catch((err) => { throw (this.GetThePublishItemDialog.name + ' ' + err) });
    } catch (err) {
      throw (this.GetThePublishItemDialog.name + ' ' + err);
    }

    return dataPublishChain;
  }

  async GetMessageDialog(dataPublishChain: IDataPublishChain) {
    let toReturnPublishChain: IDataPublishChain = dataPublishChain;

    await dataPublishChain.JqIframe.GetContentDoc().WaitForIframeElemAndReturnCEFrameProxyWhenReady(ContentConst.Const.Selector.SC.ContentIFrame1, 'iframeRed')
      .then((result: CEFrameProxy) => toReturnPublishChain.MessageDialogIframeRed = result)
      .catch((err) => this.ErrorHand.ErrorAndThrow(this.GetMessageDialog.name, err));

    return toReturnPublishChain;
  }




  async GetDialogIframe0Blue(dataPublishChain: IDataPublishChain = null) {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetDialogIframe0Blue.name);

      let promiseResult: PromiseResult = new PromiseResult(this.GetDialogIframe0Blue.name, this.HindeCore);

      this.Logger.LogAsJsonPretty('dataPublishChain', dataPublishChain);

      await dataPublishChain.JqIframe.GetContentDoc().WaitForIframeElemAndReturnCEFrameProxyWhenReady(ContentConst.Const.Selector.SC.ContentIframe0, 'Iframe0Blue')
        .then((result: CEFrameProxy) => {
          this.Logger.MarkerC();
          dataPublishChain.Iframe0Blue = result;
          promiseResult.MarkSuccessful();
        })
        .catch((err) => promiseResult.MarkFailed(err));

      this.Logger.LogAsJsonPretty('dataPublishChain.Iframe0Blue', dataPublishChain.Iframe0Blue);
      //this.ContentAgents.Logger.DebugDataOneIframe(dataPublishChain.Iframe0Blue);

      this.Logger.FuncEnd(this.GetDialogIframe0Blue.name);
      if (promiseResult.WasSuccessful()) {
        resolve(dataPublishChain);
      } else {
        reject(promiseResult.RejectReasons)
      }
    });
  }

  private __waitForThenFunc(selector: string, targetDoc: ScDocumentProxy, dataPublishChain: IDataPublishChain, optionFunc: Function) {
    return new Promise<IDataPublishChain>(async (resolve, reject) => {
      this.Logger.FuncStart(this.__waitForThenFunc.name, selector);
      this.Logger.LogAsJsonPretty(this.__waitForThenFunc.name, targetDoc);

      var found: HTMLElement = null;
      await targetDoc.WaitForAndReturnFoundElem( selector)
        .then((result) => found = result);

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