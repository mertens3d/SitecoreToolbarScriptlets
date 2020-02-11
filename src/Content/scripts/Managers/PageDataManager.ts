import { ContentHub } from './ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { IDataBrowserWindow } from '../../../Shared/scripts/Interfaces/IDataBrowserWindow';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';

export class PageManager extends ContentManagerBase {

 



  private __winDataParent: IDataBrowserWindow;
  ChildPage: IDataBrowserWindow;
  SelfWindow: IDataBrowserWindow;



  constructor(hub: ContentHub) {
    super(hub);
    this.debug().CtorName(this.constructor.name);
  }

  Init() {
    this.debug().FuncStart(this.Init.name);

    //if (window.opener) {
    this.__winDataParent = {
      Window: window,
      Friendly: 'Window',
      WindowType: scWindowType.Unknown,
      DataDocSelf: {
        ParentDoc: null,
        Document: (<Window>(window)).document,
        HasParentDesktop: false,
        DocId: this.Helpers().GuidHelp.NewGuid(),
        IsCEDoc: false,
        ParentDesktop: null,
        Nickname: 'Original Target Page'
      }
    }

    this.__winDataParent.DataDocSelf.ParentDoc = this.__winDataParent.DataDocSelf

    this.MsgMan().SetParentInfo(this.__winDataParent);

    this.debug().FuncEnd(this.Init.name);
  }

  



  DebugInfo() {
    this.debug().FuncStart(this.DebugInfo.name);
    this.debug().Log(this.__winDataParent.Window);
    this.debug().Log(this.__winDataParent.DataDocSelf);
    this.debug().FuncEnd(this.DebugInfo.name);
  }
}