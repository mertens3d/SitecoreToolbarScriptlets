import { ContentHub } from '../Managers/ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { IDataPublishChain } from '../../../Shared/scripts/Interfaces/IDataPublishChain';
import { ContentConst } from '../../../Shared/scripts/Interfaces/InjectConst';
import { PromiseResult } from '../../../Shared/scripts/Classes/PromiseResult';

import { IAllAgents } from '../../../Shared/scripts/Interfaces/Agents/IAllAgents';

export class PromiseChainQuickPublish extends ContentManagerBase {
  constructor(hub: ContentHub, contentAgents: IAllAgents) {
    //hub.debug.FuncStart(PromiseChainQuickPublish.name);
    super(hub, contentAgents)
    //hub.debug.FuncEnd(PromiseChainQuickPublish.name);
  }

  __debugDataPublishChain(dataPublishChain: IDataPublishChain, nickname: string) {
    this.AllAgents.Logger.FuncStart(this.__debugDataPublishChain.name, nickname);

    this.AllAgents.Logger.LogVal('docToPublish', this.AllAgents.Logger.IsNullOrUndefined(dataPublishChain.docToPublish));
    this.AllAgents.Logger.LogVal('jqIframe', this.AllAgents.Logger.IsNullOrUndefined(dataPublishChain.jqIframe) + ' ' + (dataPublishChain.jqIframe ? dataPublishChain.jqIframe.IframeElem.src : ''));
    this.AllAgents.Logger.LogVal('Iframe0blueIframe', this.AllAgents.Logger.IsNullOrUndefined(dataPublishChain.Iframe0Blue) + ' ' + (dataPublishChain.Iframe0Blue ? dataPublishChain.Iframe0Blue.IframeElem.src : ''));
    this.AllAgents.Logger.LogVal('messageDialogIframeRed', this.AllAgents.Logger.IsNullOrUndefined(dataPublishChain.messageDialogIframeRed) + ' ' + (dataPublishChain.messageDialogIframeRed ? dataPublishChain.messageDialogIframeRed.IframeElem.src : ''));

    this.AllAgents.Logger.FuncEnd(this.__debugDataPublishChain.name);

    return dataPublishChain;
  }

  async PublishCE(docToPublish: IDataOneDoc) {
    this.AllAgents.Logger.FuncStart(this.PublishCE.name);

    var dataPublishChain: IDataPublishChain = {
      docToPublish: docToPublish,
      TopLevelDoc: this.ScUiMan().TopLevelDoc(),
      Iframe0Blue: null,
      jqIframe: null,
      messageDialogIframeRed: null
    }

    await this.PromiseOneStep().ClickPublishOnNav(dataPublishChain)

      .then((dataPublishChain: IDataPublishChain) => this.PromiseOneStep().ClickMenuButtonPublishDropDown(dataPublishChain))
      //.then((dataPublishChain: IDataPublishChain) => this.__debugDataPublishChain(dataPublishChain, 'post ClickMenuButtonPublishDropDown'))
      .then((dataPublishChain: IDataPublishChain) => this.PromiseOneStep().ClickMenuDropDownPublishItem(dataPublishChain))
      //.then((dataPublishChain: IDataPublishChain) => this.__debugDataPublishChain(dataPublishChain, 'post MenuDropDownPublishItem'))
      .then((dataPublishChain: IDataPublishChain) => this.PromiseOneStep().GetThePublishItemDialog(dataPublishChain))
      //.then((dataPublishChain: IDataPublishChain) => this.__debugDataPublishChain(dataPublishChain, 'post PublishItemDialog'))

      .then((dataPublishChain: IDataPublishChain) => this.GetDialogIframe0Blue(dataPublishChain))
      .then((dataPublishChain: IDataPublishChain) => this.__WaitForAndClickPublishNextButton(dataPublishChain))
      .then((dataPublishChain: IDataPublishChain) => this.GetMessageDialog(dataPublishChain))
      .then((dataPublishChain: IDataPublishChain) => this.__waitForAndClickOk(dataPublishChain))
      .then((dataPublishChain: IDataPublishChain) => this.__waitForAndClickClose(dataPublishChain))

      .catch(ex => {
        this.AllAgents.Logger.ErrorAndThrow(this.PublishCE.name, ex);
      });

    this.AllAgents.Logger.FuncEnd(this.PublishCE.name);
  }

  async __waitForAndClickClose(dataPublishChain: IDataPublishChain) {
    await this.AllAgents.HelperAgent.PromiseHelper.WaitForAndReturnFoundElem(dataPublishChain.Iframe0Blue.ContentDoc, ContentConst.Const.Selector.SC.Publish.SettingsHidden)
      .then(async () => {
        await this.AllAgents.HelperAgent.PromiseHelper.WaitForAndReturnFoundElem(dataPublishChain.Iframe0Blue.ContentDoc, ContentConst.Const.Selector.SC.Publish.TheItemHasBeenPublished, this.SharedConst().IterHelper.MaxCount.OverridePublishing)
      })
      .then(async () => {
        await this.AllAgents.HelperAgent.PromiseHelper.WaitForThenClick([ContentConst.Const.Selector.SC.Cancel], dataPublishChain.Iframe0Blue.ContentDoc);
      });

    return dataPublishChain;
  }

  private async __waitForAndClickOk(dataPublishChain: IDataPublishChain) {
    await this.AllAgents.HelperAgent.PromiseHelper.WaitForThenClick([ContentConst.Const.Selector.SC.Ok], dataPublishChain.messageDialogIframeRed.ContentDoc);

    return dataPublishChain;
  }

  async __WaitForAndClickPublishNextButton(dataPublishChain: IDataPublishChain) {
    await this.AllAgents.HelperAgent.PromiseHelper.WaitForThenClick([ContentConst.Const.Selector.SC.NextButton], dataPublishChain.Iframe0Blue.ContentDoc);

    return dataPublishChain;
  }

  async GetMessageDialog(dataPublishChain: IDataPublishChain) {
    let toReturnPublishChain: IDataPublishChain = dataPublishChain;

    await this.AllAgents.HelperAgent.PromiseHelper.WaitForIframeElemAndReturnWhenReady(dataPublishChain.jqIframe.ContentDoc, ContentConst.Const.Selector.SC.ContentIFrame1, 'iframeRed')
      .then((result) => toReturnPublishChain.messageDialogIframeRed = result)
      .catch((err) => this.AllAgents.Logger.ErrorAndThrow(this.GetMessageDialog.name, err));

    return toReturnPublishChain;
  }

  async GetDialogIframe0Blue(dataPublishChain: IDataPublishChain = null) {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.GetDialogIframe0Blue.name);

      let promiseResult: PromiseResult = new PromiseResult(this.GetDialogIframe0Blue.name, this.AllAgents.Logger);

      //why is this null?
      //var IDataOneIframe: IDataOneIframe = this.AllAgents.HelperAgent.FactoryHelp.DataOneIframeFactory(null, dataPublishChain.jqIframe.ContentDoc, 'Iframe0Blue');

      //this.ContentAgents.Logger.MarkerA();
      this.AllAgents.Logger.LogAsJsonPretty('dataPublishChain', dataPublishChain);
      //this.ContentAgents.Logger.MarkerB();

      await this.AllAgents.HelperAgent.PromiseHelper.WaitForIframeElemAndReturnWhenReady(dataPublishChain.jqIframe.ContentDoc, ContentConst.Const.Selector.SC.ContentIframe0, 'Iframe0Blue')
        .then((result) => {
          this.AllAgents.Logger.MarkerC();
          dataPublishChain.Iframe0Blue = result;
          promiseResult.MarkSuccessful();
        })
        .catch((err) => promiseResult.MarkFailed(err));

      this.AllAgents.Logger.LogAsJsonPretty('dataPublishChain.Iframe0Blue', dataPublishChain.Iframe0Blue);
      //this.ContentAgents.Logger.DebugDataOneIframe(dataPublishChain.Iframe0Blue);

      this.AllAgents.Logger.FuncEnd(this.GetDialogIframe0Blue.name);
      if (promiseResult.WasSuccessful()) {
        resolve(dataPublishChain);
      } else {
        reject(promiseResult.RejectReasons)
      }
    });
  }

  private __waitForThenFunc(selector: string, targetDoc: IDataOneDoc, dataPublishChain: IDataPublishChain, optionFunc: Function) {
    return new Promise<IDataPublishChain>(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.__waitForThenFunc.name, selector);
      this.AllAgents.Logger.DebugIDataOneDoc(targetDoc);

      var found: HTMLElement = null;
      await this.AllAgents.HelperAgent.PromiseHelper.WaitForAndReturnFoundElem(targetDoc, selector)
        .then((result) => found = result);

      if (found) {
        this.AllAgents.Logger.Log('found');
        if (optionFunc) {
          this.AllAgents.Logger.Log('executing func');
          dataPublishChain = await optionFunc(found, dataPublishChain);
        }
        this.__debugDataPublishChain(dataPublishChain, this.__waitForThenFunc.name);

        this.AllAgents.Logger.FuncEnd(this.__waitForThenFunc.name, selector);

        resolve(dataPublishChain)
      } else {
        reject('not found');
      }
    });
  }
}