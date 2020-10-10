import { DocumentJacket } from '../../../../../DOMJacket/DocumentJacket';
import { StateFullProxyDisciminator } from '../../../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator';
import { Guid } from '../../../../../Shared/scripts/Helpers/Guid';
import { IHindeCore } from "../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IStateFullProxy } from '../../../../../Shared/scripts/Interfaces/Agents/IStateProxy';
import { IStateOfContentEditor } from '../../../../../Shared/scripts/Interfaces/Data/States/IStateOfContentEditor';
import { ContentConst } from '../../../../../Shared/scripts/Interfaces/InjectConst';
import { ContentEditorPublishProxy } from './ContentEditorPublishProxy';
import { _ContentTreeBasedProxy } from './_ContentTreeBasedProxy';

export class ContentEditorSFProxy extends _ContentTreeBasedProxy<IStateOfContentEditor> implements IStateFullProxy {
  public readonly StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[StateFullProxyDisciminator.ContentEditor];
  readonly TreeRootSelector: string = ContentConst.Const.Selector.SC.ContentTree.BuiltIn.TreeNodeSitecoreRoot;
  public readonly StateFullProxyDisciminator = StateFullProxyDisciminator.ContentEditor;

  constructor(hindeCore: IHindeCore, documentJacket: DocumentJacket, friendly: string) {
    super(hindeCore, documentJacket);
    this.Logger.CTORStart(ContentEditorSFProxy.name);

    this.Logger.CTOREnd(ContentEditorSFProxy.name);
  }

  async PublishItem(): Promise<void> {
    let publishProxy = new ContentEditorPublishProxy(this.HindeCore, this, this.DocumentJacket);
    await publishProxy.Execute();
  }

  async InstantiateAsyncMembers(): Promise<void> {
    return this.__baseInstantiateAsyncMembers();
  }

  WireEvents() {
    this.Logger.FuncStart(this.WireEvents.name, ContentEditorSFProxy.name);
    this.__baseWireEvents()
    this.Logger.FuncEnd(this.WireEvents.name, ContentEditorSFProxy.name);
  }

  GetState(): Promise<IStateOfContentEditor> {
    return this.__baseGetState();    
  }

  async SetState(dataToRestore: IStateOfContentEditor): Promise<Boolean> {
    return this.__baseSetState(dataToRestore);
  }

  TriggerInboundEventsAsync(): void {
    this.__BaseTriggerInboundEventsAsync();
    
  }

  //----------------------------------------------------------------------


  SetCompactCss() {
    this.Logger.FuncStart(this.SetCompactCss.name, Guid.AsShort(this.DocumentJacket.DocId));

    //  browser.tabs.insertCSS(ass integer tabId, object details, function callback);

    this.Logger.FuncStart(this.SetCompactCss.name, Guid.AsShort(this.DocumentJacket.DocId));
  }

 
}