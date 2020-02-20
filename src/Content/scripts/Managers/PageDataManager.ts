import { ContentHub } from './ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';

export class PageManager extends ContentManagerBase {
  private topLevelDoc: IDataOneDoc;
  ChildPage: IDataOneDoc;
  SelfWindow: IDataOneDoc;

  constructor(hub: ContentHub) {
    super(hub);
    this.Log().CtorName(this.constructor.name);
  }

  Init() {
    this.Log().FuncStart(this.Init.name);

    //if (window.opener) {
    this.topLevelDoc = {
      //ParentDoc: null,
      ContentDoc: (<Window>(window)).document,
      DocId: this.Helpers().GuidHelp.NewGuid(),
      Nickname: 'Original Target Page'
    }

    //this.topLevelDoc.ParentDoc = this.topLevelDoc;
    this.MsgMan().SetParentInfo(this.topLevelDoc);

    this.Log().FuncEnd(this.Init.name);
  }
}