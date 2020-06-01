﻿import { ContentHub } from '../Managers/ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { PromiseHelper } from '../../../Shared/scripts/Classes/PromiseGeneric';
import { IDataPublishChain } from '../../../Shared/scripts/Interfaces/IDataPublishChain';
import { ContentConst } from '../../../Shared/scripts/Interfaces/InjectConst';
import { IAllAgents } from '../../../Shared/scripts/Interfaces/Agents/IAllAgents';

export class PromiseOneStep extends ContentManagerBase {
  constructor(hub: ContentHub, AllAgents: IAllAgents) {
    super(hub, AllAgents);
    this.AllAgents.Logger.FuncStart(PromiseHelper.name);
    this.AllAgents.Logger.FuncEnd(PromiseHelper.name);
  }

  async ClickPublishOnNav(payload: IDataPublishChain) {
    await this.AllAgents.HelperAgent.PromiseHelper.WaitForThenClick([ContentConst.Const.Selector.SC.NavPublishStrip], payload.docToPublish)
    await this.AllAgents.HelperAgent.PromiseHelper.WaitForThenClick([ContentConst.Const.Selector.SC.NavPublishStrip], payload.docToPublish)
    return payload;
  }

  async ClickMenuButtonPublishDropDown(payload: IDataPublishChain = null) {
    await this.AllAgents.HelperAgent.PromiseHelper.WaitForThenClick([ContentConst.Const.Selector.SC.MenuButtonPublish], payload.docToPublish);
    return payload;
  }

  async ClickMenuDropDownPublishItem(payload: IDataPublishChain = null) {
    return await this.AllAgents.HelperAgent.PromiseHelper.WaitForAndClickWithPayload(ContentConst.Const.Selector.SC.MenuDropDownPublishItem, payload.docToPublish, payload)
  }

  async GetThePublishItemDialog(dataPublishChain: IDataPublishChain = null) {
     await this.AllAgents.HelperAgent.PromiseHelper.WaitForAndReturnFoundElem(dataPublishChain.TopLevelDoc, ContentConst.Const.Selector.SC.JqueryModalDialogsFrame)
      .then(
        (found: HTMLElement) => {
          dataPublishChain.jqIframe = this.AllAgents.HelperAgent.FactoryHelp.DataOneIframeFactory(<HTMLIFrameElement>found, 'jqIframe');
          
          return dataPublishChain;
        }
      ) // opens publish item dialog
      .then(async (payload: IDataPublishChain) => {
        await this.AllAgents.HelperAgent.PromiseHelper.WaitForReadyIframe(payload.jqIframe);
        dataPublishChain = payload;
      });

    return dataPublishChain;
  }



}