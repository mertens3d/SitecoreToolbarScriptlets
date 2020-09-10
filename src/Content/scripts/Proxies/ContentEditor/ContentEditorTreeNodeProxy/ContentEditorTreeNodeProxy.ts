import { Guid } from "../../../../../Shared/scripts/Helpers/Guid";
import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { IDataOneTreeNode } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneTreeNode";
import { ContentConst } from "../../../../../Shared/scripts/Interfaces/InjectConst";
import { LoggableBase } from "../../../Managers/LoggableBase";
import { SharedConst } from "../../../../../Shared/scripts/SharedConst";
import { GuidData } from "../../../../../Shared/scripts/Helpers/GuidData";

export class ContentEditorTreeNodeProxy extends LoggableBase {
  private scContentTreeNode: HTMLElement;
  private scContentTreeNodeGlyph: HTMLElement;
  NodeLinkElem: any;

  constructor(logger: ILoggerAgent, glyphNode: HTMLElement) {
    super(logger);

    this.Logger.InstantiateStart(ContentEditorTreeNodeProxy.name);

    this.scContentTreeNodeGlyph = glyphNode;

    this.InitTreeNodeProxy();
    this.Logger.InstantiateEnd(ContentEditorTreeNodeProxy.name);
  }

  private InitTreeNodeProxy() {
    if (this.scContentTreeNodeGlyph) {
      this.scContentTreeNode = this.scContentTreeNodeGlyph.parentElement;
      this.NodeLinkElem = this.scContentTreeNode.querySelector(":scope > a");
    } else {
      this.Logger.ErrorAndThrow(ContentEditorTreeNodeProxy.name, 'No passed elem');
    }
  }

  GetStateNode(): IDataOneTreeNode {
    var newData: IDataOneTreeNode = {
      IsExpanded: this.QueryIsExpanded(),
      IsActive: this.QueryIsActive(),
      NodeFriendly: this.GetNodeLinkText(),
      NodeId: this.GetApparentId(),
      Discriminator: SharedConst.Const.ObjDiscriminator.DataOneTreeNode
    };

    return newData;
  }

  GetApparentId(): GuidData {
    let glyphNodeIdSuffix = this.scContentTreeNodeGlyph.id.replace(ContentConst.Const.Names.SC.TreeGlyphPrefix, '');

    let toReturnGuidData: GuidData = Guid.ParseGuid(glyphNodeIdSuffix, true);

    this.Logger.LogVal('apparent id', toReturnGuidData.Raw);
    return toReturnGuidData;
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

  QueryIsActive(): boolean {
    this.Logger.FuncStart(this.QueryIsActive.name);
    var toReturn: boolean = false;

    if (this.NodeLinkElem) {
      var className = this.NodeLinkElem.className;
      if (className.indexOf(ContentConst.Const.ClassNames.SC.scContentTreeNodeActive) > -1) {
        toReturn = true;
        this.Logger.Log('** isActive ' + this.scContentTreeNode.innerText);
      }
    }

    this.Logger.FuncEnd(this.QueryIsActive.name, toReturn.toString());
    return toReturn;
  }

  ActivateNode(): void {
    this.Logger.FuncStart(this.ActivateNode.name);

    if (this.scContentTreeNode) {
      this.Logger.Log('clicking it');

      this.scContentTreeNode.click();
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
    if (this.scContentTreeNodeGlyph) {
      var currentSrc = this.scContentTreeNodeGlyph.getAttribute('src');

      if (currentSrc !== null) {
        this.Logger.Log('currentSrc' + currentSrc);

        if (!this.QueryIsExpanded()) {
          this.Logger.Log('clicking it');
          this.scContentTreeNode.click();
        } else {
          this.Logger.Log('Already expanded');
        }
      } else {
        this.Logger.ErrorAndThrow(this.ExpandNode.name, 'corrupt data');
      }
    } else {
      this.Logger.ErrorAndContinue(this.ExpandNode.name, 'No associated elem');
    }

    this.Logger.FuncEnd(this.ExpandNode.name);
  }

  GetNodeLinkText() {
    var toReturn = 'unknown';

    if (this.NodeLinkElem) {
      toReturn = this.NodeLinkElem.innerText;
    }

    return toReturn;
  }

  IsContentTreeNode() {
    this.Logger.FuncStart(this.IsContentTreeNode.name);
    var toReturn: boolean = false;

    var className = this.scContentTreeNode.className;

    this.Logger.LogVal('className', className);

    if (className === ContentConst.Const.ClassNames.ContentTreeNode) {
      //this.debug().Log('is Content Node');
      toReturn = true;
    }

    this.Logger.FuncEnd(this.IsContentTreeNode.name, toReturn);
    return toReturn;
  }

  QueryIsExpanded() {
    var toReturn: boolean = false;
    if (this.scContentTreeNodeGlyph) {
      var srcAttr = this.scContentTreeNodeGlyph.getAttribute('src');
      if (srcAttr !== null) {
        if (srcAttr.indexOf(ContentConst.Const.Names.SC.TreeExpandedPng.sc920) > -1) {
          toReturn = true;
        }
      } else {
        this.Logger.ErrorAndThrow(this.QueryIsExpanded.name, 'Bad Glph/ node data');
      }
      return toReturn;
    }
  }
}