import { ContentHub } from '../Managers/ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { PromiseHelper } from '../../../Shared/scripts/Classes/PromiseGeneric';
import { IDataPublishChain } from '../../../Shared/scripts/Interfaces/IDataPublishChain';
import { ContentConst } from '../../../Shared/scripts/Interfaces/InjectConst';
import { IAllConentAgents } from '../../../Shared/scripts/Interfaces/Agents/IAllConentAgents';

export class PromiseOneStep extends ContentManagerBase {
  constructor(hub: ContentHub, contentAgents: IAllConentAgents) {
    super(hub, contentAgents);
    this.ContentAgents.Logger.FuncStart(PromiseHelper.name);
    this.ContentAgents.Logger.FuncEnd(PromiseHelper.name);
  }

  async ClickPublishOnNav(payload: IDataPublishChain) {
    await this.Helpers().PromiseHelp.WaitForThenClick([ContentConst.Const.Selector.SC.NavPublishStrip], payload.docToPublish)
    await this.Helpers().PromiseHelp.WaitForThenClick([ContentConst.Const.Selector.SC.NavPublishStrip], payload.docToPublish)
    return payload;
  }

  async ClickMenuButtonPublishDropDown(payload: IDataPublishChain = null) {
    await this.Helpers().PromiseHelp.WaitForThenClick([ContentConst.Const.Selector.SC.MenuButtonPublish], payload.docToPublish);
    return payload;
  }

  async ClickMenuDropDownPublishItem(payload: IDataPublishChain = null) {
    return await this.Helpers().PromiseHelp.WaitForAndClickWithPayload(ContentConst.Const.Selector.SC.MenuDropDownPublishItem, payload.docToPublish, payload)
  }

  async GetThePublishItemDialog(dataPublishChain: IDataPublishChain = null) {
     await this.Helpers().PromiseHelp.WaitForAndReturnFoundElem(dataPublishChain.TopLevelDoc, ContentConst.Const.Selector.SC.JqueryModalDialogsFrame)
      .then(
        (found: HTMLElement) => {
          dataPublishChain.jqIframe = this.Helpers().FactoryHelp.DataOneIframeFactory(<HTMLIFrameElement>found, 'jqIframe');
          
          return dataPublishChain;
        }
      ) // opens publish item dialog
      .then(async (payload: IDataPublishChain) => {
        await this.Helpers().PromiseHelp.WaitForReadyIframe(payload.jqIframe);
        dataPublishChain = payload;
      });

    return dataPublishChain;
  }



}