import { IAllAgents } from '../../../Shared/scripts/Interfaces/Agents/IAllAgents';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { ContentHub } from './ContentHub/ContentHub';
import { Guid } from '../../../Shared/scripts/Helpers/Guid';

export class PageManager extends ContentManagerBase {
  private topLevelDoc: IDataOneDoc;
  ChildPage: IDataOneDoc;
  SelfWindow: IDataOneDoc;

  constructor(hub: ContentHub, AllAgents: IAllAgents) {
    super(hub, AllAgents);
    this.AllAgents.Logger.CtorName(this.constructor.name);
  }

  Init() {
    this.AllAgents.Logger.FuncStart(this.Init.name);

    //if (window.opener) {
    this.topLevelDoc = {
      //ParentDoc: null,
      ContentDoc: (<Window>(window)).document,
      DocId: Guid.NewGuid(),
      Nickname: 'Original Target Page'
    }

    //this.topLevelDoc.ParentDoc = this.topLevelDoc;
    this.MsgMan().SetParentInfo(this.topLevelDoc);

    this.AllAgents.Logger.FuncEnd(this.Init.name);
  }
}