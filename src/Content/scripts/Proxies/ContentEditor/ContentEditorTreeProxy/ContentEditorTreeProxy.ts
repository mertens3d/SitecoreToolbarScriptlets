import { IterationDrone } from '../../../../../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone';
import { DefaultStateOfTree } from "../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfTree";
import { SettingKey } from '../../../../../Shared/scripts/Enums/3xxx-SettingKey';
import { Guid } from '../../../../../Shared/scripts/Helpers/Guid';
import { ILoggerAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IContentEditorTreeProxy } from '../../../../../Shared/scripts/Interfaces/Agents/IOneTreeDrone';
import { ISettingsAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { IDataOneDoc } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { IDataStateOfScContentTreeNode } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneTreeNode';
import { IDataStateOfTree } from '../../../../../Shared/scripts/Interfaces/Data/iDataTreeState';
import { ContentConst } from '../../../../../Shared/scripts/Interfaces/InjectConst';
import { LoggableBase } from '../../../Managers/LoggableBase';
import { Subject_ContentEditorTreeMutatedEvent } from '../../Desktop/DesktopProxy/Events/ContentEditorTreeMutatedEvent/Subject_ContentEditorTreeMutatedEvent';
import { IGeneric_Observer } from "../../Desktop/DesktopProxy/Events/GenericEvent/IGeneric_Observer";
import { ScContentTreeNodeProxy } from '../ContentEditorTreeNodeProxy/ContentEditorTreeNodeProxy';
import { ITreeMutatedEvent_Payload } from '../../Desktop/DesktopProxy/Events/ContentEditorTreeMutatedEvent/IPayload_ContentEditorTreeMutatedEvent';


export class TreeMutation_Observer extends LoggableBase implements IGeneric_Observer<IDataStateOfTree>{
    Update(payload: IDataStateOfTree) {
    }
}

export class TreeProxy extends LoggableBase implements IContentEditorTreeProxy {
  private AssociatedDoc: IDataOneDoc;
  private SettingsAgent: ISettingsAgent;
  private __treeHolderElem: HTMLElement;

  TreeMutationEvent: Subject_ContentEditorTreeMutatedEvent;
  private HostIframeId: string;

  constructor(logger: ILoggerAgent, associatedDoc: IDataOneDoc, settingsAgent: ISettingsAgent, hostIframeId: string) {
    super(logger);

    this.Logger.InstantiateStart(TreeProxy.name);

    this.AssociatedDoc = associatedDoc;

    this.Logger.LogAsJsonPretty('this.AssociatedDoc', this.AssociatedDoc);

    this.SettingsAgent = settingsAgent;
    this.HostIframeId = hostIframeId;

    this.InitCeTreeProxy();

    this.Logger.InstantiateEnd(TreeProxy.name);
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

  RegisterObserver(observer: IGeneric_Observer<ITreeMutatedEvent_Payload>) {
    this.Logger.FuncStart(this.RegisterObserver.name);

    this.TreeMutationEvent.RegisterObserver(observer);
    this.Logger.FuncEnd(this.RegisterObserver.name);
  }

  GetTreeNodeByGlyph(targetNode: IDataStateOfScContentTreeNode): ScContentTreeNodeProxy {
    this.Logger.FuncStart(this.GetTreeNodeByGlyph.name)
    let toReturn: ScContentTreeNodeProxy = null;

    if (targetNode && this.AssociatedDoc) {
      var treeGlyphTargetId: string = ContentConst.Const.Names.SC.TreeGlyphPrefix + Guid.WithoutDashes(targetNode.ItemId);

      this.Logger.Log('looking for: (' + targetNode.Friendly + ')' + treeGlyphTargetId + ' in ' + Guid.AsShort(this.AssociatedDoc.DocId));

      var foundOnPageTreeGlyph: HTMLImageElement = <HTMLImageElement>this.AssociatedDoc.ContentDoc.getElementById(treeGlyphTargetId);
      var test: HTMLImageElement = <HTMLImageElement>this.AssociatedDoc.ContentDoc.querySelector('[id=' + treeGlyphTargetId + ']');

      if (foundOnPageTreeGlyph) {
        toReturn = new ScContentTreeNodeProxy(this.Logger, this.AssociatedDoc, foundOnPageTreeGlyph);
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

    while (stateOfContentEditor.StateOfTreeNodes.length > 0 && iterHelper.DecrementAndKeepGoing()) {
      var nextNode: IDataStateOfScContentTreeNode = stateOfContentEditor.StateOfTreeNodes.shift();

      await this.SetStateOfTreeNode(nextNode);
    }

    this.Logger.FuncEnd(this.SetStateOfTree.name);
  }

  async SetStateOfTreeNode(dataStateOfTreeNode: IDataStateOfScContentTreeNode): Promise<void> {
    this.Logger.FuncStart(this.SetStateOfTreeNode.name);

    try {
      var iterHelper = new IterationDrone(this.Logger, this.SetStateOfTreeNode.name);

      let treeNodeProxy: ScContentTreeNodeProxy = null;

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

  WalkNodeRecursive(targetNode: HTMLElement, depth: number): IDataStateOfScContentTreeNode[] {
    var toReturn: IDataStateOfScContentTreeNode[] = [];
    depth = depth - 1;

    if (targetNode) {
      var firstChildGlyphNode: HTMLImageElement = <HTMLImageElement>targetNode.querySelector(ContentConst.Const.Selector.SC.ContentEditor.ContentTreeNodeGlyph);
      if (firstChildGlyphNode) {
        let treeNodeProxy = new ScContentTreeNodeProxy(this.Logger, this.AssociatedDoc, firstChildGlyphNode);

        this.Logger.LogVal('treeNodeProxy.IsContentTreeNode', treeNodeProxy.IsContentTreeNode() + ' ' + treeNodeProxy.GetNodeLinkText());

        if (treeNodeProxy.IsContentTreeNode()) {
          if (treeNodeProxy.QueryIsExpanded() || treeNodeProxy.QueryIsActive()) {
            let newData: IDataStateOfScContentTreeNode = treeNodeProxy.GetStateOfScContentTreeNode();
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
    this.Logger.LogVal('Looking for: ', ContentConst.Const.Selector.SC.ContentEditor.RootAnchorNode);
    let toReturn: HTMLElement = this.AssociatedDoc.ContentDoc.querySelector(ContentConst.Const.Selector.SC.ContentEditor.RootAnchorNode);
    return toReturn;
  }

  GetStateOfTree(): IDataStateOfTree {
    this.Logger.FuncStart(this.GetStateOfTree.name);

    let toReturnOneTreeState: IDataStateOfTree = new DefaultStateOfTree();

    try {
      toReturnOneTreeState.StateOfTreeNodes = this.GetStateOfTreeNodes();
      toReturnOneTreeState.ActiveTreeNodeIndex = null;

      toReturnOneTreeState.ActiveTreeNodeIndex = this.GetActiveNode(toReturnOneTreeState.StateOfTreeNodes);

      if (toReturnOneTreeState) {
        this.Logger.LogVal('Tree State node count', toReturnOneTreeState.StateOfTreeNodes.length);
      }
    } catch (err) {
      throw (this.GetStateOfTree.name + ' | ' + err);
    }

    this.Logger.FuncEnd(this.GetStateOfTree.name);
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
    this.Logger.FuncStart(this.GetStateOfTreeNodes.name);

    var toReturn: IDataStateOfScContentTreeNode[] = [];

    if (this.AssociatedDoc) {
      var rootNode: HTMLElement = this.GetRootNode();

      if (rootNode) {
        this.Logger.Log('rootNode: ' + rootNode.innerHTML);
        var rootParent = rootNode.parentElement;

        toReturn = this.WalkNodeRecursive(rootParent, ContentConst.Const.MaxIter);
        this.Logger.Log('foundNodes count: ' + toReturn.length);
      }
      else {
        this.Logger.ErrorAndThrow(this.GetStateOfTreeNodes.name, 'no root node');
      }
    }
    else {
      this.Logger.ErrorAndThrow(this.GetStateOfTreeNodes.name, 'no targetDoc');
    }

    this.Logger.LogVal('length', toReturn.length);
    this.Logger.FuncEnd(this.GetStateOfTreeNodes.name);

    return toReturn;
  }
}