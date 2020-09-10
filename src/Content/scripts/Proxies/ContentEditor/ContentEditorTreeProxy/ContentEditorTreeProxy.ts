import { IterationDrone } from '../../../../../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone';
import { SettingKey } from '../../../../../Shared/scripts/Enums/3xxx-SettingKey';
import { Guid } from '../../../../../Shared/scripts/Helpers/Guid';
import { ILoggerAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IContentEditorTreeProxy } from '../../../../../Shared/scripts/Interfaces/Agents/IOneTreeDrone';
import { ISettingsAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { IDataOneDoc } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { IDataOneStorageOneTreeState } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneStorageOneTreeState';
import { IDataOneTreeNode } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneTreeNode';
import { ContentConst } from '../../../../../Shared/scripts/Interfaces/InjectConst';
import { LoggableBase } from '../../../Managers/LoggableBase';
import { ContentEditorTreeNodeProxy } from '../ContentEditorTreeNodeProxy/ContentEditorTreeNodeProxy';
import { Subject_ContentEditorTreeMutatedEvent } from '../../Desktop/DesktopProxy/Events/ContentEditorTreeMutatedEvent/Subject_ContentEditorTreeMutatedEvent';
import { IPayload_ContentEditorTreeMutatedEvent } from '../../Desktop/DesktopProxy/Events/ContentEditorTreeMutatedEvent/IPayload_ContentEditorTreeMutatedEvent';

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
      this.TreeMutationEvent = new Subject_ContentEditorTreeMutatedEvent(this.Logger, this.GetTreeHolderElem(), this.HostIframeId);
    }

    this.Logger.FuncEnd(this.InitCeTreeProxy.name);
  }

  AddListenerToTreeMutationEvent(callback: Function) {
    this.Logger.FuncStart(this.AddListenerToTreeMutationEvent.name);

    this.TreeMutationEvent.RegisterObserver(callback);
    this.MutationCallbacks.push(callback);
    this.Logger.FuncEnd(this.AddListenerToTreeMutationEvent.name);
  }

  GetTreeNodeByGlyph(targetNode: IDataOneTreeNode, dataOneDocTarget: IDataOneDoc): ContentEditorTreeNodeProxy {
    this.Logger.FuncStart(this.GetTreeNodeByGlyph.name)
    let toReturn: ContentEditorTreeNodeProxy = null;

    if (targetNode && dataOneDocTarget) {
      var treeGlyphTargetId: string = ContentConst.Const.Names.SC.TreeGlyphPrefix + Guid.WithoutDashes(targetNode.NodeId);

      this.Logger.Log('looking for: ' + treeGlyphTargetId + ' ' + targetNode.NodeFriendly + ' in ' + Guid.AsShort(dataOneDocTarget.DocId));

      var foundOnPageTreeGlyph: HTMLElement = dataOneDocTarget.ContentDoc.getElementById(treeGlyphTargetId);

      if (foundOnPageTreeGlyph) {
        this.Logger.Log('Found it');
        toReturn = new ContentEditorTreeNodeProxy(this.Logger, foundOnPageTreeGlyph);
      } else {
        this.Logger.Log('Not Found');
      }
    }
    this.Logger.FuncEnd(this.GetTreeNodeByGlyph.name);
    return toReturn;
  }

  async WaitForAndRestoreManyAllNodes(storageData: IDataOneStorageOneTreeState, targetDoc: IDataOneDoc) {
    this.Logger.FuncStart(this.WaitForAndRestoreManyAllNodes.name, Guid.AsShort(targetDoc.DocId));

    let iterHelper: IterationDrone = new IterationDrone(this.Logger, this.WaitForAndRestoreManyAllNodes.name);

    while (storageData.AllTreeNodeAr.length > 0 && iterHelper.DecrementAndKeepGoing()) {
      var nextNode: IDataOneTreeNode = storageData.AllTreeNodeAr.shift();

      await this.WaitForAndRestoreOneNode(targetDoc, nextNode);
    }

    this.Logger.FuncEnd(this.WaitForAndRestoreManyAllNodes.name);
  }

  async WaitForAndRestoreOneNode(dataOneDocTarget: IDataOneDoc, newData: IDataOneTreeNode): Promise<void> {
    this.Logger.FuncStart(this.WaitForAndRestoreOneNode.name, Guid.AsShort(dataOneDocTarget.DocId));

    try {
      var iterHelper = new IterationDrone(this.Logger, this.WaitForAndRestoreOneNode.name);

      let foundOnPageProxy: ContentEditorTreeNodeProxy = null;

      while (!foundOnPageProxy && iterHelper.DecrementAndKeepGoing()) {
        foundOnPageProxy = this.GetTreeNodeByGlyph(newData, dataOneDocTarget);

        if (foundOnPageProxy) {
          foundOnPageProxy.RestoreStateNode(newData, dataOneDocTarget);
        } else {
          this.Logger.Log('not Found...waiting: ');
          await iterHelper.Wait();
        }
      }
    } catch (err) {
      throw (this.WaitForAndRestoreOneNode.name + ' | ' + err);
    }
    this.Logger.FuncEnd(this.WaitForAndRestoreOneNode.name, Guid.AsShort(dataOneDocTarget.DocId));
  }

  WalkNodeRecursive(targetNode: HTMLElement, depth: number): IDataOneTreeNode[] {
    var toReturn: IDataOneTreeNode[] = [];
    depth = depth - 1;

    if (targetNode) {
      var firstChildGlyphNode: HTMLElement = targetNode.querySelector(ContentConst.Const.Selector.SC.ContentTreeNodeGlyph);
      if (firstChildGlyphNode) {
        let treeNodeProxy = new ContentEditorTreeNodeProxy(this.Logger, firstChildGlyphNode);

        this.Logger.LogVal('treeNodeProxy.IsContentTreeNode', treeNodeProxy.IsContentTreeNode() + ' ' + treeNodeProxy.GetNodeLinkText());

        if (treeNodeProxy.IsContentTreeNode()) {
          if (treeNodeProxy.QueryIsExpanded() || treeNodeProxy.QueryIsActive()) {

            let newData: IDataOneTreeNode = treeNodeProxy.GetStateNode();
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
    this.Logger.LogVal('Looking for node ID: ', ContentConst.Const.ElemId.sc.SitecoreRootNodeId);
    let toReturn: HTMLElement = this.AssociatedDoc.ContentDoc.getElementById(ContentConst.Const.ElemId.sc.SitecoreRootNodeId);
    return toReturn;
  }

  GetOneLiveTreeData(): IDataOneTreeNode[] {
    this.Logger.FuncStart(this.GetOneLiveTreeData.name);

    var toReturn: IDataOneTreeNode[] = [];

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