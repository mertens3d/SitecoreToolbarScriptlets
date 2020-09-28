import { IterationDrone } from '../../../../../../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone';
import { DefaultStateOfTree } from "../../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfTree";
import { Guid } from '../../../../../../Shared/scripts/Helpers/Guid';
import { ILoggerAgent } from '../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IContentEditorTreeProxy } from '../../../../../../Shared/scripts/Interfaces/Agents/IOneTreeDrone';
import { IDataOneDoc } from '../../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { IDataStateOfScContentTreeNode } from '../../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfScContentTreeNode';
import { IDataStateOfTree } from '../../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfTree';
import { ContentConst } from '../../../../../../Shared/scripts/Interfaces/InjectConst';
import { LoggableBase } from '../../../../../../Shared/scripts/LoggableBase';
import { TreeMutationEvent_Subject } from '../../../Desktop/DesktopProxy/Events/TreeMutationEvent/TreeMutationEvent_Subject';
import { InitReportTreeProxy } from '../../../../../../Shared/scripts/Interfaces/Agents/InitResultTreeProxy';
import { ScContentTreeNodeProxy } from './ContentEditorTreeNodeProxy/ContentEditorTreeNodeProxy';

export class TreeProxy extends LoggableBase implements IContentEditorTreeProxy {
  private AssociatedDoc: IDataOneDoc;

  TreeMutationEvent_Subject: TreeMutationEvent_Subject;
  private TreeContainerElement: HTMLElement;
  private initReportTreeProxy: InitReportTreeProxy;

  constructor(logger: ILoggerAgent, associatedDoc: IDataOneDoc, treeContainerElement: HTMLElement) {
    super(logger);

    this.AssociatedDoc = associatedDoc;
    this.TreeContainerElement = treeContainerElement;
  }

  async Instantiate_TreeProxy(): Promise<void> {
    this.Logger.FuncStart(this.Instantiate_TreeProxy.name);

    try {
      this.initReportTreeProxy = new InitReportTreeProxy();
      this.initReportTreeProxy.TreeInstantiated = true;
      this.TreeMutationEvent_Subject = new TreeMutationEvent_Subject(this.Logger, this.TreeContainerElement);

      this.Logger.FuncEnd(this.Instantiate_TreeProxy.name);
    } catch (err) {
      this.Logger.ErrorAndThrow(this.Instantiate_TreeProxy.name, err);
    }

    this.Logger.FuncEnd(this.Instantiate_TreeProxy.name);
  }

  WireEvents_TreeProxy() {
    this.Logger.FuncStart(this.WireEvents_TreeProxy.name);
    this.initReportTreeProxy.EventsWired = true;

    this.Logger.FuncEnd(this.WireEvents_TreeProxy.name);
  }

  GetTreeNodeByGlyph(targetNode: IDataStateOfScContentTreeNode): ScContentTreeNodeProxy {
    let toReturn: ScContentTreeNodeProxy = null;

    if (targetNode && this.TreeContainerElement) {
      var treeGlyphTargetId: string = ContentConst.Const.Names.SC.TreeGlyphPrefix + Guid.WithoutDashes(targetNode.ItemId);
      var foundOnPageTreeGlyph: HTMLImageElement = <HTMLImageElement>this.TreeContainerElement.querySelector('[id=' + treeGlyphTargetId + ']');

      if (foundOnPageTreeGlyph) {
        toReturn = new ScContentTreeNodeProxy(this.Logger, foundOnPageTreeGlyph);
      }
    }
    return toReturn;
  }

  async SetStateOfTree(stateOfContentEditor: IDataStateOfTree): Promise<void> {
    this.Logger.FuncStart(this.SetStateOfTree.name);
    try {
      this.TreeMutationEvent_Subject.DisableNotifications();

      let iterHelper: IterationDrone = new IterationDrone(this.Logger, this.SetStateOfTree.name, true);

      while (stateOfContentEditor.StateOfTreeNodes.length > 0 && iterHelper.DecrementAndKeepGoing()) {
        var nextNode: IDataStateOfScContentTreeNode = stateOfContentEditor.StateOfTreeNodes.shift();
        await this.SetStateOfTreeNode_TreeProxy(nextNode);
      }
    } catch (err) {
      this.Logger.ErrorAndThrow(this.SetStateOfTree.name, err);
    }
    this.TreeMutationEvent_Subject.EnableNotifications();
    this.Logger.FuncEnd(this.SetStateOfTree.name);
  }

  async SetStateOfTreeNode_TreeProxy(dataStateOfTreeNode: IDataStateOfScContentTreeNode): Promise<void> {
    this.Logger.FuncStart(this.SetStateOfTreeNode_TreeProxy.name);

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

    this.Logger.FuncEnd(this.SetStateOfTreeNode_TreeProxy.name);
  }

  WalkNodeRecursive(targetNode: HTMLElement, depth: number): IDataStateOfScContentTreeNode[] {
    var toReturn: IDataStateOfScContentTreeNode[] = [];
    depth = depth - 1;

    if (targetNode) {
      var firstChildGlyphNode: HTMLImageElement = <HTMLImageElement>targetNode.querySelector(ContentConst.Const.Selector.SC.ContentEditor.ContentTreeNodeGlyph);
      if (firstChildGlyphNode) {
        let treeNodeProxy = new ScContentTreeNodeProxy(this.Logger, firstChildGlyphNode);

        if (treeNodeProxy.IsContentTreeNode()) {
          if (treeNodeProxy.QueryIsExpanded() || treeNodeProxy.QueryIsActive()) {
            let newData: IDataStateOfScContentTreeNode = treeNodeProxy.GetStateOfScContentTreeNode();
            toReturn.push(newData);
          }
        }
      }

      var childNodes: HTMLCollection = targetNode.children;
      if (childNodes && childNodes.length > 0 && depth > 0) {
        for (var jdx = 0; jdx < childNodes.length; jdx++) {
          var oneChild = <HTMLElement>childNodes[jdx];
          toReturn = toReturn.concat(this.WalkNodeRecursive(oneChild, depth));
        }
      }
    }
    return toReturn;
  }

  GetRootNodeForFrameType(): HTMLElement {
    let toReturn: HTMLElement = this.TreeContainerElement.querySelector(ContentConst.Const.Selector.SC.ContentEditor.RootAnchorNode);
    return toReturn;
  }

  GetStateOfTree(): IDataStateOfTree {
    let toReturnOneTreeState: IDataStateOfTree = new DefaultStateOfTree();
    try {
      toReturnOneTreeState.StateOfTreeNodes = this.GetStateOfTreeNodes();
      toReturnOneTreeState.ActiveTreeNodeIndex = null;
      toReturnOneTreeState.ActiveTreeNodeIndex = this.GetActiveNode(toReturnOneTreeState.StateOfTreeNodes);
    } catch (err) {
      throw (this.GetStateOfTree.name + ' | ' + err);
    }
    return toReturnOneTreeState;
  }

  GetActiveNode(allTreeNodeAr: IDataStateOfScContentTreeNode[]) {
    let toReturn: number = -1;
    if (allTreeNodeAr) {
      for (var idx = 0; idx < allTreeNodeAr.length; idx++) {
        let candidate: IDataStateOfScContentTreeNode = allTreeNodeAr[idx];
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

  private GetStateOfTreeNodes(): IDataStateOfScContentTreeNode[] {
    var toReturn: IDataStateOfScContentTreeNode[] = [];

    if (this.AssociatedDoc) {
      var rootNode: HTMLElement = this.GetRootNodeForFrameType();

      if (rootNode) {
        var rootParent = rootNode.parentElement;
        toReturn = this.WalkNodeRecursive(rootParent, ContentConst.Const.MaxIter);
      }
      else {
        this.Logger.ErrorAndThrow(this.GetStateOfTreeNodes.name, 'no root node');
      }
    }
    else {
      this.Logger.ErrorAndThrow(this.GetStateOfTreeNodes.name, 'no targetDoc');
    }

    return toReturn;
  }
}