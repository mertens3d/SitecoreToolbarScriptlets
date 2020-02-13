import { ContentHub } from './ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';

export class PageManager extends ContentManagerBase {
  private topLevelDoc: IDataOneDoc;
  ChildPage: IDataOneDoc;
  SelfWindow: IDataOneDoc;

  constructor(hub: ContentHub) {
    super(hub);
    this.debug().CtorName(this.constructor.name);
  }

  Init() {
    this.debug().FuncStart(this.Init.name);

    //if (window.opener) {
    this.topLevelDoc = {
      ParentDoc: null,
      Document: (<Window>(window)).document,
      HasParentDesktop: false,
      DocId: this.Helpers().GuidHelp.NewGuid(),
      ParentDesktop: null,
      Nickname: 'Original Target Page'
    }

    this.topLevelDoc.ParentDoc = this.topLevelDoc;
    this.MsgMan().SetParentInfo(this.topLevelDoc);

    this.debug().FuncEnd(this.Init.name);
  }
}