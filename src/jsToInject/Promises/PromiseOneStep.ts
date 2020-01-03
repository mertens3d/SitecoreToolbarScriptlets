﻿import { Hub } from '../Managers/Hub';
import { ManagerBase } from '../_first/_ManagerBase';
import { PromiseGeneric } from './PromiseGeneric';
import { IDataOneDoc } from '../Interfaces/IDataOneDoc';
import { IDataPublishChain } from '../Interfaces/IDataPublishChain';

export class PromiseOneStep extends ManagerBase {
  constructor(xyyz: Hub) {
    xyyz.debug.FuncStart(PromiseGeneric.name);
    super(xyyz);
    xyyz.debug.FuncEnd(PromiseGeneric.name);
  }

  async ClickPublishOnNav(payload: IDataPublishChain) {
    await this.PromiseGen().WaitForThenClick(this.Const().Selector.SC.NavPublishStrip, payload.docToPublish)
    return payload;
  }

  async ClickMenuButtonPublishDropDown(payload: IDataPublishChain = null) {
    await this.PromiseGen().WaitForThenClick(this.Const().Selector.SC.MenuButtonPublish, payload.docToPublish);
    return payload;
  }

  async ClickMenuDropDownPublishItem(payload: IDataPublishChain = null) {
    return await this.PromiseGen().WaitForAndClickWithPayload(this.Const().Selector.SC.MenuDropDownPublishItem, payload.docToPublish, payload)
  }

  async GetThePublishItemDialog(dataPublishChain: IDataPublishChain = null) {
     await this.PromiseGen().WaitForAndReturnFoundElem(dataPublishChain.TopLevelDoc, this.Const().Selector.SC.JqueryModalDialogsFrame)
      .then(
        (found: HTMLElement) => {
          dataPublishChain.jqIframe = this.Utilites().DateOneIframeFactory(<HTMLIFrameElement>found, dataPublishChain.docToPublish.ParentDoc, 'jqIframe');
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