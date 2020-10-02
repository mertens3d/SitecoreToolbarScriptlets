import { IterationDrone } from '../../../../../../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone';
import { RecipeBasics } from '../../../../../../Shared/scripts/Classes/RecipeBasics';
import { Guid } from '../../../../../../Shared/scripts/Helpers/Guid';
import { IHindeCore } from "../../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { InitReportTreeProxy } from '../../../../../../Shared/scripts/Interfaces/Agents/InitResultTreeProxy';
import { IDataOneDoc } from '../../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { IStateOfScContentTreeNodeDeep } from '../../../../../../Shared/scripts/Interfaces/Data/States/IStateOfScContentTreeNode';
import { _HindeCoreBase } from '../../../../../../Shared/scripts/LoggableBase';
import { INativeClassNameChangeEvent_Payload } from '../../../Desktop/DesktopProxy/Events/NativeClassNameChangeEvent/INativeClassNameChangeEvent_Payload';
import { NativeClassNameChangeEvent_Subject } from "../../../Desktop/DesktopProxy/Events/NativeClassNameChangeEvent/NativeClassNameChangeEvent_Subject";
import { IContentTreeProxyMutationEvent_Payload } from '../../../Desktop/DesktopProxy/Events/TreeMutationEvent/IContentTreeProxyMutationEvent_Payload';
import { NativeClassNameChangeEvent_Observer } from "../../../Desktop/DesktopProxy/Events/TreeMutationEvent/NativeClassNameChangeEvent_Observer";
import { TreeMutationEvent_Subject } from "../../../Desktop/DesktopProxy/Events/TreeMutationEvent/TreeMutationEvent_Subject";
import { ScContentTreeNodeProxy } from './ScContentTreeNodeProxy/ScContentTreeNodeProxy';
import { ContentConst } from '../../../../../../Shared/scripts/Interfaces/InjectConst';
import { IStateOfContentTree } from '../../../../../../Shared/scripts/Interfaces/Data/States/IStateOfContentTree';
import { DefaultStateOfContentTree } from '../../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfContentTree';
import { IStateOfScContentTreeNodeFlat } from '../../../../../../Shared/scripts/Interfaces/Data/States/IStateOfScContentTreeNodeFlat';
//implements ContentTreeProxy
//ContentTree is the name Sitecore uses
export class ContentTreeProxy extends _HindeCoreBase {
  private _treeNodeProxy: ScContentTreeNodeProxy;
  private AssociatedDoc: IDataOneDoc;
  private initReportTreeProxy: InitReportTreeProxy;
  private NativeClassNameChangeEvent_Observer: NativeClassNameChangeEvent_Observer;
  private NativeClassNameChangeEvent_Subject: NativeClassNameChangeEvent_Subject;
  private RecipeBasics: RecipeBasics;
  private TreeContainerElement: HTMLElement;
  private rootTreeNodeHtmlElement: HTMLElement;

  public TreeMutationEvent_Subject: TreeMutationEvent_Subject;

  constructor(hindeCore: IHindeCore, associatedDoc: IDataOneDoc, treeContainerElement: HTMLElement) {
    super(hindeCore);

    this.ErrorHand.ThrowIfNullOrUndefined(ContentTreeProxy.name, [associatedDoc, treeContainerElement]);
    this.AssociatedDoc = associatedDoc;
    this.TreeContainerElement = treeContainerElement;
    this.RecipeBasics = new RecipeBasics(this.HindeCore);
  }

  async Instantiate_TreeProxy(): Promise<void> {
    this.Logger.FuncStart(this.Instantiate_TreeProxy.name);

    try {
      await this.GetRootNodeForFrameType()
        .then((htmlElement: HTMLElement) => {
          this.rootTreeNodeHtmlElement = htmlElement;

          this.initReportTreeProxy = new InitReportTreeProxy();
          this.initReportTreeProxy.TreeInstantiated = true;

          this.TreeMutationEvent_Subject = new TreeMutationEvent_Subject(this.HindeCore, this.TreeContainerElement);

          this.NativeClassNameChangeEvent_Subject = new NativeClassNameChangeEvent_Subject(this.HindeCore, this.TreeContainerElement);
          this.NativeClassNameChangeEvent_Observer = new NativeClassNameChangeEvent_Observer(this.HindeCore, this.CallBackOnNativeClassNameChangeEventAsync.bind(this));
        })
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.Instantiate_TreeProxy.name, err);
    }

    this.Logger.FuncEnd(this.Instantiate_TreeProxy.name);
  }

  WireEvents_TreeProxy() {
    this.Logger.FuncStart(this.WireEvents_TreeProxy.name);

    this.NativeClassNameChangeEvent_Subject.RegisterObserver(this.NativeClassNameChangeEvent_Observer);

    this.initReportTreeProxy.EventsWired = true;
    this.Logger.FuncEnd(this.WireEvents_TreeProxy.name);
  }

  private CallBackOnNativeClassNameChangeEventAsync(notUsed: INativeClassNameChangeEvent_Payload) {
    this.Logger.FuncStart(this.CallBackOnNativeClassNameChangeEventAsync.name);
    if (this.TreeMutationEvent_Subject) {
      //let stateOfContentTreeNodeDeep: IStateOfScContentTreeNodeDeep = this.GetStateOfContentTreeNodeDeep();

      this.GetStateOfContentTree()
        .then((stateOfContentTree: IStateOfContentTree) => {
          let TreeMutationEvent_Payload: IContentTreeProxyMutationEvent_Payload = {
            StateOfContentTree: stateOfContentTree
          }

          this.TreeMutationEvent_Subject.NotifyObserversAsync(TreeMutationEvent_Payload)
        })
        .then(() => this.Logger.Log(this.CallBackOnNativeClassNameChangeEventAsync.name + ' completed'))
        .catch((err) => this.ErrorHand.ErrorAndThrow(this.CallBackOnNativeClassNameChangeEventAsync.name, err));
    }
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

      if (targetNode && this.TreeContainerElement) {
        var treeGlyphTargetId: string = ContentConst.Const.Names.SC.TreeGlyphPrefix + Guid.WithoutDashes(targetNode.ItemId);

        await this.RecipeBasics.WaitAndReturnFoundFromContainer(this.TreeContainerElement, '[id=' + treeGlyphTargetId + ']', this.GetTreeNodeByGlyph.name + ' ' + treeGlyphTargetId)
          .then((htmlElement: HTMLDivElement) => scContentTreeNodeProxy = new ScContentTreeNodeProxy(this.HindeCore, htmlElement, targetNode.Coord.LevelIndex, targetNode.Coord.SiblingIndex, targetNode.Coord.LevelWidth))
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
            //let treeNodeProxy: ScContentTreeNodeProxy =
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
    try {
      this.TreeMutationEvent_Subject.DisableNotifications();

      let iterHelper: IterationDrone = new IterationDrone(this.HindeCore, this.SetStateOfContentTree.name, true);

      await this.SetStateOfNodeRecursive(currentNodeData, 0);

      //await this.GetTreeNodeProxy()
      //  .then((treeNodeProxy: ScContentTreeNodeProxy) => treeNodeProxy.SetStateOfTreeNode(stateOfContentEditor.StateOfScContentTreeNodeDeep, 0))
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.SetStateOfContentTree.name, err);
    }

    this.TreeMutationEvent_Subject.EnableNotifications();
    this.Logger.FuncEnd(this.SetStateOfContentTree.name);
  }

  //async SetStateOfTreeNode_TreeProxy(dataStateOfTreeNode: IStateOfScContentTreeNodeDeep): Promise<void> {
  //  this.Logger.FuncStart(this.SetStateOfTreeNode_TreeProxy.name, dataStateOfTreeNode.Friendly);

  //  try {
  //    var iterHelper = new IterationDrone(this.HindeCore, this.SetStateOfTreeNode_TreeProxy.name, true);

  //    let treeNodeProxy: ScContentTreeNodeProxy = null;

  //    this.TreeMutationEvent_Subject.DisableNotifications();

  //    while (!treeNodeProxy && iterHelper.DecrementAndKeepGoing()) {
  //      treeNodeProxy = this.GetTreeNodeByGlyph(dataStateOfTreeNode);

  //      if (treeNodeProxy) {
  //        treeNodeProxy.SetStateOfTreeNode(dataStateOfTreeNode, 0);
  //      } else {
  //        await iterHelper.Wait();
  //      }
  //    }
  //  } catch (err) {
  //    throw (this.SetStateOfTreeNode_TreeProxy.name + ' | ' + err);
  //  }

  //  this.TreeMutationEvent_Subject.EnableNotifications();

  //  this.Logger.FuncEnd(this.SetStateOfTreeNode_TreeProxy.name, dataStateOfTreeNode.Friendly);
  //}

  //WalkNodeRecursive(targetNode: HTMLElement, depth: number, itemIndex: number, siblingCount: number): Promise<IStateOfScContentTreeNodeDeep[]> {
  //  return new Promise(async (resolve, reject) => {
  //    let friendly: string = 'depth: ' + depth + ' index: ' + (itemIndex + 1) + ' of: ' + siblingCount + ' total siblings';
  //    this.Logger.FuncStart(this.WalkNodeRecursive.name, friendly);
  //    if (targetNode.id) {
  //      this.Logger.Log('targetNode.id', targetNode.id);
  //    }

  //    var toReturn: IStateOfScContentTreeNodeDeep[] = [];
  //    depth = depth - 1;

  //    let treeNodeProxy: ScContentTreeNodeProxy = null;
  //    let stateOftreeNodeProxy: IStateOfScContentTreeNodeDeep = null;
  //    let childNodePromisesAr: Promise<IStateOfScContentTreeNodeDeep[]>[] = [];

  //    if (targetNode) {
  //      await this.RecipeBasics.WaitAndReturnFoundFromContainer(targetNode, ContentConst.Const.Selector.SC.ContentEditor.ScContentTreeNodeGlyph, this.WalkNodeRecursive.name)
  //        .then(async (firstChildGlyphNode: HTMLImageElement) => treeNodeProxy = new ScContentTreeNodeProxy(this.HindeCore, firstChildGlyphNode, depth, itemIndex, siblingCount))
  //        .then(() => treeNodeProxy.GetStateOfScContentTreeNodeDeep())
  //        .then((stateOfContentTreeNodeProxy: IStateOfScContentTreeNodeDeep) => stateOftreeNodeProxy = stateOfContentTreeNodeProxy)
  //        .then(() => {
  //          if (treeNodeProxy.IsContentTreeNode()) {
  //            if (stateOftreeNodeProxy.IsExpanded || stateOftreeNodeProxy.IsActive) {
  //              this.Logger.LogVal(this.WalkNodeRecursive.name, stateOftreeNodeProxy.FriendlyTreeNode);
  //              toReturn.push(stateOftreeNodeProxy);
  //            }
  //          }
  //        })
  //        .then(() => {
  //          let childNodes = targetNode.querySelectorAll(ContentConst.Const.Selector.SC.ContentEditor.scContentTreeNodeIcon); //targetNode.children;
  //          childNodePromisesAr = [];
  //          childNodes.forEach((oneChild: HTMLElement, index) => childNodePromisesAr.push(this.WalkNodeRecursive(oneChild, depth, index, childNodes.length)));
  //        })
  //        .then(() => Promise.all(childNodePromisesAr))
  //        .then((values: IStateOfScContentTreeNodeDeep[][]) => values.forEach((value: IStateOfScContentTreeNodeDeep[]) => toReturn = toReturn.concat(value)))
  //        .then(() => resolve(toReturn))
  //        .catch((err) => reject(this.WalkNodeRecursive.name + ' | ' + err));
  //    }
  //    this.Logger.FuncEnd(this.WalkNodeRecursive.name, friendly)
  //  });
  //}

  async GetRootNodeForFrameType(): Promise<HTMLElement> {
    try {
      await this.RecipeBasics.WaitForAndReturnFoundElem(this.AssociatedDoc, ContentConst.Const.Selector.SC.ContentEditor.RootAnchorNode)
        .then((htmlElement: HTMLElement) => this.rootTreeNodeHtmlElement = htmlElement);
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.GetRootNodeForFrameType.name, err);
    }

    let toReturn: HTMLElement = this.TreeContainerElement.querySelector(ContentConst.Const.Selector.SC.ContentEditor.RootAnchorNode);
    return toReturn;
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

      await this.GetStateOfContentTreeNodeDeep()
        .then((result: IStateOfScContentTreeNodeDeep) => stateOfContentTree.StateOfScContentTreeNodeDeep = result)
        .then(() => {
          let activeNodeFlat: IStateOfScContentTreeNodeFlat = <IStateOfScContentTreeNodeFlat>this.GetActiveTreeNodeFromAncestorNode(stateOfContentTree.StateOfScContentTreeNodeDeep);
          if (activeNodeFlat) {
            //stateOfContentTree.ActiveNodeCoord = activeNodeFlat.Coord;
            stateOfContentTree.ActiveNodeFlat = activeNodeFlat;
          }
          //this.Logger.LogAsJsonPretty('stateOfTreeProxy', stateOfContentTree);
        })
        .then(() => resolve(stateOfContentTree))
        .catch((err) => reject(this.GetStateOfContentTree.name + ' | ' + err));

      this.Logger.FuncEnd(this.GetStateOfContentTree.name);
    });
  }

  private GetTreeNodeProxy(): Promise<ScContentTreeNodeProxy> {
    return new Promise(async (resolve, reject) => {
      if (this.AssociatedDoc) {
        if (this.rootTreeNodeHtmlElement) {
          var rootParent = this.rootTreeNodeHtmlElement.parentElement;

          await this.RecipeBasics.WaitAndReturnFoundFromContainer(rootParent, ContentConst.Const.Selector.SC.ContentEditor.ScContentTreeNodeGlyph, this.GetStateOfContentTreeNodeDeep.name)
            .then(async (firstChildGlyphNode: HTMLImageElement) => {
              this._treeNodeProxy = new ScContentTreeNodeProxy(this.HindeCore, firstChildGlyphNode, 0, 0, 1)
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