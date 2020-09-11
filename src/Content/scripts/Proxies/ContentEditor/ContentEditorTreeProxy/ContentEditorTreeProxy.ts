import { IterationDrone } from '../../../../../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone';
import { SettingKey } from '../../../../../Shared/scripts/Enums/3xxx-SettingKey';
import { Guid } from '../../../../../Shared/scripts/Helpers/Guid';
import { ILoggerAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IContentEditorTreeProxy } from '../../../../../Shared/scripts/Interfaces/Agents/IOneTreeDrone';
import { ISettingsAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { IDataOneDoc } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { IDataStateOfContentEditor } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneStorageOneTreeState';
import { IDataStateOfTreeNode } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneTreeNode';
import { ContentConst } from '../../../../../Shared/scripts/Interfaces/InjectConst';
import { LoggableBase } from '../../../Managers/LoggableBase';
import { Subject_ContentEditorTreeMutatedEvent } from '../../Desktop/DesktopProxy/Events/ContentEditorTreeMutatedEvent/Subject_ContentEditorTreeMutatedEvent';
import { TreeNodeProxy } from '../ContentEditorTreeNodeProxy/ContentEditorTreeNodeProxy';
import { IDataStateOfTree } from '../../../../../Shared/scripts/Interfaces/Data/iDataTreeState';

export class ContentEditorTreeProxy extends LoggableBase implements IContentEditorTreeProxy {
  private AssociatedDoc: IDataOneDoc;
  private MutationCallbacks: Function[] = [];
  private SettingsAgent: ISettingsAgent;
  private __treeHolderElem: HTMLElement;

  TreeMutationEvent: Subject_ContentEditorTreeMutatedEvent;
  private HostIframeId: string;

  constructor(logger: ILoggerAgent, associatedDoc: IDataOneDoc, settingsAgent: ISettingsAgent, hostIframeId: string) {
    super(logger);

    this.Logger.InstantiateStart(ContentEditorTreeProxy.name);

    this.AssociatedDoc = associatedDoc;
    this.SettingsAgent = settingsAgent;
    this.HostIframeId = hostIframeId;

    this.InitCeTreeProxy();

    this.Logger.InstantiateEnd(ContentEditorTreeProxy.name);
  }

  private GetTreeHolderElem(): HTMLElement {
    if (!this.__treeHolderElem) {
      this.__treeHolderElem = this.AssociatedDoc.ContentDoc.querySelector(ContentConst.Const.Selector.SC.Desktop.ContentTreeHolder);
    }
    return this.__treeHolderElem
  }

  private InitCeTreeProxy() {
    this.Logger.FuncStart(this.InitCeTreeProxy.name);

    let setting = this.SettingsAgent.GetByKey(SettingKey.AutoRenameCeButton);
    if (setting && setting.ValueAsBool()) {
      this.TreeMutationEvent = new Subject_ContentEditorTreeMutatedEvent(this.Logger, this.GetTreeHolderElem(), this.HostIframeId, this.AssociatedDoc);
    }

    this.Logger.FuncEnd(this.InitCeTreeProxy.name);
  }

  AddListenerToTreeMutationEvent(callback: Function) {
    this.Logger.FuncStart(this.AddListenerToTreeMutationEvent.name);

    this.TreeMutationEvent.RegisterObserver(callback);
    this.MutationCallbacks.push(callback);
    this.Logger.FuncEnd(this.AddListenerToTreeMutationEvent.name);
  }

  GetTreeNodeByGlyph(targetNode: IDataStateOfTreeNode): TreeNodeProxy {
    this.Logger.FuncStart(this.GetTreeNodeByGlyph.name)
    let toReturn: TreeNodeProxy = null;

    if (targetNode && this.AssociatedDoc) {
      var treeGlyphTargetId: string = ContentConst.Const.Names.SC.TreeGlyphPrefix + Guid.WithoutDashes(targetNode.NodeId);

      this.Logger.Log('looking for: (' + targetNode.NodeFriendly + ')' + treeGlyphTargetId + ' in ' + Guid.AsShort(this.AssociatedDoc.DocId));

      var foundOnPageTreeGlyph: HTMLImageElement = <HTMLImageElement>this.AssociatedDoc.ContentDoc.getElementById(treeGlyphTargetId);
      var test: HTMLImageElement = <HTMLImageElement>this.AssociatedDoc.ContentDoc.querySelector('[id=' + treeGlyphTargetId + ']');

      if (foundOnPageTreeGlyph) {
        toReturn = new TreeNodeProxy(this.Logger, this.AssociatedDoc, foundOnPageTreeGlyph);
        this.Logger.Log('Found it ' + toReturn.GetNodeLinkText());
      } else {
        this.Logger.Log('Not Found');
      }
    }
    this.Logger.FuncEnd(this.GetTreeNodeByGlyph.name);
    return toReturn;
  }

  async SetStateOfTree(stateOfContentEditor: IDataStateOfTree) {
    this.Logger.FuncStart(this.SetStateOfTree.name);

    let iterHelper: IterationDrone = new IterationDrone(this.Logger, this.SetStateOfTree.name);

    while (stateOfContentEditor.AllTreeNodeAr.length > 0 && iterHelper.DecrementAndKeepGoing()) {
      var nextNode: IDataStateOfTreeNode = stateOfContentEditor.AllTreeNodeAr.shift();

      await this.SetStateOfTreeNode(nextNode);
    }

    this.Logger.FuncEnd(this.SetStateOfTree.name);
  }

  async SetStateOfTreeNode(dataStateOfTreeNode: IDataStateOfTreeNode): Promise<void> {
    this.Logger.FuncStart(this.SetStateOfTreeNode.name);

    try {
      var iterHelper = new IterationDrone(this.Logger, this.SetStateOfTreeNode.name);

      let treeNodeProxy: TreeNodeProxy = null;

      while (!treeNodeProxy && iterHelper.DecrementAndKeepGoing()) {
        treeNodeProxy = this.GetTreeNodeByGlyph(dataStateOfTreeNode);

        if (treeNodeProxy) {
          treeNodeProxy.SetStateOfTreeNode(dataStateOfTreeNode);
        } else {
          this.Logger.Log('not Found...waiting: ');
          await iterHelper.Wait();
        }
      }
    } catch (err) {
      throw (this.SetStateOfTreeNode.name + ' | ' + err);
    }
    this.Logger.FuncEnd(this.SetStateOfTreeNode.name);
  }

  WalkNodeRecursive(targetNode: HTMLElement, depth: number): IDataStateOfTreeNode[] {
    var toReturn: IDataStateOfTreeNode[] = [];
    depth = depth - 1;

    if (targetNode) {
      var firstChildGlyphNode: HTMLImageElement = <HTMLImageElement>targetNode.querySelector(ContentConst.Const.Selector.SC.ContentEditor.ContentTreeNodeGlyph);
      if (firstChildGlyphNode) {
        let treeNodeProxy = new TreeNodeProxy(this.Logger, this.AssociatedDoc, firstChildGlyphNode);

        this.Logger.LogVal('treeNodeProxy.IsContentTreeNode', treeNodeProxy.IsContentTreeNode() + ' ' + treeNodeProxy.GetNodeLinkText());

        if (treeNodeProxy.IsContentTreeNode()) {
          if (treeNodeProxy.QueryIsExpanded() || treeNodeProxy.QueryIsActive()) {
            let newData: IDataStateOfTreeNode = treeNodeProxy.GetStateNode();
            toReturn.push(newData);
          } else {
            this.Logger.Log('no first img');
          }
        }
      }

      var childNodes: HTMLCollection = targetNode.children; //  querySelectorAll('.' + InjectConst.ContConst.ClassNames.ContentTreeNode);
      if (childNodes && childNodes.length > 0 && depth > 0) {
        for (var jdx = 0; jdx < childNodes.length; jdx++) {
          var oneChild = <HTMLElement>childNodes[jdx];
          toReturn = toReturn.concat(this.WalkNodeRecursive(oneChild, depth));
        }
      }
    }
    return toReturn;
  }

  GetRootNode(): HTMLElement {
    this.Logger.LogVal('Looking for node ID: ', ContentConst.Const.ElemId.sc.SitecoreRootAnchorNodeId);
    let toReturn: HTMLElement = this.AssociatedDoc.ContentDoc.getElementById(ContentConst.Const.ElemId.sc.SitecoreRootAnchorNodeId);
    return toReturn;
  }

  GetStateOfTree(): IDataStateOfTree {
    let toReturnOneTreeState: IDataStateOfTree = {
      AllTreeNodeAr: this.GetOneLiveTreeData(),
      ActiveNode: null,
    }

    toReturnOneTreeState.ActiveNode = this.GetActiveNode(toReturnOneTreeState.AllTreeNodeAr);

    if (toReturnOneTreeState) {
      this.Logger.LogVal('Tree State node count', toReturnOneTreeState.AllTreeNodeAr.length);
    }

    return toReturnOneTreeState;
  }

  GetActiveNode(allTreeNodeAr: IDataStateOfTreeNode[]) {
    let toReturn: IDataStateOfTreeNode = null;
    if (allTreeNodeAr) {
      for (var idx = 0; idx < allTreeNodeAr.length; idx++) {
        let candidate: IDataStateOfTreeNode = allTreeNodeAr[idx];
        if (candidate.IsActive) {
          toReturn = candidate;
          break;
        }
      }
    } else {
      this.Logger.ErrorAndThrow(this.GetActiveNode.name, 'No tree data provided');
    }

    return toReturn;
  }

  private GetOneLiveTreeData(): IDataStateOfTreeNode[] {
    this.Logger.FuncStart(this.GetOneLiveTreeData.name);

    var toReturn: IDataStateOfTreeNode[] = [];

    if (this.AssociatedDoc) {
      var rootNode: HTMLElement = this.GetRootNode();

      if (rootNode) {
        this.Logger.Log('rootNode: ' + rootNode.innerHTML);
        var rootParent = rootNode.parentElement;

        toReturn = this.WalkNodeRecursive(rootParent, ContentConst.Const.MaxIter);
        this.Logger.Log('foundNodes count: ' + toReturn.length);
      }
      else {
        this.Logger.ErrorAndThrow(this.GetOneLiveTreeData.name, 'no root node');
      }
    }
    else {
      this.Logger.ErrorAndThrow(this.GetOneLiveTreeData.name, 'no targetDoc');
    }

    this.Logger.LogVal('length', toReturn.length);
    this.Logger.FuncEnd(this.GetOneLiveTreeData.name);

    return toReturn;
  }
}