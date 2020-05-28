import { ContentHub } from './ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';

import { IAllConentAgents } from '../../../Shared/scripts/Interfaces/Agents/IAllConentAgents';

export class PageManager extends ContentManagerBase {
  private topLevelDoc: IDataOneDoc;
  ChildPage: IDataOneDoc;
  SelfWindow: IDataOneDoc;

  constructor(hub: ContentHub, contentAgents: IAllConentAgents) {
    super(hub, contentAgents);
    this.ContentAgents.Logger.CtorName(this.constructor.name);
  }

  Init() {
    this.ContentAgents.Logger.FuncStart(this.Init.name);

    //if (window.opener) {
    this.topLevelDoc = {
      //ParentDoc: null,
      ContentDoc: (<Window>(window)).document,
      DocId: this.Helpers().GuidHelp.NewGuid(),
      Nickname: 'Original Target Page'
    }

    //this.topLevelDoc.ParentDoc = this.topLevelDoc;
    this.MsgMan().SetParentInfo(this.topLevelDoc);

    this.ContentAgents.Logger.FuncEnd(this.Init.name);
  }
}