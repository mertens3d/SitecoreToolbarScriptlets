import { IterationDrone } from '../../../../../../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone';
import { RecipeBasics } from '../../../../../../Shared/scripts/Classes/RecipeBasics';
import { Guid } from '../../../../../../Shared/scripts/Helpers/Guid';
import { ILoggerAgent } from '../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { InitReportTreeProxy } from '../../../../../../Shared/scripts/Interfaces/Agents/InitResultTreeProxy';
import { IContentTreeProxy } from '../../../../../../Shared/scripts/Interfaces/Agents/IContentTreeProxy';
import { IDataOneDoc } from '../../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { IStateOfScContentTreeNodeDeep } from '../../../../../../Shared/scripts/Interfaces/Data/States/IStateOfScContentTreeNode';
import { LoggableBase } from '../../../../../../Shared/scripts/LoggableBase';
import { INativeClassNameChangeEvent_Payload } from '../../../Desktop/DesktopProxy/Events/NativeClassNameChangeEvent/INativeClassNameChangeEvent_Payload';
import { NativeClassNameChangeEvent_Subject } from "../../../Desktop/DesktopProxy/Events/NativeClassNameChangeEvent/NativeClassNameChangeEvent_Subject";
import { IContentTreeProxyMutationEvent_Payload } from '../../../Desktop/DesktopProxy/Events/TreeMutationEvent/IContentTreeProxyMutationEvent_Payload';
import { NativeClassNameChangeEvent_Observer } from "../../../Desktop/DesktopProxy/Events/TreeMutationEvent/NativeClassNameChangeEvent_Observer";
import { TreeMutationEvent_Subject } from "../../../Desktop/DesktopProxy/Events/TreeMutationEvent/TreeMutationEvent_Subject";
import { ScContentTreeNodeProxy } from './ScContentTreeNodeProxy/ScContentTreeNodeProxy';
import { ContentConst } from '../../../../../../Shared/scripts/Interfaces/InjectConst';
import { IStateOfContentTree } from '../../../../../../Shared/scripts/Interfaces/Data/States/IStateOfContentTree';
import { DefaultStateOfContentTree } from '../../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfContentTree';

//ContentTree is the name Sitecore uses
export class ContentTreeProxy extends LoggableBase implements IContentTreeProxy {
  NativeClassNameChangeEvent_Observer: NativeClassNameChangeEvent_Observer;
  NativeClassNameChangeEvent_Subject: NativeClassNameChangeEvent_Subject;
  private AssociatedDoc: IDataOneDoc;
  private initReportTreeProxy: InitReportTreeProxy;
  private TreeContainerElement: HTMLElement;
  RecipeBasics: RecipeBasics;

  public TreeMutationEvent_Subject: TreeMutationEvent_Subject;

  constructor(logger: ILoggerAgent, associatedDoc: IDataOneDoc, treeContainerElement: HTMLElement) {
    super(logger);

    this.Logger.ThrowIfNullOrUndefined(ContentTreeProxy.name, [associatedDoc, treeContainerElement]);
    this.AssociatedDoc = associatedDoc;
    this.TreeContainerElement = treeContainerElement;
    this.RecipeBasics = new RecipeBasics(this.Logger);
  }

  async Instantiate_TreeProxy(): Promise<void> {
    this.Logger.FuncStart(this.Instantiate_TreeProxy.name);

    try {
      this.initReportTreeProxy = new InitReportTreeProxy();
      this.initReportTreeProxy.TreeInstantiated = true;

      this.TreeMutationEvent_Subject = new TreeMutationEvent_Subject(this.Logger, this.TreeContainerElement);

      this.NativeClassNameChangeEvent_Subject = new NativeClassNameChangeEvent_Subject(this.Logger, this.TreeContainerElement);
      this.NativeClassNameChangeEvent_Observer = new NativeClassNameChangeEvent_Observer(this.Logger, this.CallBackOnNativeClassNameChangeEvent.bind(this));
    } catch (err) {
      this.Logger.ErrorAndThrow(this.Instantiate_TreeProxy.name, err);
    }

    this.Logger.FuncEnd(this.Instantiate_TreeProxy.name);
  }

  WireEvents_TreeProxy() {
    this.Logger.FuncStart(this.WireEvents_TreeProxy.name);

    this.NativeClassNameChangeEvent_Subject.RegisterObserver(this.NativeClassNameChangeEvent_Observer);

    this.initReportTreeProxy.EventsWired = true;
    this.Logger.FuncEnd(this.WireEvents_TreeProxy.name);
  }

  private CallBackOnNativeClassNameChangeEvent(NativeClassNameChangeEvent_Payload: INativeClassNameChangeEvent_Payload) {
    this.Logger.FuncStart(this.CallBackOnNativeClassNameChangeEvent.name);
    if (this.TreeMutationEvent_Subject) {
      let TreeMutationEvent_Payload: IContentTreeProxyMutationEvent_Payload = {
        //ActiveNode: NativeClassNameChangeEvent_Payload.ActiveNode,
        //MutatedElement: NativeClassNameChangeEvent_Payload.MutatedElement,
        //OwnerContentEditorProxy: NativeClassNameChangeEvent_Payload.OwnerContentEditorProxy,
        StateOfContentTree: NativeClassNameChangeEvent_Payload.StateOfContentEditorTreeProxy
      }

      this.TreeMutationEvent_Subject.NotifyObservers(TreeMutationEvent_Payload)
    }
    this.Logger.FuncEnd(this.CallBackOnNativeClassNameChangeEvent.name);
  }

  GetTreeNodeByGlyph(targetNode: IStateOfScContentTreeNodeDeep): ScContentTreeNodeProxy {
    let toReturn: ScContentTreeNodeProxy = null;

    if (targetNode && this.TreeContainerElement) {
      var treeGlyphTargetId: string = ContentConst.Const.Names.SC.TreeGlyphPrefix + Guid.WithoutDashes(targetNode.ItemId);
      var foundOnPageTreeGlyph: HTMLImageElement = <HTMLImageElement>this.TreeContainerElement.querySelector('[id=' + treeGlyphTargetId + ']');

      if (foundOnPageTreeGlyph) {
        toReturn = new ScContentTreeNodeProxy(this.Logger, foundOnPageTreeGlyph, 0, 0, 1);
      }
    }
    return toReturn;
  }

  async SetStateOfContentTree(stateOfContentEditor: IStateOfContentTree): Promise<void> {
    this.Logger.FuncStart(this.SetStateOfContentTree.name);
    try {
      this.TreeMutationEvent_Subject.DisableNotifications();

      let iterHelper: IterationDrone = new IterationDrone(this.Logger, this.SetStateOfContentTree.name, true);

      //todo - put back let promises = stateOfContentEditor.StateOfTreeNodes.map(async treeNode => {
      //  const numFruit = await this.SetStateOfTreeNode_TreeProxy(treeNode);
      //  return numFruit;
      //})

      //await Promise.all(promises);
    } catch (err) {
      this.Logger.ErrorAndThrow(this.SetStateOfContentTree.name, err);
    }

    this.TreeMutationEvent_Subject.EnableNotifications();
    this.Logger.FuncEnd(this.SetStateOfContentTree.name);
  }

  async SetStateOfTreeNode_TreeProxy(dataStateOfTreeNode: IStateOfScContentTreeNodeDeep): Promise<void> {
    this.Logger.FuncStart(this.SetStateOfTreeNode_TreeProxy.name, dataStateOfTreeNode.FriendlyTreeNode);

    try {
      var iterHelper = new IterationDrone(this.Logger, this.SetStateOfTreeNode_TreeProxy.name, true);

      let treeNodeProxy: ScContentTreeNodeProxy = null;

      this.TreeMutationEvent_Subject.DisableNotifications();

      while (!treeNodeProxy && iterHelper.DecrementAndKeepGoing()) {
        treeNodeProxy = this.GetTreeNodeByGlyph(dataStateOfTreeNode);

        if (treeNodeProxy) {
          treeNodeProxy.SetStateOfTreeNode(dataStateOfTreeNode);
        } else {
          await iterHelper.Wait();
        }
      }
    } catch (err) {
      throw (this.SetStateOfTreeNode_TreeProxy.name + ' | ' + err);
    }

    this.TreeMutationEvent_Subject.EnableNotifications();

    this.Logger.FuncEnd(this.SetStateOfTreeNode_TreeProxy.name, dataStateOfTreeNode.FriendlyTreeNode);
  }

  WalkNodeRecursive(targetNode: HTMLElement, depth: number, itemIndex: number, siblingCount: number): Promise<IStateOfScContentTreeNodeDeep[]> {
    return new Promise(async (resolve, reject) => {
      let friendly: string = 'depth: ' + depth + ' index: ' + (itemIndex + 1) + ' of: ' + siblingCount + ' total siblings';
      this.Logger.FuncStart(this.WalkNodeRecursive.name, friendly);
      if (targetNode.id) {
        this.Logger.Log('targetNode.id', targetNode.id);
      }

      var toReturn: IStateOfScContentTreeNodeDeep[] = [];
      depth = depth - 1;

      let treeNodeProxy: ScContentTreeNodeProxy = null;
      let stateOftreeNodeProxy: IStateOfScContentTreeNodeDeep = null;
      let childNodePromisesAr: Promise<IStateOfScContentTreeNodeDeep[]>[] = [];

      if (targetNode) {
        await this.RecipeBasics.WaitAndReturnFoundFromContainer(targetNode, ContentConst.Const.Selector.SC.ContentEditor.ScContentTreeNodeGlyph, this.WalkNodeRecursive.name)
          .then(async (firstChildGlyphNode: HTMLImageElement) => treeNodeProxy = new ScContentTreeNodeProxy(this.Logger, firstChildGlyphNode, depth, itemIndex, siblingCount))
          .then(() => treeNodeProxy.GetStateOfScContentTreeNodeDeep())
          .then((stateOfContentTreeNodeProxy: IStateOfScContentTreeNodeDeep) => stateOftreeNodeProxy = stateOfContentTreeNodeProxy)
          .then(() => {
            if (treeNodeProxy.IsContentTreeNode()) {
              if (stateOftreeNodeProxy.IsExpanded || stateOftreeNodeProxy.IsActive) {
                this.Logger.LogVal(this.WalkNodeRecursive.name, stateOftreeNodeProxy.FriendlyTreeNode);
                toReturn.push(stateOftreeNodeProxy);
              }
            }
          })
          .then(() => {
            let childNodes = targetNode.querySelectorAll(ContentConst.Const.Selector.SC.ContentEditor.scContentTreeNodeIcon); //targetNode.children;
            childNodePromisesAr = [];
            childNodes.forEach((oneChild: HTMLElement, index) => childNodePromisesAr.push(this.WalkNodeRecursive(oneChild, depth, index, childNodes.length)));
          })
          .then(() => Promise.all(childNodePromisesAr))
          .then((values: IStateOfScContentTreeNodeDeep[][]) => values.forEach((value: IStateOfScContentTreeNodeDeep[]) => toReturn = toReturn.concat(value)))
          .then(() => resolve(toReturn))
          .catch((err) => reject(this.WalkNodeRecursive.name + ' | ' + err));
      }
      this.Logger.FuncEnd(this.WalkNodeRecursive.name, friendly)
    });
  }

  GetRootNodeForFrameType(): HTMLElement {
    let toReturn: HTMLElement = this.TreeContainerElement.querySelector(ContentConst.Const.Selector.SC.ContentEditor.RootAnchorNode);
    return toReturn;
  }

  GetActiveTreeNodeFromAncestorNode(stateOfScContentTreeNodeDeep: IStateOfScContentTreeNodeDeep): IStateOfScContentTreeNodeDeep {
    this.Logger.FuncStart(this.GetActiveTreeNodeFromAncestorNode.name,)
    let foundNode: IStateOfScContentTreeNodeDeep = null;
    if (stateOfScContentTreeNodeDeep.IsActive) {
      foundNode = stateOfScContentTreeNodeDeep;
    } else {
      stateOfScContentTreeNodeDeep.TreeNodeChildren.forEach((child: IStateOfScContentTreeNodeDeep) => {
        let candidate = this.GetActiveTreeNodeFromAncestorNode(child);
        if (candidate !== null) {
          foundNode = candidate;
        }
      })
    }
    this.Logger.FuncEnd(this.GetActiveTreeNodeFromAncestorNode.name, (foundNode !== null).toString())
    return foundNode;
  }
  GetStateOfContentTree(): Promise<IStateOfContentTree> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetStateOfContentTree.name);

      let stateOfContentTree: IStateOfContentTree = new DefaultStateOfContentTree();

      await this.GetStateOfContentTreeNodesDeep()
        .then((result: IStateOfScContentTreeNodeDeep) => stateOfContentTree.StateOfScContentTreeNode = result)
        .then(() => {
          let activeNode = this.GetActiveTreeNodeFromAncestorNode(stateOfContentTree.StateOfScContentTreeNode);
          if (activeNode) {
            stateOfContentTree.ActiveNodeCoord = activeNode.Coord;
          }
          this.Logger.LogAsJsonPretty('stateOfTreeProxy', stateOfContentTree);
        })
        .then(() => resolve(stateOfContentTree))
        .catch((err) => reject(this.GetStateOfContentTree.name + ' | ' + err));

      this.Logger.FuncEnd(this.GetStateOfContentTree.name);
    });
  }

  GetActiveNode(allTreeNodeAr: IStateOfScContentTreeNodeDeep[]) {
    let toReturn: number = -1;
    if (allTreeNodeAr) {
      for (var idx = 0; idx < allTreeNodeAr.length; idx++) {
        let candidate: IStateOfScContentTreeNodeDeep = allTreeNodeAr[idx];
        if (candidate.IsActive) {
          toReturn = idx;
          break;
        }
      }
    } else {
      this.Logger.ErrorAndThrow(this.GetActiveNode.name, 'No tree data provided');
    }

    return toReturn;
  }

  private GetStateOfContentTreeNodesDeep(): Promise<IStateOfScContentTreeNodeDeep> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetStateOfContentTreeNodesDeep.name);
      var toReturn: IStateOfScContentTreeNodeDeep[] = [];

      if (this.AssociatedDoc) {
        var rootTreeNodeHtmlElement: HTMLElement = this.GetRootNodeForFrameType();
        let treeNodeProxy: ScContentTreeNodeProxy;
        if (rootTreeNodeHtmlElement) {
          var rootParent = rootTreeNodeHtmlElement.parentElement;

          await this.RecipeBasics.WaitAndReturnFoundFromContainer(rootParent, ContentConst.Const.Selector.SC.ContentEditor.ScContentTreeNodeGlyph, this.GetStateOfContentTreeNodesDeep.name)
            .then(async (firstChildGlyphNode: HTMLImageElement) => {
              treeNodeProxy = new ScContentTreeNodeProxy(this.Logger, firstChildGlyphNode, 0, 0, 1)
              if (treeNodeProxy) {
                this.Logger.Log('root found');
              }
            })
            .then(() => treeNodeProxy.GetStateOfScContentTreeNodeDeep())
            .then((stateOfScContentTreeNodeProxy: IStateOfScContentTreeNodeDeep) => {
              resolve(stateOfScContentTreeNodeProxy)
            });

          //await this.WalkNodeRecursive(rootParent, ContentConst.Const.MaxIter, 0, 1)
          //  .then((results: IStateOfScContentTreeNodeProxy[]) => {
          //    resolve(results)
          //  })
          //  .catch((err) => reject(this.GetStateOfContentTreeNodes.name + ' | ' + err));
        }
        else {
          this.Logger.ErrorAndThrow(this.GetStateOfContentTreeNodesDeep.name, 'no root node');
        }
      }
      else {
        this.Logger.ErrorAndThrow(this.GetStateOfContentTreeNodesDeep.name, 'no targetDoc');
      }
      this.Logger.FuncEnd(this.GetStateOfContentTreeNodesDeep.name);
    });
  }
}