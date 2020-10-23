import { DocumentJacket } from '../../../../../../DOMJacket/scripts/Document/DocumentJacket';
import { ElementImgJacket } from '../../../../../../DOMJacket/scripts/Elements/ElementImgJacket';
import { GenericElemJacket } from "../../../../../../DOMJacket/scripts/Elements/GenericElemJacket";
import { INativeClassNameChangeEvent_Payload } from '../../../../../../DOMJacket/scripts/Events/NativeClassNameChangeEvent/INativeClassNameChangeEvent_Payload';
import { NativeClassNameChangeEvent_Observer } from "../../../../../../DOMJacket/scripts/Events/NativeClassNameChangeEvent/NativeClassNameChangeEvent_Observer";
import { NativeClassNameChangeEvent_Subject } from "../../../../../../DOMJacket/scripts/Events/NativeClassNameChangeEvent/NativeClassNameChangeEvent_Subject";
import { DefaultStateOfContentTree } from '../../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfContentTree';
import { Guid } from '../../../../../../Shared/scripts/Helpers/Guid';
import { IAPICore } from "../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IStateOfContentTree } from '../../../../../../Shared/scripts/Interfaces/StateOf/IStateOfContentTree';
import { IStateOfScContentTreeNodeDeep } from '../../../../../../Shared/scripts/Interfaces/StateOf/IStateOfScContentTreeNode';
import { IStateOfScContentTreeNodeShallow } from "../../../../../../Shared/scripts/Interfaces/StateOf/IStateOfScContentTreeNodeShallow";
import { ContentConst } from '../../../../../../Shared/scripts/Interfaces/InjectConst';
import { _APICoreBase } from "../../../../../../Shared/scripts/_APICoreBase";
import { ContentTreeMutationEvent_Subject } from "../../../Desktop/DesktopProxy/Events/ContentTreeProxyMutationEvent/ContentTreeProxyMutationEvent_Subject";
import { IContentTreeProxyMutationEvent_Payload } from '../../../Desktop/DesktopProxy/Events/ContentTreeProxyMutationEvent/IContentTreeProxyMutationEvent_Payload';
import { ScContentTreeNodeProxy } from './ScContentTreeNodeProxy/ScContentTreeNodeProxy';
import { ConResolver } from './ScContentTreeNodeProxy/ConResolver';
import { _BaseStateFullElemProxy } from "../../../Desktop/DesktopProxy/FrameProxies/_BaseStateFullElemProxy";
import { IStateFullElemProxy } from "../../../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullElemProxy";
import { IJacketOfType } from "../../../../../../Shared/scripts/IJacketOfType";
import { ScProxyDisciminator } from '../../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator';

//ContentTree is the name Sitecore uses
export class ContentTreeElemProxy extends _BaseStateFullElemProxy<IStateOfContentTree> implements IStateFullElemProxy {

  readonly ScProxyDisciminator = ScProxyDisciminator.ContentTreeElem;
  readonly ScProxyDisciminatorFriendly: string = ScProxyDisciminator[ScProxyDisciminator.ContentTreeElem];

  private TreeRootSelector: string;
  private _treeNodeProxy: ScContentTreeNodeProxy;
  private NativeClassNameChangeEvent_Observer: NativeClassNameChangeEvent_Observer;
  private NativeClassNameChangeEvent_Subject: NativeClassNameChangeEvent_Subject;
  private rootTreeNodeJacket: IJacketOfType;

  public ContentTreeMutationEvent_Subject: ContentTreeMutationEvent_Subject;
  private ConResolver: ConResolver;

  constructor(apiCore: IAPICore, hostDocumentJacket: DocumentJacket, treeContainerJacket: IJacketOfType, TreeRootSelector: string) {
    super(apiCore, treeContainerJacket);

    this.ErrorHand.ThrowIfNullOrUndefined(ContentTreeElemProxy.name, [hostDocumentJacket, treeContainerJacket]);
    this.TreeRootSelector = TreeRootSelector;

    this.InstantiateInstance();
  }

  private InstantiateInstance() {
    this.ConResolver = new ConResolver(this.ApiCore);
  }

  async InstantiateAsyncMembers(): Promise<void> {
    this.Logger.FuncStart(this.InstantiateAsyncMembers.name);

    try {
      await this.SetRootNodeFromSelector()
        .then(() => {
          this.ContentTreeMutationEvent_Subject = new ContentTreeMutationEvent_Subject(this.ApiCore);
          this.NativeClassNameChangeEvent_Subject = new NativeClassNameChangeEvent_Subject(this.ApiCore, this.ContainerElemJacket);
          this.NativeClassNameChangeEvent_Observer = new NativeClassNameChangeEvent_Observer(this.ApiCore, this.CallBackOnNativeClassNameChangeEventAsync.bind(this));
        })
    } catch (err: any) {
      this.ErrorHand.HandleFatalError(this.InstantiateAsyncMembers.name, err);
    }

    this.Logger.FuncEnd(this.InstantiateAsyncMembers.name);
  }

  WireEvents_TreeProxy() {
    this.Logger.FuncStart(this.WireEvents_TreeProxy.name);
    this.NativeClassNameChangeEvent_Subject.RegisterObserver(this.NativeClassNameChangeEvent_Observer);
    this.Logger.FuncEnd(this.WireEvents_TreeProxy.name);
  }

  private CallBackOnNativeClassNameChangeEventAsync(notUsed: INativeClassNameChangeEvent_Payload) {
    this.Logger.FuncStart(this.CallBackOnNativeClassNameChangeEventAsync.name);
    this.TaskMonitor.AsyncTaskStarted(this.CallBackOnNativeClassNameChangeEventAsync.name);
    if (this.ContentTreeMutationEvent_Subject) {
      this.GetState()
        .then((stateOfContentTree: IStateOfContentTree) => {
          let TreeMutationEvent_Payload: IContentTreeProxyMutationEvent_Payload = {
            ContentTree: stateOfContentTree
          }

          this.ContentTreeMutationEvent_Subject.NotifyObserversAsync(TreeMutationEvent_Payload)
        })
        .then(() => this.Logger.Log(this.CallBackOnNativeClassNameChangeEventAsync.name + ' completed'))
        .catch((err: any) => this.ErrorHand.HandleFatalError(this.CallBackOnNativeClassNameChangeEventAsync.name, err));
    }

    this.TaskMonitor.AsyncTaskCompleted(this.CallBackOnNativeClassNameChangeEventAsync.name);
    this.Logger.FuncEnd(this.CallBackOnNativeClassNameChangeEventAsync.name);
  }

  public TriggerInboundEventAsync(): void {
    this.Logger.FuncStart([ContentTreeElemProxy.name,  this.TriggerInboundEventAsync.name]);

    this.CallBackOnNativeClassNameChangeEventAsync(null);
    this.TriggerInboundEventsAsyncOnHosted();

    this.Logger.FuncEnd([ContentTreeElemProxy.name, this.TriggerInboundEventAsync.name]);
  }

  private GetTreeNodeByGlyph(targetNode: IStateOfScContentTreeNodeDeep): Promise<ScContentTreeNodeProxy> {
    return new Promise(async (resolve, reject) => {
      let scContentTreeNodeProxy: ScContentTreeNodeProxy = null;

      if (targetNode && this.ContainerElemJacket) {
        var treeGlyphTargetId: string = ContentConst.Const.Names.SC.TreeGlyphPrefix + Guid.WithoutDashes(targetNode.ItemId);

        await this.ContainerElemJacket.WaitForElement('[id=' + treeGlyphTargetId + ']', this.GetTreeNodeByGlyph.name + ' ' + treeGlyphTargetId)
          .then((elemJacket: IJacketOfType) => scContentTreeNodeProxy = new ScContentTreeNodeProxy(this.ApiCore, elemJacket, targetNode.Coord.LevelIndex, targetNode.Coord.SiblingIndex, targetNode.Coord.LevelWidth, null, this.ConResolver))
          .then(() => scContentTreeNodeProxy.Instantiate())
          .then(() => resolve(scContentTreeNodeProxy))
          .catch((err: any) => reject(this.GetTreeNodeByGlyph.name + ' | ' + err));
      } else {
        reject(() => this.ErrorHand.FormatRejectMessage(this.GetTreeNodeByGlyph.name, 'null target node or null treeContainerJacket'));
      }
    });
  }

  private async SetStateOfNodeRecursive(currentNodeData: IStateOfScContentTreeNodeDeep, depth: number): Promise<void> {
    this.Logger.FuncStart(this.SetStateOfNodeRecursive.name, currentNodeData.Friendly + ' ' + depth.toString());
    try {
      let maxIterDepth: number = 200;

      let promisesAr: Promise<void>[] = [];

      if (depth > maxIterDepth) {
        this.ErrorHand.HandleFatalError(this.SetStateOfNodeRecursive.name, 'Iteration check - max depth exceed. Something is probably wrong');
      }

      if (depth < maxIterDepth && currentNodeData) {
        //there is a chance the node may not be found. It may have been moved or deleted
        let targetScContentTreeNodeProxy: ScContentTreeNodeProxy = null;

        await this.GetTreeNodeByGlyph(currentNodeData)
          .then((scContentTreeNodeProxy: ScContentTreeNodeProxy) => targetScContentTreeNodeProxy = scContentTreeNodeProxy)
          .catch((err: any) => this.ErrorHand.WarningAndContinue(this.SetStateOfNodeRecursive.name, 'Tree node not found: ' + currentNodeData.Friendly + ' ' + currentNodeData.ItemId));

        if (targetScContentTreeNodeProxy) {
          await targetScContentTreeNodeProxy.SetStateOfTreeNode(currentNodeData, depth)
        }

        if (currentNodeData.NodeChildren.length > 0) {
          currentNodeData.NodeChildren.forEach((nodeChild: IStateOfScContentTreeNodeDeep) =>
            promisesAr.push(this.SetStateOfNodeRecursive(nodeChild, depth + 1))
          )
          await Promise.all(promisesAr);
        }
      } else {
        this.ErrorHand.HandleFatalError(this.SetStateOfNodeRecursive.name, 'no node date or max depth hit ' + depth.toString())
      }
    } catch (err: any) {
      this.ErrorHand.HandleFatalError(this.SetStateOfNodeRecursive.name, err);
    }
    this.Logger.FuncEnd(this.SetStateOfNodeRecursive.name, currentNodeData.Friendly);
  }

  async SetState(stateOfContentTree: IStateOfContentTree): Promise<void> {
    this.Logger.FuncStart([ContentTreeElemProxy.name, this.SetState.name]);
    this.TaskMonitor.AsyncTaskStarted(this.SetState.name);
    try {
      this.ContentTreeMutationEvent_Subject.DisableNotifications();
      await this.SetStateOfNodeRecursive(stateOfContentTree.ContentTreeNodeDeep, 0);
    } catch (err: any) {
      this.ErrorHand.HandleFatalError(this.SetState.name, err);
    }

    this.ContentTreeMutationEvent_Subject.EnableNotifications();
    this.TaskMonitor.AsyncTaskCompleted(this.SetState.name);
    this.Logger.FuncEnd([ContentTreeElemProxy.name, this.SetState.name]);
  }

  private async SetRootNodeFromSelector(): Promise<void> {
    try {
      await this.ContainerElemJacket.WaitForElement(this.TreeRootSelector)
        .then((elementJacket: IJacketOfType) => this.rootTreeNodeJacket = elementJacket);
    } catch (err: any) {
      this.ErrorHand.HandleFatalError(this.SetRootNodeFromSelector.name, err);
    }

    //let toReturn: ElementJacket = this.TreeContainerJacket.querySelector(ContentConst.Const.Selector.SC.ContentTree.BuiltIn.TreeNodeSitecoreRoot);
    //return toReturn;
  }

  private GetActiveTreeNodeFromAncestorNode(stateOfScContentTreeNodeDeep: IStateOfScContentTreeNodeDeep): IStateOfScContentTreeNodeDeep {
    let foundNode: IStateOfScContentTreeNodeDeep = null;
    if (stateOfScContentTreeNodeDeep.IsActive) {
      foundNode = stateOfScContentTreeNodeDeep;
    } else {
      stateOfScContentTreeNodeDeep.NodeChildren.forEach((child: IStateOfScContentTreeNodeDeep) => {
        let candidate = this.GetActiveTreeNodeFromAncestorNode(child);
        if (candidate !== null) {
          foundNode = candidate;
        }
      })
    }
    return foundNode;
  }

  GetState(): Promise<IStateOfContentTree> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart([ContentTreeElemProxy.name, this.GetState.name]);

      let stateOfContentTree: IStateOfContentTree = new DefaultStateOfContentTree();

      this.ErrorHand.ThrowIfNullOrUndefined(this.GetState.name, [stateOfContentTree]);

      await this.GetStateOfContentTreeNodeDeep()
        .then((result: IStateOfScContentTreeNodeDeep) => stateOfContentTree.ContentTreeNodeDeep = result)
        .then(() => {
          let activeNodeFlat: IStateOfScContentTreeNodeShallow = <IStateOfScContentTreeNodeShallow>this.GetActiveTreeNodeFromAncestorNode(stateOfContentTree.ContentTreeNodeDeep);
          if (activeNodeFlat) {
            stateOfContentTree.ActiveNodeShallow = activeNodeFlat;
          }
        })
        .then(() => resolve(stateOfContentTree))
        .catch((err: any) => reject(this.GetState.name + ' | ' + err));

      this.Logger.FuncEnd([ContentTreeElemProxy.name, this.GetState.name]);
    });
  }

  private GetTreeNodeProxy(): Promise<ScContentTreeNodeProxy> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetTreeNodeProxy.name);

      if (this.ContainerElemJacket) {
        if (this.rootTreeNodeJacket) {
          let parentHtmlElement = this.rootTreeNodeJacket.NativeElement.parentElement;
          var rootParent: IJacketOfType = new GenericElemJacket(this.ApiCore, parentHtmlElement);//  this.rootTreeNodeJacket.parentElement();

          await rootParent.WaitForElement(ContentConst.Const.Selector.SC.ContentEditor.ScContentTreeNodeGlyph, this.GetTreeNodeProxy.name)
            .then((firstChildGlyphNode: ElementImgJacket) => this._treeNodeProxy = new ScContentTreeNodeProxy(this.ApiCore, firstChildGlyphNode, 0, 0, 1, null, this.ConResolver))
            .then(() => this._treeNodeProxy.Instantiate())
            .then(() => resolve(this._treeNodeProxy))
            .catch((err: any) => reject(this.GetTreeNodeProxy.name + ' | ' + err));
        }
        else {
          reject(this.ErrorHand.FormatRejectMessage(this.GetTreeNodeProxy.name, 'no root node'));
        }
      }
      else {
        reject(this.ErrorHand.FormatRejectMessage(this.GetTreeNodeProxy.name, 'no targetDoc'));
      }
      this.Logger.FuncEnd(this.GetTreeNodeProxy.name);
    });
  }

  private GetStateOfContentTreeNodeDeep(): Promise<IStateOfScContentTreeNodeDeep> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetStateOfContentTreeNodeDeep.name);

      await this.GetTreeNodeProxy()
        .then((scContentTreeNodeProxy: ScContentTreeNodeProxy) => scContentTreeNodeProxy.GetStateOfScContentTreeNodeDeep())
        .then((stateOfScContentTreeNodeProxy: IStateOfScContentTreeNodeDeep) => {
          resolve(stateOfScContentTreeNodeProxy)
        })
        .catch((err: any) => reject(this.GetStateOfContentTreeNodeDeep.name + ' | ' + err));

      this.Logger.FuncEnd(this.GetStateOfContentTreeNodeDeep.name);
    });
  }
}