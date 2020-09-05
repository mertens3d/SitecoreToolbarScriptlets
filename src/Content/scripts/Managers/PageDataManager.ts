import { Guid } from '../../../Shared/scripts/Helpers/Guid';
import { IAllAgents } from '../../../Shared/scripts/Interfaces/Agents/IAllAgents';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { ContentMessageManager } from './ContentMessageManager/ContentMessageManager';
import { LoggableBase } from './LoggableBase';

export class PageManager  extends LoggableBase {
  private topLevelDoc: IDataOneDoc;
  ChildPage: IDataOneDoc;
  SelfWindow: IDataOneDoc;
  MsgMan: ContentMessageManager;

  constructor( AllAgents: IAllAgents, msgMan: ContentMessageManager) {
    super(AllAgents.Logger);
    this.MsgMan = msgMan;
    this.Logger.CtorName(this.constructor.name);
  }

  Init() {
    this.Logger.FuncStart(this.Init.name);

    //if (window.opener) {
    this.topLevelDoc = {
      //ParentDoc: null,
      ContentDoc: (<Window>(window)).document,
      DocId: Guid.NewRandomGuid(),
      Nickname: 'Original Target Page'
    }

    //this.topLevelDoc.ParentDoc = this.topLevelDoc;
    this.MsgMan.SetParentInfo(this.topLevelDoc);

    this.Logger.FuncEnd(this.Init.name);
  }
}