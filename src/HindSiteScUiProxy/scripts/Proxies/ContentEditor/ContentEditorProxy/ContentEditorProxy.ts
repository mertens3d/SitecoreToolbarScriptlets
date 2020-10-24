import { DocumentJacket } from '../../../../../DOMJacket/scripts/Document/DocumentJacket';
import { ScProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { APICommandFlag } from "../../../../../Shared/scripts/Enums/APICommand";
import { Guid } from '../../../../../Shared/scripts/Helpers/Guid';
import { IAPICore } from "../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { ContentConst } from '../../../../../Shared/scripts/Interfaces/InjectConst';
import { IScDocProxy } from '../../../../../Shared/scripts/Interfaces/ScProxies/IBaseScDocProxy';
import { IStateOfContentTreeBasedProxies } from '../../../../../Shared/scripts/Interfaces/StateOf/IStateOfContentTreeBasedProxies';
import { AsyncLock } from '../../Desktop/DesktopProxy/DesktopStartBarProxy/AsyncLock';
import { ContentEditorPublishProxy } from './ContentEditorPublishProxy';
import { ScRibbonProxy } from './ScRibbonProxy/ScRibbonProxy';
import { _ContentTreeBasedDocProxy } from './_ContentTreeBasedProxy';

export class ContentEditorDocProxy extends _ContentTreeBasedDocProxy<IStateOfContentTreeBasedProxies> implements IScDocProxy {
  public readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.ContentEditor];
  readonly TreeRootSelector: string = ContentConst.Const.Selector.SC.ContentTree.BuiltIn.TreeNodeSitecoreRoot;
  public readonly ScProxyDisciminator = ScProxyDisciminator.ContentEditor;

  constructor(apiCore: IAPICore, documentJacket: DocumentJacket, friendly: string) {
    super(apiCore, documentJacket);
    this.Logger.CTORStart(ContentEditorDocProxy.name);

    this.Logger.CTOREnd(ContentEditorDocProxy.name);
  }

  async PublishItem(): Promise<void> {
    let publishProxy = new ContentEditorPublishProxy(this.ApiCore, this, this.DocumentJacket);
    await publishProxy.Execute();
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