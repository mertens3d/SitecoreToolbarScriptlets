import { DocumentJacket } from '../../../../../DOMJacket/DocumentJacket';
import { DefaultStateOfContentEditor } from '../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfContentEditor';
import { StateFullProxyDisciminator } from '../../../../../Shared/scripts/Enums/4000 - StateFullProxyDisciminator';
import { Guid } from '../../../../../Shared/scripts/Helpers/Guid';
import { IHindeCore } from "../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IStateFullProxy } from '../../../../../Shared/scripts/Interfaces/Agents/IStateProxy';
import { IStateOfContentEditor } from '../../../../../Shared/scripts/Interfaces/Data/States/IStateOfContentEditor';
import { IStateOfContentTree } from '../../../../../Shared/scripts/Interfaces/Data/States/IStateOfContentTree';
import { IStateOfScContentTreeNodeDeep } from '../../../../../Shared/scripts/Interfaces/Data/States/IStateOfScContentTreeNode';
import { ContentEditorPublishProxy } from './ContentEditorPublishProxy';
import { _ContentTreeBasedProxy } from './_ContentTreeBasedProxy';
import { ContentConst } from '../../../../../Shared/scripts/Interfaces/InjectConst';

export class ContentEditorSFProxy extends _ContentTreeBasedProxy<IStateOfContentEditor> implements IStateFullProxy {
  readonly TreeRootSelector: string = ContentConst.Const.Selector.SC.ContentTree.BuiltIn.TreeNodeSitecoreRoot;
  public readonly StateFullProxyDisciminator = StateFullProxyDisciminator.ContentEditor;

  constructor(hindeCore: IHindeCore, documentJacket: DocumentJacket, friendly: string) {
    super(hindeCore, documentJacket, friendly);
    this.Logger.CTORStart(ContentEditorSFProxy.name);

    this.Logger.CTOREnd(ContentEditorSFProxy.name);
  }

  async PublishItem(): Promise<void> {
    let publishProxy = new ContentEditorPublishProxy(this.HindeCore, this, this.DocumentJacket);
    await publishProxy.Execute();
  }

  async InstantiateAsyncMembers(): Promise<void> {
    this.Logger.FuncStart(this.InstantiateAsyncMembers.name, ContentEditorSFProxy.name);
    try {
      await this.__baseInstantiateAsyncMembers()
        .catch((err) => this.ErrorHand.ErrorAndThrow(this.InstantiateAsyncMembers.name, err));
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.InstantiateAsyncMembers.name, err);
    }
    this.Logger.FuncEnd(this.InstantiateAsyncMembers.name, ContentEditorSFProxy.name);
  }

  WireEvents() {
    this.Logger.FuncStart(this.WireEvents.name, ContentEditorSFProxy.name);
    this.__baseWireEvents()
    this.Logger.FuncEnd(this.WireEvents.name, ContentEditorSFProxy.name);
  }

  GetState(): Promise<IStateOfContentEditor> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetState.name, ContentEditorSFProxy.name);

      let toReturnStateOfContentEditor: IStateOfContentEditor = new DefaultStateOfContentEditor();

      await this.ContentTreeProxy.GetStateOfContentTree()
        .then((stateOfContentTree: IStateOfContentTree) => toReturnStateOfContentEditor.StateOfContentTree = stateOfContentTree)
        .then(() => resolve(toReturnStateOfContentEditor))
        .catch((err) => reject(this.GetState.name + ' | ' + err));
      this.Logger.FuncEnd(this.GetState.name, ContentEditorSFProxy.name);
    });
  }

  async SetState(dataToRestore: IStateOfContentEditor): Promise<Boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      this.Logger.FuncStart(this.SetState.name, ContentEditorSFProxy.name + ' ' + Guid.AsShort(this.DocumentJacket.DocId));

      let StateResponse: boolean = false;

      await this.__baseSetState(dataToRestore)
        .then((response: boolean) => StateResponse = response)
        .then(() => {
          resolve(StateResponse);
        })
        .catch((err) => {
          reject(this.SetState.name + " " + err);
        });

      this.Logger.FuncEnd(this.SetState.name, ContentEditorSFProxy.name);
    });
  }

  TriggerInboundEventsAsync(): void {
    this.ErrorHand.ThrowIfNullOrUndefined(this.TriggerInboundEventsAsync.name + ' ' + ContentEditorSFProxy.name, this.ContentTreeProxy);
    this.ContentTreeProxy.TriggerActiveNodeChangeEvent();
  }

  //----------------------------------------------------------------------

  async WaitForCompleteNABContentEditor(): Promise<void> {
    this.Logger.FuncStart(this.WaitForCompleteNABContentEditor.name);
    try {
      await this.DocumentJacket.WaitForCompleteNAB_DocumentJacket(this.Friendly)
        .catch((err) => this.ErrorHand.ErrorAndThrow(this.WaitForCompleteNABContentEditor.name, err));
    } catch (e) {
    }

    this.Logger.FuncEnd(this.WaitForCompleteNABContentEditor.name);
  }

  SetCompactCss() {
    this.Logger.FuncStart(this.SetCompactCss.name, Guid.AsShort(this.DocumentJacket.DocId));

    //  browser.tabs.insertCSS(ass integer tabId, object details, function callback);

    this.Logger.FuncStart(this.SetCompactCss.name, Guid.AsShort(this.DocumentJacket.DocId));
  }

  GetActiveNode(allTreeNodeAr: IStateOfScContentTreeNodeDeep[]) {
    this.Logger.FuncStart(this.GetActiveNode.name);
    let toReturn: IStateOfScContentTreeNodeDeep = null;
    if (allTreeNodeAr) {
      for (var idx = 0; idx < allTreeNodeAr.length; idx++) {
        let candidate: IStateOfScContentTreeNodeDeep = allTreeNodeAr[idx];
        if (candidate.IsActive) {
          toReturn = candidate;
          break;
        }
      }
    } else {
      this.ErrorHand.ErrorAndThrow(this.GetActiveNode.name, 'No tree data provided');
    }

    this.Logger.FuncEnd(this.GetActiveNode.name, toReturn.Friendly);
    return toReturn;
  }
}