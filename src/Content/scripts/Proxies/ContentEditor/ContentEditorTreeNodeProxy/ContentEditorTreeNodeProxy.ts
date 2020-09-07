import { ContentConst } from "../../../../../Shared/scripts/Interfaces/InjectConst";
import { LoggableBase } from "../../../Managers/LoggableBase";
import { IDataOneTreeNode } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneTreeNode";
import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { IterationDrone } from "../../../../../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone";
import { Guid } from "../../../../../Shared/scripts/Helpers/Guid";
import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";

export class ContentEditorTreeNodeProxy extends LoggableBase {
  private AssociatedNodeElem: HTMLElement;

  //constructor(logger: ILoggerAgent, treeNodeData: IDataOneTreeNode)
  //constructor(logger: ILoggerAgent, nodeId: Guid)
  //constructor(logger: ILoggerAgent, selector: string)
  constructor(logger: ILoggerAgent, obj: HTMLElement) {
    //constructor(logger: ILoggerAgent, obj?: any) {
    super(logger);
    if (obj) {
      this.Logger.Log('Instantiating from Element');
      this.AssociatedNodeElem = <HTMLElement>obj;
    } else {
      this.Logger.ErrorAndThrow(ContentEditorTreeNodeProxy.name, 'No passed elem');
    }
    //} else if (obj instanceof String) {
    //  this.Logger.ErrorAndThrow('Instantiating from Selector');

    //} else if (obj instanceof Guid) {
    //  this.Logger.ErrorAndThrow('Instantiating from Selector');
    //} else if (obj.Discriminator === 'IDataOneTreeNode') {
    //  this.Logger.ErrorAndThrow('Instantiating from Selector');
    //}
  }

  Restore(newData: IDataOneTreeNode, dataOneDocTarget: IDataOneDoc) {
    if (newData.IsExpanded) {
      this.__expandNode();
    }

    this.Logger.LogVal('IsActive', newData.IsActive.toString());

    if (newData.IsActive) {
      var hotTreeNodeId = ContentConst.Const.Names.SC.TreeNodePrefix + Guid.WithoutDashes(newData.NodeId);

      var hotTreeNode = dataOneDocTarget.ContentDoc.getElementById(hotTreeNodeId);

      let hotTreeNodeProxy = new ContentEditorTreeNodeProxy(this.Logger, hotTreeNode);

      if (hotTreeNodeProxy) {
        hotTreeNodeProxy.__activateNode()
      } else {
        this.Logger.ErrorAndContinue(this.Restore.name, 'hot tree node not found')
      }
    }
  }

  __isActive(): boolean {
    this.Logger.FuncStart(this.__isActive.name);
    var toReturn: boolean = false;

    var firstNodeActiveTest = this.AssociatedNodeElem.querySelector(ContentConst.Const.Selector.SC.IdStartsWithTreeNode);
    this.Logger.LogVal('firstNodeActiveTest', firstNodeActiveTest !== null);
    if (firstNodeActiveTest !== null) {
      this.Logger.Log('passes first node test');
      var className = firstNodeActiveTest.className;
      this.Logger.Log(className);
      if (className.indexOf(ContentConst.Const.ClassNames.SC.scContentTreeNodeActive) > -1) {
        toReturn = true;
        this.Logger.Log('** isActive ' + this.AssociatedNodeElem.innerText);
      }
    } else {
      this.Logger.Log('does not pass first node test');
    }

    this.Logger.FuncEnd(this.__isActive.name);
    return toReturn;
  }

  __activateNode(): void {
    this.Logger.FuncStart(this.__activateNode.name);

    if (this.AssociatedNodeElem) {
      this.Logger.Log('clicking it');

      this.AssociatedNodeElem.click();
    } else {
      this.Logger.ErrorAndContinue(this.__activateNode.name, 'No associated Elem');
    }

    this.Logger.FuncEnd(this.__activateNode.name);
  }

  private __collapseNode(element: HTMLElement): void {
    var currentSrc = element.getAttribute('src');
    this.Logger.Log('currentSrc' + currentSrc);
    if (currentSrc.indexOf(ContentConst.Const.Names.TreeMenuExpandedPng) > -1) {
      this.Logger.Log('clicking it');
      element.click();
    }
  }

  //private __collapseRootNode(targetCEDoc: IDataOneDoc) {
  //  var rootElem: HTMLElement = targetCEDoc.ContentDoc.getElementById(ContentConst.Const.ElemId.sc.SitecoreRootGlyphId);
  //  if (rootElem) {
  //    this.__collapseNode(rootElem);
  //  } else {
  //    this.Logger.ErrorAndThrow(this.__collapseRootNode.name, 'Root glyph not found ' + ContentConst.Const.ElemId.sc.SitecoreRootGlyphId);
  //  }
  //}

  __expandNode(): void {
    this.Logger.FuncStart(this.__expandNode.name);
    if (this.AssociatedNodeElem) {
      var currentSrc = this.AssociatedNodeElem.getAttribute('src');
      this.Logger.Log('currentSrc' + currentSrc);

      if (currentSrc.indexOf(ContentConst.Const.Names.TreeMenuExpandedPng) < 0) {
        this.Logger.Log('clicking it');
        this.AssociatedNodeElem.click();
      } else {
        this.Logger.Log('Already expanded');
      }
    } else {
      this.Logger.ErrorAndContinue(this.__expandNode.name, 'No associated elem');
    }
    this.Logger.FuncEnd(this.__expandNode.name);
  }

  GetFriendlyNameFromNode() {
    this.Logger.FuncStart(this.GetFriendlyNameFromNode.name);
    var toReturn = 'unknown';

    var parentNode = this.AssociatedNodeElem.parentNode;

    var treeNode: HTMLElement = parentNode.querySelector(ContentConst.Const.Selector.SC.IdStartsWithTreeNode); // [id^=Tree_Node_]');
    if (treeNode) {
      toReturn = treeNode.innerText;
    }
    else {
      this.Logger.Log('No treeNode');
    }
    this.Logger.FuncEnd(this.GetFriendlyNameFromNode.name, toReturn);
    return toReturn;
  }

  __isContentTreeNode(targetNode: HTMLElement) {
    var toReturn: boolean = false;

    var className = targetNode.className;
    if (className === ContentConst.Const.ClassNames.ContentTreeNode) {
      //this.debug().Log('is Content Node');
      toReturn = true;
    }
    return toReturn;
  }
  __isExpanded() {
    var toReturn: boolean = false;
    if (this.AssociatedNodeElem) {
      var srcAttr = this.AssociatedNodeElem.getAttribute('src');

      if (srcAttr.indexOf(ContentConst.Const.Names.SC.TreeExpandedPng.sc920) > -1) {
        toReturn = true;
      }
      return toReturn;
    }
  }
}