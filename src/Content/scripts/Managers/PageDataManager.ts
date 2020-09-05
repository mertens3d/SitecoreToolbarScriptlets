import { Guid } from '../../../Shared/scripts/Helpers/Guid';
import { ILoggerAgent } from '../../../Shared/scripts/Interfaces/Agents/ILoggerBase';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { ContentMessageManager } from './ContentMessageManager/ContentMessageManager';
import { LoggableBase } from './LoggableBase';

export class PageManager  extends LoggableBase {
  private topLevelDoc: IDataOneDoc;
  ChildPage: IDataOneDoc;
  SelfWindow: IDataOneDoc;
  MsgMan: ContentMessageManager;

  constructor(logger: ILoggerAgent, msgMan: ContentMessageManager) {
    super(logger);
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