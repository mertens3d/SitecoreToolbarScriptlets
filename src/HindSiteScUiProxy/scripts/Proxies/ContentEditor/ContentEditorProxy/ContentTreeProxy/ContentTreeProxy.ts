import { IterationDrone } from '../../../../../../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone';
import { RecipeBasics } from '../../../../../../Shared/scripts/Classes/RecipeBasics';
import { Guid } from '../../../../../../Shared/scripts/Helpers/Guid';
import { ILoggerAgent } from '../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { InitReportTreeProxy } from '../../../../../../Shared/scripts/Interfaces/Agents/InitResultTreeProxy';
import { IContentTreeProxy } from '../../../../../../Shared/scripts/Interfaces/Agents/IContentTreeProxy';
import { IDataOneDoc } from '../../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { IStateOfScContentTreeNode } from '../../../../../../Shared/scripts/Interfaces/Data/States/IStateOfScContentTreeNode';
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

  GetTreeNodeByGlyph(targetNode: IStateOfScContentTreeNode): ScContentTreeNodeProxy {
    let toReturn: ScContentTreeNodeProxy = null;

    if (targetNode && this.TreeContainerElement) {
      var treeGlyphTargetId: string = ContentConst.Const.Names.SC.TreeGlyphPrefix + Guid.WithoutDashes(targetNode.ItemId);
      var foundOnPageTreeGlyph: HTMLImageElement = <HTMLImageElement>this.TreeContainerElement.querySelector('[id=' + treeGlyphTargetId + ']');

      if (foundOnPageTreeGlyph) {
        toReturn = new ScContentTreeNodeProxy(this.Logger, foundOnPageTreeGlyph,0,0,1);
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

  async SetStateOfTreeNode_TreeProxy(dataStateOfTreeNode: IStateOfScContentTreeNode): Promise<void> {
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

  WalkNodeRecursive(targetNode: HTMLElement, depth: number, itemIndex: number, siblingCount: number): Promise<IStateOfScContentTreeNode[]> {
    return new Promise(async (resolve, reject) => {
      let friendly: string = 'depth: ' + depth + ' index: ' + (itemIndex + 1) + ' of: ' + siblingCount + ' total siblings';
      this.Logger.FuncStart(this.WalkNodeRecursive.name, friendly);
      if (targetNode.id) {
        this.Logger.Log('targetNode.id', targetNode.id);
      }

      var toReturn: IStateOfScContentTreeNode[] = [];
      depth = depth - 1;

      let treeNodeProxy: ScContentTreeNodeProxy = null;
      let stateOftreeNodeProxy: IStateOfScContentTreeNode = null;
      let childNodePromisesAr: Promise<IStateOfScContentTreeNode[]>[] = [];

      if (targetNode) {
        await this.RecipeBasics.WaitAndReturnFoundFromContainer(targetNode, ContentConst.Const.Selector.SC.ContentEditor.ScContentTreeNodeGlyph, this.WalkNodeRecursive.name)
          .then(async (firstChildGlyphNode: HTMLImageElement) => treeNodeProxy = new ScContentTreeNodeProxy(this.Logger, firstChildGlyphNode, depth, itemIndex, siblingCount))
          .then(() => treeNodeProxy.GetStateOfScContentTreeNode())
          .then((stateOfContentTreeNodeProxy: IStateOfScContentTreeNode) => stateOftreeNodeProxy = stateOfContentTreeNodeProxy)
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
          .then((values: IStateOfScContentTreeNode[][]) => values.forEach((value: IStateOfScContentTreeNode[]) => toReturn = toReturn.concat(value)))
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

  GetActiveTreeNodeFromAncestorNode(stateOfScContentTreeNodeProxy: IStateOfScContentTreeNode) {
    let foundNode: IStateOfScContentTreeNode = null;
    if (stateOfScContentTreeNodeProxy.IsActive) {
      foundNode = stateOfScContentTreeNodeProxy;
    } else {
      stateOfScContentTreeNodeProxy.Children.forEach((child: IStateOfScContentTreeNode) => {
        let candidate = this.GetActiveTreeNodeFromAncestorNode(child);
        if (candidate! = null) {
          foundNode = candidate;
        }
      })

      return foundNode;
    }

    return foundNode;
  }
  GetStateOfContentTree(): Promise<IStateOfContentTree> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetStateOfContentTree.name);

      let stateOfContentTreeProxy: IStateOfContentTree = new DefaultStateOfContentTree();

      await this.GetStateOfContentTreeNodes()
        .then((result: IStateOfScContentTreeNode) => stateOfContentTreeProxy.StateOfScContentTreeNodeProxy = result)
        .then(() => {

          let activeNode = this.GetActiveTreeNodeFromAncestorNode(stateOfContentTreeProxy.StateOfScContentTreeNodeProxy);
          if (activeNode) {
            stateOfContentTreeProxy.ActiveNodeCoord.SiblingIndex = activeNode.Coord.LevelWidth;
            stateOfContentTreeProxy.ActiveNodeCoord.LevelIndex = activeNode.Coord.LevelIndex;
          }
          this.Logger.LogAsJsonPretty('stateOfTreeProxy', stateOfContentTreeProxy);
        })
        .then(() => resolve(stateOfContentTreeProxy))
        .catch((err) => reject(this.GetStateOfContentTree.name + ' | ' + err));

      this.Logger.FuncEnd(this.GetStateOfContentTree.name);
    });
  }

  GetActiveNode(allTreeNodeAr: IStateOfScContentTreeNode[]) {
    let toReturn: number = -1;
    if (allTreeNodeAr) {
      for (var idx = 0; idx < allTreeNodeAr.length; idx++) {
        let candidate: IStateOfScContentTreeNode = allTreeNodeAr[idx];
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

  private GetStateOfContentTreeNodes(): Promise<IStateOfScContentTreeNode> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetStateOfContentTreeNodes.name);
      var toReturn: IStateOfScContentTreeNode[] = [];

      if (this.AssociatedDoc) {
        var rootTreeNodeHtmlElement: HTMLElement = this.GetRootNodeForFrameType();
        let treeNodeProxy: ScContentTreeNodeProxy;
        if (rootTreeNodeHtmlElement) {
          var rootParent = rootTreeNodeHtmlElement.parentElement;

          await this.RecipeBasics.WaitAndReturnFoundFromContainer(rootParent, ContentConst.Const.Selector.SC.ContentEditor.ScContentTreeNodeGlyph, this.GetStateOfContentTreeNodes.name)
            .then(async (firstChildGlyphNode: HTMLImageElement) => {
              treeNodeProxy = new ScContentTreeNodeProxy(this.Logger, firstChildGlyphNode, 0,0,1)
              if (treeNodeProxy) {
                this.Logger.Log('root found');
              }
            })
            .then(() => treeNodeProxy.GetStateOfScContentTreeNode())
            .then((stateOfScContentTreeNodeProxy: IStateOfScContentTreeNode) => {
             
              
              resolve(stateOfScContentTreeNodeProxy)

            });

          //await this.WalkNodeRecursive(rootParent, ContentConst.Const.MaxIter, 0, 1)
          //  .then((results: IStateOfScContentTreeNodeProxy[]) => {
          //    resolve(results)
          //  })
          //  .catch((err) => reject(this.GetStateOfContentTreeNodes.name + ' | ' + err));
        }
        else {
          this.Logger.ErrorAndThrow(this.GetStateOfContentTreeNodes.name, 'no root node');
        }
      }
      else {
        this.Logger.ErrorAndThrow(this.GetStateOfContentTreeNodes.name, 'no targetDoc');
      }
      this.Logger.FuncEnd(this.GetStateOfContentTreeNodes.name);
    });
  }
}