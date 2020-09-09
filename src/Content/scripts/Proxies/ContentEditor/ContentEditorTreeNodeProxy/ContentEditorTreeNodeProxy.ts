import { Guid } from "../../../../../Shared/scripts/Helpers/Guid";
import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { IDataOneTreeNode } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneTreeNode";
import { ContentConst } from "../../../../../Shared/scripts/Interfaces/InjectConst";
import { LoggableBase } from "../../../Managers/LoggableBase";
import { SharedConst } from "../../../../../Shared/scripts/SharedConst";

export class ContentEditorTreeNodeProxy extends LoggableBase {
  private AssociatedNodeElem: HTMLElement;

  constructor(logger: ILoggerAgent, obj: HTMLElement) {
    super(logger);
    if (obj) {
      this.Logger.Log('Instantiating from Element');
      this.AssociatedNodeElem = <HTMLElement>obj;
    } else {
      this.Logger.ErrorAndThrow(ContentEditorTreeNodeProxy.name, 'No passed elem');
    }
  }

  GetStateNode(): IDataOneTreeNode {
    var newData: IDataOneTreeNode = {
      IsExpanded: this.IsExpanded(),
      IsActive: this.IsActive(),
      NodeFriendly: this.GetFriendlyNameFromNode(),
      NodeId: null,
      Discriminator: SharedConst.Const.ObjDiscriminator.DataOneTreeNode
    };

    return newData;
  }

  RestoreStateNode(newData: IDataOneTreeNode, dataOneDocTarget: IDataOneDoc) {
    if (newData.IsExpanded) {
      this.ExpandNode();
    }

    this.Logger.LogVal('IsActive', newData.IsActive.toString());

    if (newData.IsActive) {
      var hotTreeNodeId = ContentConst.Const.Names.SC.TreeNodePrefix + Guid.WithoutDashes(newData.NodeId);

      var hotTreeNode = dataOneDocTarget.ContentDoc.getElementById(hotTreeNodeId);

      if (hotTreeNode) {
        let hotTreeNodeProxy = new ContentEditorTreeNodeProxy(this.Logger, hotTreeNode);

        if (hotTreeNodeProxy) {
          hotTreeNodeProxy.ActivateNode()
        } else {
          this.Logger.ErrorAndContinue(this.RestoreStateNode.name, 'hot tree node not found')
        }
      } else {
        this.Logger.WarningAndContinue(this.RestoreStateNode.name, 'No hotTreeNode');
      }
    }
  }

  IsActive(): boolean {
    this.Logger.FuncStart(this.IsActive.name);
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

    this.Logger.FuncEnd(this.IsActive.name);
    return toReturn;
  }

  ActivateNode(): void {
    this.Logger.FuncStart(this.ActivateNode.name);

    if (this.AssociatedNodeElem) {
      this.Logger.Log('clicking it');

      this.AssociatedNodeElem.click();
    } else {
      this.Logger.ErrorAndContinue(this.ActivateNode.name, 'No associated Elem');
    }

    this.Logger.FuncEnd(this.ActivateNode.name);
  }

  private __collapseNode(element: HTMLElement): void {
    var currentSrc = element.getAttribute('src');
    this.Logger.Log('currentSrc' + currentSrc);
    if (currentSrc.indexOf(ContentConst.Const.Names.TreeMenuExpandedPng) > -1) {
      this.Logger.Log('clicking it');
      element.click();
    }
  }

  ExpandNode(): void {
    this.Logger.FuncStart(this.ExpandNode.name);
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
      this.Logger.ErrorAndContinue(this.ExpandNode.name, 'No associated elem');
    }
    this.Logger.FuncEnd(this.ExpandNode.name);
  }

  GetFriendlyNameFromNode() {
    var toReturn = 'unknown';

    var parentNode = this.AssociatedNodeElem.parentNode;

    var treeNode: HTMLElement = parentNode.querySelector(ContentConst.Const.Selector.SC.IdStartsWithTreeNode); // [id^=Tree_Node_]');
    if (treeNode) {
      toReturn = this.AssociatedNodeElem.innerText;
    }
    else {
      this.Logger.Log('No treeNode');
    }
    return toReturn;
  }

  IsContentTreeNode(targetNode: HTMLElement) {
    var toReturn: boolean = false;

    var className = targetNode.className;
    if (className === ContentConst.Const.ClassNames.ContentTreeNode) {
      //this.debug().Log('is Content Node');
      toReturn = true;
    }
    return toReturn;
  }
  IsExpanded() {
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