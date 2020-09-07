import { SettingKey } from '../../../../../Shared/scripts/Enums/3xxx-SettingKey';
import { Guid } from '../../../../../Shared/scripts/Helpers/Guid';
import { ILoggerAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IContentEditorTreeProxy } from '../../../../../Shared/scripts/Interfaces/Agents/IOneTreeDrone';
import { ISettingsAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { IDataOneDoc } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { IDataOneTreeNode } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneTreeNode';
import { ContentConst } from '../../../../../Shared/scripts/Interfaces/InjectConst';
import { LoggableBase } from '../../../Managers/LoggableBase';
import { ContentEditorTreeNodeProxy } from '../ContentEditorTreeNodeProxy/ContentEditorTreeNodeProxy';
import { IDataOneStorageOneTreeState } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneStorageOneTreeState';
import { IterationDrone } from '../../../../../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone';
import { SharedConst } from '../../../../../Shared/scripts/SharedConst';

export class ContentEditorTreeProxy extends LoggableBase implements IContentEditorTreeProxy {
  private AssociatedDoc: IDataOneDoc;
  private MutationCallbacks: Function[] = [];
  private SettingsAgent: ISettingsAgent;
  private __treeHolderElem: HTMLElement;

  constructor(logger: ILoggerAgent, associatedDoc: IDataOneDoc, settingsAgent: ISettingsAgent) {
    super(logger);

    this.Logger.InstantiateStart(ContentEditorTreeProxy.name);

    this.AssociatedDoc = associatedDoc;
    this.SettingsAgent = settingsAgent;

    let self = this;
    setTimeout(function () {
      self.InitTreeHolderProxyOnReadyState();
    }, 6000);

    this.Logger.InstantiateEnd(ContentEditorTreeProxy.name);
  }

  private GetTreeHolderElem(): HTMLElement {
    if (!this.__treeHolderElem) {
      this.__treeHolderElem = this.AssociatedDoc.ContentDoc.querySelector('[id=ContentTreeHolder]');
    }
    return this.__treeHolderElem
  }

  //private GetTreeNodeProxy() {
  //  if (!this.__treeNodeProxy) {
  //    this.__treeNodeProxy = new ContentEditorTreeNodeProxy(this.Logger);
  //  }

  //  return this.__treeNodeProxy;
  //}

  InitTreeHolderProxyOnReadyState() {
    this.Logger.FuncStart(this.InitTreeHolderProxyOnReadyState.name);
    let setting = this.SettingsAgent.GetByKey(SettingKey.AutoRenameCeButton);
    this.Logger.LogVal('enable rename ce button', setting.ValueAsBool());
    if (setting && setting.ValueAsBool()) {
      this.AttachActiveNodeChangedObserver();
    } else {
    }
    this.Logger.FuncEnd(this.InitTreeHolderProxyOnReadyState.name);
  }

  AddListenerToMutationEvent(callback: Function) {
    this.MutationCallbacks.push(callback);
  }

  GetTreeNodeByGlyph(targetNode: IDataOneTreeNode, dataOneDocTarget: IDataOneDoc): ContentEditorTreeNodeProxy {
    this.Logger.FuncStart(this.GetTreeNodeByGlyph.name)
    let toReturn: ContentEditorTreeNodeProxy = null;

    if (targetNode && dataOneDocTarget) {
      var treeGlyphTargetId: string = ContentConst.Const.Names.SC.TreeGlyphPrefix + Guid.WithoutDashes(targetNode.NodeId);

      this.Logger.Log('looking for: ' + treeGlyphTargetId + ' ' + targetNode.NodeFriendly + ' in ' + Guid.AsShort(dataOneDocTarget.DocId));

      //this.Logger.Log('document not null ' + (dataOneDocTarget.ContentDoc != null));

      var foundOnPageTreeGlyph: HTMLElement = dataOneDocTarget.ContentDoc.getElementById(treeGlyphTargetId);

      if (foundOnPageTreeGlyph) {
        this.Logger.Log('Found it');
        toReturn = new ContentEditorTreeNodeProxy(this.Logger, foundOnPageTreeGlyph);
      } else {
        this.Logger.Log('Not Found');
      }

      //this.Logger.Log('looking for: *' + treeGlyphTargetId + '* ' + targetNode.NodeFriendly + ' in *' + Guid.AsShort(dataOneDocTarget.DocId) + '*');
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
        //foundOnPageProxy = this.GetTreeNodeByGlyph(this.AssociatedNodeElem, dataOneDocTarget);

        foundOnPageProxy = this.GetTreeNodeByGlyph(newData, dataOneDocTarget);

        if (foundOnPageProxy) {
          foundOnPageProxy.Restore(newData, dataOneDocTarget);
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

  private AttachActiveNodeChangedObserver() {
    this.Logger.FuncStart(this.AttachActiveNodeChangedObserver.name);

    try {
      if (this.GetTreeHolderElem()) {
        let observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
              let mutatedElement: HTMLElement = <HTMLElement>(mutation.target);
              this.Logger.Log(mutatedElement.classList.toString());
              this.Logger.Log(mutatedElement.id);

              //this.Logger.Log('mutated');
              //this.Logger.Log(mutatedElement);

              let candidateNode = new ContentEditorTreeNodeProxy(this.Logger, mutatedElement.parentElement);

              if (candidateNode.__isActive()) {
                this.MutationCallbacks.forEach((callback) => callback(mutatedElement.parentElement));
                this.Logger.Log((<HTMLElement>mutation.target).innerText);
              }
            }
          });
        });
        observer.observe(this.GetTreeHolderElem(), { attributes: true, subtree: true, childList: true });

        //this.SelfElem.addEventListener('click', (evt) => { alert((<HTMLElement>evt.target).innerText) });
        //use MutationObserver
      }
      else {
        this.Logger.ErrorAndThrow(this.AttachActiveNodeChangedObserver.name, 'no TreeHolder Elem');
      }
    } catch (err) {
      throw (err);
    }

    this.Logger.FuncEnd(this.AttachActiveNodeChangedObserver.name);
  }

  WalkNodeRecursive(targetNode: HTMLElement, depth: number): IDataOneTreeNode[] {
    var toReturn: IDataOneTreeNode[] = [];
    depth = depth - 1;

    if (targetNode) {
      var firstImg: HTMLElement = targetNode.querySelector(ContentConst.Const.Selector.SC.ContentTreeNodeGlyph);

      let treeNodeProxy = new ContentEditorTreeNodeProxy(this.Logger, firstImg);

      if (treeNodeProxy.__isContentTreeNode) {
        var newData: IDataOneTreeNode = {
          IsExpanded: treeNodeProxy.__isExpanded(),
          IsActive: treeNodeProxy.__isActive(),
          NodeFriendly: '',
          NodeId: null,
          Discriminator: SharedConst.Const.ObjDiscriminator.DataOneTreeNode
        };

        if (newData.IsExpanded || newData.IsActive) {
          newData.NodeFriendly = treeNodeProxy.GetFriendlyNameFromNode();

          var apparentId = firstImg.id.replace(ContentConst.Const.Names.SC.TreeGlyphPrefix, '');

          newData.NodeId = Guid.ParseGuid(apparentId, true);

          toReturn.push(newData);
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

    this.Logger.FuncEnd(this.GetOneLiveTreeData.name);

    return toReturn;
  }
}