import { ContentHub } from '../Managers/ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { IDataPublishChain } from '../../../Shared/scripts/Interfaces/IDataPublishChain';
import { ContentConst } from '../../../Shared/scripts/Interfaces/InjectConst';
import { PromiseResult } from '../../../Shared/scripts/Classes/PromiseResult';

import { IAllConentAgents } from '../../../Shared/scripts/Interfaces/Agents/IAllConentAgents';

export class PromiseChainQuickPublish extends ContentManagerBase {
  constructor(hub: ContentHub, contentAgents: IAllConentAgents) {
    //hub.debug.FuncStart(PromiseChainQuickPublish.name);
    super(hub, contentAgents)
    //hub.debug.FuncEnd(PromiseChainQuickPublish.name);
  }

  __debugDataPublishChain(dataPublishChain: IDataPublishChain, nickname: string) {
    this.ContentAgents.Logger.FuncStart(this.__debugDataPublishChain.name, nickname);

    this.ContentAgents.Logger.LogVal('docToPublish', this.ContentAgents.Logger.IsNullOrUndefined(dataPublishChain.docToPublish));
    this.ContentAgents.Logger.LogVal('jqIframe', this.ContentAgents.Logger.IsNullOrUndefined(dataPublishChain.jqIframe) + ' ' + (dataPublishChain.jqIframe ? dataPublishChain.jqIframe.IframeElem.src : ''));
    this.ContentAgents.Logger.LogVal('Iframe0blueIframe', this.ContentAgents.Logger.IsNullOrUndefined(dataPublishChain.Iframe0Blue) + ' ' + (dataPublishChain.Iframe0Blue ? dataPublishChain.Iframe0Blue.IframeElem.src : ''));
    this.ContentAgents.Logger.LogVal('messageDialogIframeRed', this.ContentAgents.Logger.IsNullOrUndefined(dataPublishChain.messageDialogIframeRed) + ' ' + (dataPublishChain.messageDialogIframeRed ? dataPublishChain.messageDialogIframeRed.IframeElem.src : ''));

    this.ContentAgents.Logger.FuncEnd(this.__debugDataPublishChain.name);

    return dataPublishChain;
  }

  async PublishCE(docToPublish: IDataOneDoc) {
    this.ContentAgents.Logger.FuncStart(this.PublishCE.name);

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
        this.ContentAgents.Logger.Error(this.PublishCE.name, ex);
      });

    this.ContentAgents.Logger.FuncEnd(this.PublishCE.name);
  }

  async __waitForAndClickClose(dataPublishChain: IDataPublishChain) {
    await this.Helpers().PromiseHelp.WaitForAndReturnFoundElem(dataPublishChain.Iframe0Blue.ContentDoc, ContentConst.Const.Selector.SC.Publish.SettingsHidden)
      .then(async () => {
        await this.Helpers().PromiseHelp.WaitForAndReturnFoundElem(dataPublishChain.Iframe0Blue.ContentDoc, ContentConst.Const.Selector.SC.Publish.TheItemHasBeenPublished, this.SharedConst().IterHelper.MaxCount.OverridePublishing)
      })
      .then(async () => {
        await this.Helpers().PromiseHelp.WaitForThenClick([ContentConst.Const.Selector.SC.Cancel], dataPublishChain.Iframe0Blue.ContentDoc);
      });

    return dataPublishChain;
  }

  private async __waitForAndClickOk(dataPublishChain: IDataPublishChain) {
    await this.Helpers().PromiseHelp.WaitForThenClick([ContentConst.Const.Selector.SC.Ok], dataPublishChain.messageDialogIframeRed.ContentDoc);

    return dataPublishChain;
  }

  async __WaitForAndClickPublishNextButton(dataPublishChain: IDataPublishChain) {
    await this.Helpers().PromiseHelp.WaitForThenClick([ContentConst.Const.Selector.SC.NextButton], dataPublishChain.Iframe0Blue.ContentDoc);

    return dataPublishChain;
  }

  async GetMessageDialog(dataPublishChain: IDataPublishChain) {
    let toReturnPublishChain: IDataPublishChain = dataPublishChain;

    await this.Helpers().PromiseHelp.WaitForIframeElemAndReturnWhenReady(dataPublishChain.jqIframe.ContentDoc, ContentConst.Const.Selector.SC.ContentIFrame1, 'iframeRed')
      .then((result) => toReturnPublishChain.messageDialogIframeRed = result)
      .catch((err) => this.ContentAgents.Logger.Error(this.GetMessageDialog, err));

    return toReturnPublishChain;
  }

  async GetDialogIframe0Blue(dataPublishChain: IDataPublishChain = null) {
    return new Promise(async (resolve, reject) => {
      this.ContentAgents.Logger.FuncStart(this.GetDialogIframe0Blue.name);

      let promiseResult: PromiseResult = new PromiseResult(this.GetDialogIframe0Blue.name, this.ContentAgents.Logger);

      //why is this null?
      //var IDataOneIframe: IDataOneIframe = this.Helpers().FactoryHelp.DataOneIframeFactory(null, dataPublishChain.jqIframe.ContentDoc, 'Iframe0Blue');

      //this.ContentAgents.Logger.MarkerA();
      this.ContentAgents.Logger.LogAsJsonPretty('dataPublishChain', dataPublishChain);
      //this.ContentAgents.Logger.MarkerB();

      await this.Helpers().PromiseHelp.WaitForIframeElemAndReturnWhenReady(dataPublishChain.jqIframe.ContentDoc, ContentConst.Const.Selector.SC.ContentIframe0, 'Iframe0Blue')
        .then((result) => {
          this.ContentAgents.Logger.MarkerC();
          dataPublishChain.Iframe0Blue = result;
          promiseResult.MarkSuccessful();
        })
        .catch((err) => promiseResult.MarkFailed(err));

      this.ContentAgents.Logger.LogAsJsonPretty('dataPublishChain.Iframe0Blue', dataPublishChain.Iframe0Blue);
      //this.ContentAgents.Logger.DebugDataOneIframe(dataPublishChain.Iframe0Blue);

      this.ContentAgents.Logger.FuncEnd(this.GetDialogIframe0Blue.name);
      if (promiseResult.WasSuccessful()) {
        resolve(dataPublishChain);
      } else {
        reject(promiseResult.RejectReasons)
      }
    });
  }

  private __waitForThenFunc(selector: string, targetDoc: IDataOneDoc, dataPublishChain: IDataPublishChain, optionFunc: Function) {
    return new Promise<IDataPublishChain>(async (resolve, reject) => {
      this.ContentAgents.Logger.FuncStart(this.__waitForThenFunc.name, selector);
      this.ContentAgents.Logger.DebugIDataOneDoc(targetDoc);

      var found: HTMLElement = null;

      var found = await this.Helpers().PromiseHelp.WaitForAndReturnFoundElem(targetDoc, selector);

      if (found) {
        this.ContentAgents.Logger.Log('found');
        if (optionFunc) {
          this.ContentAgents.Logger.Log('executing func');
          dataPublishChain = await optionFunc(found, dataPublishChain);
        }
        this.__debugDataPublishChain(dataPublishChain, this.__waitForThenFunc.name);

        this.ContentAgents.Logger.FuncEnd(this.__waitForThenFunc.name, selector);

        resolve(dataPublishChain)
      } else {
        reject('not found');
      }
    });
  }
}