﻿import { ContentHub } from '../Managers/ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { PromiseHelper } from '../../../Shared/scripts/Classes/PromiseGeneric';
import { IDataPublishChain } from '../../../Shared/scripts/Interfaces/IDataPublishChain';

export class PromiseOneStep extends ContentManagerBase {
  constructor(hub: ContentHub) {
    hub.debug.FuncStart(PromiseHelper.name);
    super(hub);
    hub.debug.FuncEnd(PromiseHelper.name);
  }

  async ClickPublishOnNav(payload: IDataPublishChain) {
    await this.PromiseGen().WaitForThenClick([this.Const().Selector.SC.NavPublishStrip], payload.docToPublish)
    return payload;
  }

  async ClickMenuButtonPublishDropDown(payload: IDataPublishChain = null) {
    await this.PromiseGen().WaitForThenClick([this.Const().Selector.SC.MenuButtonPublish], payload.docToPublish);
    return payload;
  }

  async ClickMenuDropDownPublishItem(payload: IDataPublishChain = null) {
    return await this.PromiseGen().WaitForAndClickWithPayload(this.Const().Selector.SC.MenuDropDownPublishItem, payload.docToPublish, payload)
  }

  async GetThePublishItemDialog(dataPublishChain: IDataPublishChain = null) {
     await this.PromiseGen().WaitForAndReturnFoundElem(dataPublishChain.TopLevelDoc, this.Const().Selector.SC.JqueryModalDialogsFrame)
      .then(
        (found: HTMLElement) => {
          dataPublishChain.jqIframe = this.Factoryman().DateOneIframeFactory(<HTMLIFrameElement>found, dataPublishChain.docToPublish.ParentDoc, 'jqIframe');
          return dataPublishChain;
        }
      ) // opens publish item dialog
      .then(async (payload: IDataPublishChain) => {
        await this.PromiseGen().WaitForReadyIframe(payload.jqIframe);
        dataPublishChain = payload;
      });

    return dataPublishChain;
  }



}