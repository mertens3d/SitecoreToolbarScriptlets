﻿import { DocumentJacket } from '../../../../../../DOMJacket/DocumentJacket';
import { ElementImgJacket } from '../../../../../../DOMJacket/ElementImgJacket';
import { ElementJacket } from "../../../../../../DOMJacket/ElementJacket";
import { INativeClassNameChangeEvent_Payload } from '../../../../../../DOMJacket/Events/NativeClassNameChangeEvent/INativeClassNameChangeEvent_Payload';
import { NativeClassNameChangeEvent_Observer } from "../../../../../../DOMJacket/Events/NativeClassNameChangeEvent/NativeClassNameChangeEvent_Observer";
import { NativeClassNameChangeEvent_Subject } from "../../../../../../DOMJacket/Events/NativeClassNameChangeEvent/NativeClassNameChangeEvent_Subject";
import { DefaultStateOfContentTree } from '../../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfContentTree';
import { Guid } from '../../../../../../Shared/scripts/Helpers/Guid';
import { IAPICore } from "../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IStateOfContentTree } from '../../../../../../Shared/scripts/Interfaces/Data/States/IStateOfContentTree';
import { IStateOfScContentTreeNodeDeep } from '../../../../../../Shared/scripts/Interfaces/Data/States/IStateOfScContentTreeNode';
import { IStateOfScContentTreeNodeShallow } from "../../../../../../Shared/scripts/Interfaces/Data/States/IStateOfScContentTreeNodeShallow";
import { ContentConst } from '../../../../../../Shared/scripts/Interfaces/InjectConst';
import { _APICoreBase } from "../../../../../../Shared/scripts/_APICoreBase";
import { ContentTreeMutationEvent_Subject } from "../../../Desktop/DesktopProxy/Events/ContentTreeProxyMutationEvent/ContentTreeProxyMutationEvent_Subject";
import { IContentTreeProxyMutationEvent_Payload } from '../../../Desktop/DesktopProxy/Events/ContentTreeProxyMutationEvent/IContentTreeProxyMutationEvent_Payload';
import { ScContentTreeNodeProxy } from './ScContentTreeNodeProxy/ScContentTreeNodeProxy';
import { ConResolver } from './ScContentTreeNodeProxy/ConResolver';

//ContentTree is the name Sitecore uses
export class ContentTreeProxy extends _APICoreBase {
  private TreeRootSelector: string;
  private _treeNodeProxy: ScContentTreeNodeProxy;
  private DocumentJacket: DocumentJacket;
  private NativeClassNameChangeEvent_Observer: NativeClassNameChangeEvent_Observer;
  private NativeClassNameChangeEvent_Subject: NativeClassNameChangeEvent_Subject;
  private rootTreeNodeJacket: ElementJacket;
  private TreeContainerJacket: ElementJacket;

  public ContentTreeMutationEvent_Subject: ContentTreeMutationEvent_Subject;
  private  ConResolver: ConResolver;

  constructor(apiCore: IAPICore, documentJacket: DocumentJacket, treeContainerJacket: ElementJacket, TreeRootSelector: string) {
    super(apiCore);

    this.ErrorHand.ThrowIfNullOrUndefined(ContentTreeProxy.name, [documentJacket, treeContainerJacket]);
    this.DocumentJacket = documentJacket;
    this.TreeRootSelector = TreeRootSelector;
    this.TreeContainerJacket = treeContainerJacket;

    this.InstantiateInstance();
  }

  private InstantiateInstance() {
    this.ConResolver = new ConResolver(this.ApiCore);
  }

  async Instantiate_TreeProxyAsyncElem(): Promise<void> {
    this.Logger.FuncStart(this.Instantiate_TreeProxyAsyncElem.name);

    try {
      await this.SetRootNodeFromSelector()
        .then(() => {
          this.ContentTreeMutationEvent_Subject = new ContentTreeMutationEvent_Subject(this.ApiCore);
          this.NativeClassNameChangeEvent_Subject = new NativeClassNameChangeEvent_Subject(this.ApiCore, this.TreeContainerJacket);
          this.NativeClassNameChangeEvent_Observer = new NativeClassNameChangeEvent_Observer(this.ApiCore, this.CallBackOnNativeClassNameChangeEventAsync.bind(this));
        })
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.Instantiate_TreeProxyAsyncElem.name, err);
    }

    this.Logger.FuncEnd(this.Instantiate_TreeProxyAsyncElem.name);
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
      this.GetStateOfContentTree()
        .then((stateOfContentTree: IStateOfContentTree) => {
          let TreeMutationEvent_Payload: IContentTreeProxyMutationEvent_Payload = {
            ContentTree: stateOfContentTree
          }

          this.ContentTreeMutationEvent_Subject.NotifyObserversAsync(TreeMutationEvent_Payload)
        })
        .then(() => this.Logger.Log(this.CallBackOnNativeClassNameChangeEventAsync.name + ' completed'))
        .catch((err) => this.ErrorHand.ErrorAndThrow(this.CallBackOnNativeClassNameChangeEventAsync.name, err));
    }

    this.TaskMonitor.AsyncTaskCompleted(this.CallBackOnNativeClassNameChangeEventAsync.name);
    this.Logger.FuncEnd(this.CallBackOnNativeClassNameChangeEventAsync.name);
  }

  public TriggerActiveNodeChangeEvent(): void {
    this.Logger.FuncStart(this.TriggerActiveNodeChangeEvent.name);
    this.CallBackOnNativeClassNameChangeEventAsync(null);
    this.Logger.FuncEnd(this.TriggerActiveNodeChangeEvent.name);
  }

  GetTreeNodeByGlyph(targetNode: IStateOfScContentTreeNodeDeep): Promise<ScContentTreeNodeProxy> {
    return new Promise(async (resolve, reject) => {
      let scContentTreeNodeProxy: ScContentTreeNodeProxy = null;

      if (targetNode && this.TreeContainerJacket) {
        var treeGlyphTargetId: string = ContentConst.Const.Names.SC.TreeGlyphPrefix + Guid.WithoutDashes(targetNode.ItemId);

        await this.TreeContainerJacket.WaitForElement('[id=' + treeGlyphTargetId + ']', this.GetTreeNodeByGlyph.name + ' ' + treeGlyphTargetId)
          .then((elemJacket: ElementJacket) => scContentTreeNodeProxy = new ScContentTreeNodeProxy(this.ApiCore, elemJacket, targetNode.Coord.LevelIndex, targetNode.Coord.SiblingIndex, targetNode.Coord.LevelWidth, null, this.ConResolver))
          .then(() => scContentTreeNodeProxy.Instantiate())
          .then(() => resolve(scContentTreeNodeProxy))
          .catch((err) => reject(this.GetTreeNodeByGlyph.name + ' | ' + err));
      }
    });
  }

  async SetStateOfNodeRecursive(currentNodeData: IStateOfScContentTreeNodeDeep, depth: number): Promise<void> {
    this.Logger.FuncStart(this.SetStateOfNodeRecursive.name, currentNodeData.Friendly);
    try {
      let maxIterDepth: number = 200;

      let targetScContentTreeNodeProxy: ScContentTreeNodeProxy = null;
      let promisesAr: Promise<void>[] = [];

      if (depth > maxIterDepth) {
        this.ErrorHand.ErrorAndThrow(this.SetStateOfNodeRecursive.name, 'Iteration check - max depth exceed. Something is probably wrong');
      }

      if (depth < maxIterDepth && currentNodeData) {
        await this.GetTreeNodeByGlyph(currentNodeData)
          .then((scContentTreeNodeProxy: ScContentTreeNodeProxy) => {
            targetScContentTreeNodeProxy = scContentTreeNodeProxy;
          })
          .then(() => targetScContentTreeNodeProxy.SetStateOfTreeNode(currentNodeData, depth))
          .then(() => {
            if (currentNodeData.NodeChildren.length > 0) {
              currentNodeData.NodeChildren.forEach((nodeChild: IStateOfScContentTreeNodeDeep) =>
                promisesAr.push(this.SetStateOfNodeRecursive(nodeChild, depth + 1))
              )
            }
          })
          .then(() => Promise.all(promisesAr));
      }
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.SetStateOfNodeRecursive.name, err);
    }
    this.Logger.FuncEnd(this.SetStateOfNodeRecursive.name, currentNodeData.Friendly);
  }

  async SetStateOfContentTree(currentNodeData: IStateOfScContentTreeNodeDeep): Promise<void> {
    this.Logger.FuncStart(this.SetStateOfContentTree.name);
    this.TaskMonitor.AsyncTaskStarted(this.SetStateOfContentTree.name);
    try {
      this.ContentTreeMutationEvent_Subject.DisableNotifications();
      await this.SetStateOfNodeRecursive(currentNodeData, 0);
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.SetStateOfContentTree.name, err);
    }

    this.ContentTreeMutationEvent_Subject.EnableNotifications();
    this.TaskMonitor.AsyncTaskCompleted(this.SetStateOfContentTree.name);
    this.Logger.FuncEnd(this.SetStateOfContentTree.name);
  }

  async SetRootNodeFromSelector(): Promise<void> {
    try {
      await this.DocumentJacket.WaitForElem(this.TreeRootSelector)
        .then((elementJacket: ElementJacket) => this.rootTreeNodeJacket = elementJacket);
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.SetRootNodeFromSelector.name, err);
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

  GetStateOfContentTree(): Promise<IStateOfContentTree> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetStateOfContentTree.name);

      let stateOfContentTree: IStateOfContentTree = new DefaultStateOfContentTree();

      this.ErrorHand.ThrowIfNullOrUndefined(this.GetStateOfContentTree.name, [stateOfContentTree]);

      await this.GetStateOfContentTreeNodeDeep()
        .then((result: IStateOfScContentTreeNodeDeep) => stateOfContentTree.ContentTreeNodeDeep = result)
        .then(() => {
          let activeNodeFlat: IStateOfScContentTreeNodeShallow = <IStateOfScContentTreeNodeShallow>this.GetActiveTreeNodeFromAncestorNode(stateOfContentTree.ContentTreeNodeDeep);
          if (activeNodeFlat) {
            stateOfContentTree.ActiveNodeShallow = activeNodeFlat;
          }
        })
        .then(() => resolve(stateOfContentTree))
        .catch((err) => reject(this.GetStateOfContentTree.name + ' | ' + err));

      this.Logger.FuncEnd(this.GetStateOfContentTree.name);
    });
  }

  private GetTreeNodeProxy(): Promise<ScContentTreeNodeProxy> {
    return new Promise(async (resolve, reject) => {
      if (this.DocumentJacket) {
        if (this.rootTreeNodeJacket) {
          var rootParent: ElementJacket = this.rootTreeNodeJacket.parentElement();

          await rootParent.WaitForElement(ContentConst.Const.Selector.SC.ContentEditor.ScContentTreeNodeGlyph, this.GetStateOfContentTreeNodeDeep.name)
            .then(async (firstChildGlyphNode: ElementImgJacket) => {
              this._treeNodeProxy = new ScContentTreeNodeProxy(this.ApiCore, firstChildGlyphNode, 0, 0, 1, null, this.ConResolver)
              await this._treeNodeProxy.Instantiate();
            })
            .catch((err) => reject(this.GetTreeNodeProxy.name + ' | ' + err));
        }
        else {
          this.ErrorHand.ErrorAndThrow(this.GetStateOfContentTreeNodeDeep.name, 'no root node');
        }
      }
      else {
        this.ErrorHand.ErrorAndThrow(this.GetStateOfContentTreeNodeDeep.name, 'no targetDoc');
      }
      resolve(this._treeNodeProxy);
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
        .catch((err) => reject(this.GetStateOfContentTreeNodeDeep.name + ' | ' + err));

      this.Logger.FuncEnd(this.GetStateOfContentTreeNodeDeep.name);
    });
  }
}