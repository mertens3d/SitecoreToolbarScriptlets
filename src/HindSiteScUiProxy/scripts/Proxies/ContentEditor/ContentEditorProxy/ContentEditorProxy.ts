import { DocumentJacket } from '../../../../../DOMJacket/scripts/Document/DocumentJacket';
import { ScProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { Guid } from '../../../../../Shared/scripts/Helpers/Guid';
import { IAPICore } from "../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IStateFullDocProxy } from "../../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullDocProxy";
import { IStateOfContentEditor } from '../../../../../Shared/scripts/Interfaces/StateOf/IStateOfContentEditor';
import { ContentConst } from '../../../../../Shared/scripts/Interfaces/InjectConst';
import { ContentEditorPublishProxy } from './ContentEditorPublishProxy';
import { _ContentTreeBasedDocProxy } from './_ContentTreeBasedProxy';
import { APICommandFlag } from "../../../../../Shared/scripts/Enums/APICommand";
import { ScRibbonProxy } from './ScRibbonProxy/ScRibbonProxy';
import { AsyncLock } from '../../Desktop/DesktopProxy/DesktopStartBarProxy/AsyncLock';
import { IStateOfContentTreeBasedProxies } from '../../../../../Shared/scripts/Interfaces/StateOf/IStateOfContentTreeBasedProxies';
import { IStateFullElemProxy } from '../../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullElemProxy';

export class ContentEditorDocProxy extends _ContentTreeBasedDocProxy<IStateOfContentTreeBasedProxies> implements IStateFullDocProxy {
  public readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.ContentEditor];
  readonly TreeRootSelector: string = ContentConst.Const.Selector.SC.ContentTree.BuiltIn.TreeNodeSitecoreRoot;
  public readonly ScProxyDisciminator = ScProxyDisciminator.ContentEditor;

  public HostedElemProxies: IStateFullElemProxy[] = [];

  constructor(apiCore: IAPICore, documentJacket: DocumentJacket, friendly: string) {
    super(apiCore, documentJacket);
    this.Logger.CTORStart(ContentEditorDocProxy.name);

    this.Logger.CTOREnd(ContentEditorDocProxy.name);
  }

  async PublishItem(): Promise<void> {
    let publishProxy = new ContentEditorPublishProxy(this.ApiCore, this, this.DocumentJacket);
    await publishProxy.Execute();
  }

  async InstantiateAsyncMembers(): Promise<void> {
    return this.__baseInstantiateAsyncMembers();
  }

  async WireEvents(): Promise<void> {
    this.Logger.FuncStart(this.WireEvents.name, ContentEditorDocProxy.name);
    this.__baseWireEvents()
    this.Logger.FuncEnd(this.WireEvents.name, ContentEditorDocProxy.name);
  }

  GetState(): Promise<IStateOfContentEditor> {
    return this.__baseGetState();
  }

  async SetState(dataToRestore: IStateOfContentEditor): Promise<void> {
    this.__baseSetState(dataToRestore);
  }

  TriggerInboundEventsAsync(): void {
    this.__BaseTriggerInboundEventsAsync();
  }

  //----------------------------------------------------------------------

  TriggerCERibbonCommand(scRibbonCommand: APICommandFlag) {
    this.Logger.FuncStart([ContentEditorDocProxy.name, this.TriggerCERibbonCommand.name], APICommandFlag[scRibbonCommand]);
    let scRibbonProxy: ScRibbonProxy = new ScRibbonProxy(this.ApiCore, this.DocumentJacket);

    let asyncLock: AsyncLock = new AsyncLock(this.ApiCore); //todo - this needs to be lower...maybe in core

    scRibbonProxy.TriggerRibbonMenuItem(scRibbonCommand, asyncLock);
    this.Logger.FuncEnd([ContentEditorDocProxy.name, this.TriggerCERibbonCommand.name]);
  }

  SetCompactCss() {
    this.Logger.FuncStart(this.SetCompactCss.name, Guid.AsShort(this.DocumentJacket.DocId));

    //  browser.tabs.insertCSS(ass integer tabId, object details, function callback);

    this.Logger.FuncStart(this.SetCompactCss.name, Guid.AsShort(this.DocumentJacket.DocId));
  }
}