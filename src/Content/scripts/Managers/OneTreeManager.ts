import { ContentHub } from './ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { IDataOneTreeNode } from '../../../Shared/scripts/Interfaces/IDataOneTreeNode';
import { ContentConst } from '../../../Shared/scripts/Interfaces/InjectConst';

export class OneTreeManager extends ContentManagerBase {
  AssociatedDoc: IDataOneDoc;
  constructor(hub: ContentHub, associatedDoc: IDataOneDoc) {
    super(hub)
    hub.Logger.FuncStart(OneTreeManager.name);
    this.AssociatedDoc = associatedDoc;
    hub.Logger.FuncEnd(OneTreeManager.name);
  }

  GetFriendlyNameFromNode(inputNode) {
    this.Log().FuncStart(this.GetFriendlyNameFromNode.name);
    var toReturn = 'unknown';

    var parentNode = inputNode.parentNode;

    var treeNode = parentNode.querySelector(ContentConst.Const.Selector.SC.IdStartsWithTreeNode); // [id^=Tree_Node_]');
    if (treeNode) {
      toReturn = treeNode.innerText;
    } else {
      this.Log().Log('No treeNode');
    }
    this.Log().FuncEnd(this.GetFriendlyNameFromNode.name, toReturn);
    return toReturn;
  }

  //GetActiveNode(): IDataOneTreeNode {
  //  let toReturn: IDataOneTreeNode = null;

  //  var AllTreeNodeAr: IDataOneTreeNode[] = this.GetOneLiveTreeData();

  //  for (var idx = 0; idx < AllTreeNodeAr.length; idx++) {
  //    var candidate: IDataOneTreeNode = AllTreeNodeAr[idx];
  //    if (candidate.IsActive) {
  //      toReturn = candidate;
  //      break;
  //    }
  //  }

  //  return toReturn;
  //}
  private __isActive(targetNode: HTMLElement): boolean {
    var toReturn: boolean = false;

    var firstNodeActiveTest = targetNode.querySelector(ContentConst.Const.Selector.SC.IdStartsWithTreeNode);
    if (firstNodeActiveTest) {
      var className = firstNodeActiveTest.className;
      if (className.indexOf(ContentConst.Const.ClassNames.SC.scContentTreeNodeActive) > -1) {
        toReturn = true;
        this.Log().Log('** isActive ' + targetNode.innerText);
      }
    }

    //this.debug().Log(className);
    //this.debug().Log(InjectConst.ContConst.ClassNames.SC.scContentTreeNodeActive);

    return toReturn;
  }

  private __isExpanded(firstImg: HTMLElement) {
    var toReturn: boolean = false;
    if (firstImg) {
      var srcAttr = firstImg.getAttribute('src');

      if (srcAttr.indexOf(ContentConst.Const.Names.SC.TreeExpandedPng.sc920) > -1) {
        //this.debug().Log('is Expanded');
        toReturn = true;
      }
      return toReturn;
    }
  }

  private __isContentTreeNode(targetNode: HTMLElement) {
    var toReturn: boolean = false;

    var className = targetNode.className;
    if (className === ContentConst.Const.ClassNames.ContentTreeNode) {
      //this.debug().Log('is Content Node');
      toReturn = true;
    }
    return toReturn;
  }

  WalkNodeRecursive(targetNode: HTMLElement, depth: number): IDataOneTreeNode[] {
    var toReturn: IDataOneTreeNode[] = [];
    depth = depth - 1;

    if (targetNode) {
      var firstImg: HTMLElement = targetNode.querySelector(ContentConst.Const.Selector.SC.ContentTreeNodeGlyph);

      if (this.__isContentTreeNode(targetNode)) {
        var newData: IDataOneTreeNode = {
          IsExpanded: this.__isExpanded(firstImg),
          IsActive: this.__isActive(targetNode),
          NodeFriendly: '',
          NodeId: null
        }

        if (newData.IsExpanded || newData.IsActive) {
          //this.debug().LogVal('isExpanded', newData.IsExpanded.toString());
          //this.debug().LogVal('isActive', newData.IsActive.toString());

          newData.NodeFriendly = this.GetFriendlyNameFromNode(firstImg);

          //this.debug().LogVal('friendlyName', newData.NodeFriendly);
          //this.debug().LogVal('id', firstImg.id);

          var apparentId = firstImg.id.replace(ContentConst.Const.Names.SC.TreeGlyphPrefix, '');

          newData.NodeId = this.ContentHub.Helpers.GuidHelp.ParseGuid(apparentId);

          toReturn.push(newData);
        }
      }

      var childNodes: HTMLCollection = targetNode.children;//  querySelectorAll('.' + InjectConst.ContConst.ClassNames.ContentTreeNode);
      if (childNodes && childNodes.length > 0 && depth > 0) {
        for (var jdx = 0; jdx < childNodes.length; jdx++) {
          var oneChild = <HTMLElement>childNodes[jdx];
          toReturn = toReturn.concat(this.WalkNodeRecursive(oneChild, depth));
        }
      }
    }
    return toReturn;
  }

  GetOneLiveTreeData(): IDataOneTreeNode[] {
    this.Log().FuncStart(this.GetOneLiveTreeData.name);
    this.Log().Log('targetDoc isnull: ' + (this.AssociatedDoc === null));
    var toReturn: IDataOneTreeNode[] = [];

    if (this.AssociatedDoc) {
      //this.debug().Log(targetDoc);
      this.Log().LogVal('Looking for node ID: ', ContentConst.Const.ElemId.sc.SitecoreRootNodeId);
      this.Log().DebugIDataOneDoc(this.AssociatedDoc);
      var rootNode = this.AssociatedDoc.Document.getElementById(ContentConst.Const.ElemId.sc.SitecoreRootNodeId);

      if (rootNode) {
        this.Log().Log('rootNode: ' + rootNode.innerHTML);
        var rootParent = rootNode.parentElement;

        toReturn = this.WalkNodeRecursive(rootParent, ContentConst.Const.MaxIter);
        this.Log().Log('foundNodes count: ' + toReturn.length);

        //var nodesAsString = JSON.stringify(toReturn);
        //this.debug().Log('toReturn as string: ' + nodesAsString);
      } else {
        this.Log().Error(this.GetOneLiveTreeData.name, 'no root node');
      }
    } else {
      this.Log().Error(this.GetOneLiveTreeData.name, 'no targetDoc');
    }

    this.Log().FuncEnd(this.GetOneLiveTreeData.name);

    return toReturn;
  }
}