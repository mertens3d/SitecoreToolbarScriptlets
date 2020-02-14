import { ContentHub } from '../Managers/ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { IterationHelper } from '../../../Shared/scripts/Classes/IterationHelper';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { IDataPublishChain } from '../../../Shared/scripts/Interfaces/IDataPublishChain';
import { IDataOneIframe } from '../../../Shared/scripts/Interfaces/IDataOneIframe';
import { ContentConst } from '../../../Shared/scripts/Interfaces/InjectConst';

export class PromiseChainQuickPublish extends ContentManagerBase {
  constructor(hub: ContentHub) {
    //hub.debug.FuncStart(PromiseChainQuickPublish.name);
    super(hub)
    //hub.debug.FuncEnd(PromiseChainQuickPublish.name);
  }

  __debugDataPublishChain(dataPublishChain: IDataPublishChain, nickname: string) {
    this.Log().FuncStart(this.__debugDataPublishChain.name, nickname);

    this.Log().LogVal('docToPublish', this.Log().IsNullOrUndefined(dataPublishChain.docToPublish));
    this.Log().LogVal('jqIframe', this.Log().IsNullOrUndefined(dataPublishChain.jqIframe) + ' ' + (dataPublishChain.jqIframe ? dataPublishChain.jqIframe.IframeElem.src : ''));
    this.Log().LogVal('Iframe0blueIframe', this.Log().IsNullOrUndefined(dataPublishChain.Iframe0Blue) + ' ' + (dataPublishChain.Iframe0Blue ? dataPublishChain.Iframe0Blue.IframeElem.src : ''));
    this.Log().LogVal('messageDialogIframeRed', this.Log().IsNullOrUndefined(dataPublishChain.messageDialogIframeRed) + ' ' + (dataPublishChain.messageDialogIframeRed ? dataPublishChain.messageDialogIframeRed.IframeElem.src : ''));

    this.Log().FuncEnd(this.__debugDataPublishChain.name);

    return dataPublishChain;
  }

  async PublishCE(docToPublish: IDataOneDoc) {
    this.Log().FuncStart(this.PublishCE.name);

    var dataPublishChain: IDataPublishChain = {
      docToPublish: docToPublish,
      TopLevelDoc: this.ScUiMan().TopLevelDoc(),
      Iframe0Blue: null,
      jqIframe: null,
      messageDialogIframeRed: null
    }

    await this.PromiseOneStep().ClickPublishOnNav(dataPublishChain)

      .then((dataPublishChain: IDataPublishChain) => this.PromiseOneStep().ClickMenuButtonPublishDropDown(dataPublishChain))
      .then((dataPublishChain: IDataPublishChain) => this.__debugDataPublishChain(dataPublishChain, 'post ClickMenuButtonPublishDropDown'))
      .then((dataPublishChain: IDataPublishChain) => this.PromiseOneStep().ClickMenuDropDownPublishItem(dataPublishChain))
      .then((dataPublishChain: IDataPublishChain) => this.__debugDataPublishChain(dataPublishChain, 'post MenuDropDownPublishItem'))
      .then((dataPublishChain: IDataPublishChain) => this.PromiseOneStep().GetThePublishItemDialog(dataPublishChain))
      .then((dataPublishChain: IDataPublishChain) => this.__debugDataPublishChain(dataPublishChain, 'post PublishItemDialog'))
      .then((dataPublishChain: IDataPublishChain) => this.GetDialogIframe0Blue(dataPublishChain))
      .then((dataPublishChain: IDataPublishChain) => this.__WaitForAndClickPublishNextButton(dataPublishChain))
      .then((dataPublishChain: IDataPublishChain) => this.GetMessageDialog(dataPublishChain))
      .then((dataPublishChain: IDataPublishChain) => this.__waitForAndClickOk(dataPublishChain))
      .then((dataPublishChain: IDataPublishChain) => this.__waitForAndClickClose(dataPublishChain))

      .catch(ex => {
        this.Log().Error(this.PublishCE.name, ex);
      });

    this.Log().FuncEnd(this.PublishCE.name);
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

    var IDataOneIframe: IDataOneIframe = this.ContentFactory().DateOneIframeFactory(null, dataPublishChain.jqIframe.ContentDoc, 'iframeRed');

    dataPublishChain.messageDialogIframeRed =
      await this.Helpers().PromiseHelp.WaitForAndReturnReadyIframe(dataPublishChain.jqIframe.ContentDoc, ContentConst.Const.Selector.SC.ContentIFrame1,  IDataOneIframe)

    return dataPublishChain;
  }

  async GetDialogIframe0Blue(dataPublishChain: IDataPublishChain = null) {
    this.Log().FuncStart(this.GetDialogIframe0Blue.name);

    var IDataOneIframe: IDataOneIframe = this.ContentFactory().DateOneIframeFactory(null, dataPublishChain.jqIframe.ContentDoc, 'Iframe0Blue');

    dataPublishChain.Iframe0Blue = await this.Helpers().PromiseHelp.WaitForAndReturnReadyIframe(dataPublishChain.jqIframe.ContentDoc, ContentConst.Const.Selector.SC.ContentIframe0, IDataOneIframe );

    this.Log().DebugDataOneIframe(dataPublishChain.Iframe0Blue);

    this.Log().FuncEnd(this.GetDialogIframe0Blue.name);

    return dataPublishChain;
  }

  private __waitForThenFunc(selector: string, targetDoc: IDataOneDoc, dataPublishChain: IDataPublishChain, optionFunc: Function) {
    return new Promise<IDataPublishChain>(async (resolve, reject) => {
      this.Log().FuncStart(this.__waitForThenFunc.name, selector);
      this.Log().DebugIDataOneDoc(targetDoc);

      var found: HTMLElement = null;

      var found = await this.Helpers().PromiseHelp.WaitForAndReturnFoundElem(targetDoc, selector);

      if (found) {
        this.Log().Log('found');
        if (optionFunc) {
          this.Log().Log('executing func');
          dataPublishChain = await optionFunc(found, dataPublishChain);
        }
        this.__debugDataPublishChain(dataPublishChain, this.__waitForThenFunc.name);

        this.Log().FuncEnd(this.__waitForThenFunc.name, selector);

        resolve(dataPublishChain)
      } else {
        reject('not found');
      }
    });
  }
}