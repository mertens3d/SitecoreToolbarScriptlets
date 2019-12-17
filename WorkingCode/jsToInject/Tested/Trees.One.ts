console.log('OneTree loaded');

class OneTreeManager extends ManagerBase {
  constructor(xyyz: Hub) {
    super(xyyz)
    xyyz.debug.FuncStart(OneTreeManager.name);
    xyyz.debug.FuncEnd(OneTreeManager.name);
  }

  GetFriendlyNameFromNode(inputNode) {
    this.debug().FuncStart(this.GetFriendlyNameFromNode.name);
    var toReturn = 'unknown';

    var parentNode = inputNode.parentNode;

    var treeNode = parentNode.querySelector(this.Const().Selector.SC.IdStartsWithTreeNode); // [id^=Tree_Node_]');
    if (treeNode) {
      toReturn = treeNode.innerText;
    } else {
      this.debug().Log('No treeNode');
    }
    this.debug().FuncEnd(this.GetFriendlyNameFromNode.name, toReturn);
    return toReturn;
  }

  private __isActive(targetNode: HTMLElement): boolean {
    var toReturn: boolean = false;

    var firstNodeActiveTest = targetNode.querySelector(this.Const().Selector.SC.IdStartsWithTreeNode);
    if (firstNodeActiveTest) {
      var className = firstNodeActiveTest.className;
      if (className.indexOf(this.Const().ClassNames.SC.scContentTreeNodeActive) > -1) {
        toReturn = true;
        this.debug().Log('** isActive ' + targetNode.innerText);
      }
    }

    //this.debug().Log(className);
    //this.debug().Log(this.Const().ClassNames.SC.scContentTreeNodeActive);

    return toReturn;
  }

  private __isExpanded(firstImg: HTMLElement) {
    var toReturn: boolean = false;
    if (firstImg) {
      var srcAttr = firstImg.getAttribute('src');

      if (srcAttr.indexOf(this.Const().Names.SC.TreeExpandedPng.sc920) > -1) {
        //this.debug().Log('is Expanded');
        toReturn = true;
      }
      return toReturn;
    }
  }

  private __isContentTreeNode(targetNode: HTMLElement) {
    var toReturn: boolean = false;

    var className = targetNode.className;
    if (className === this.Const().ClassNames.ContentTreeNode) {
      //this.debug().Log('is Content Node');
      toReturn = true;
    }
    return toReturn;
  }

  WalkNodeRecursive(targetNode: HTMLElement, depth: number): IDataOneTreeNode[] {
    var toReturn: IDataOneTreeNode[] = [];
    depth = depth - 1;

    if (targetNode) {
      var firstImg: HTMLElement = targetNode.querySelector(this.Const().Selector.SC.ContentTreeNodeGlyph);

      if (this.__isContentTreeNode(targetNode)) {
        var newData: IDataOneTreeNode = {
          IsExpanded: this.__isExpanded(firstImg),
          IsActive: this.__isActive(targetNode),
          NodeFriendly: '',
          NodeId: null
        }

        if (newData.IsExpanded || newData.IsActive) {
          this.debug().LogVal('isExpanded', newData.IsExpanded.toString());
          this.debug().LogVal('isActive', newData.IsActive.toString());

          newData.NodeFriendly = this.GetFriendlyNameFromNode(firstImg);

          this.debug().LogVal('friendlyName', newData.NodeFriendly);

          var apparentId = firstImg.id.replace(this.Const().Names.SC.TreeGlyphPrefix, '');

          newData.NodeId = this.Xyyz.GuidMan.ParseGuid(apparentId);

          toReturn.push(newData);
        }
      }

      var childNodes: HTMLCollection = targetNode.children;//  querySelectorAll('.' + this.Const().ClassNames.ContentTreeNode);
      if (childNodes && childNodes.length > 0 && depth > 0) {
        for (var jdx = 0; jdx < childNodes.length; jdx++) {
          var oneChild = <HTMLElement>childNodes[jdx];
          toReturn = toReturn.concat(this.WalkNodeRecursive(oneChild, depth));
        }
      }
    }
    return toReturn;
  }

  GetOneLiveTreeData(dataOneCe: IDataOneStorageCE, targetDoc: IDataOneDoc): IDataOneTreeNode[] {
    this.debug().FuncStart(this.GetOneLiveTreeData.name, 'id: ' + dataOneCe.Id.asShort);
    this.debug().Log('targetDoc isnull: ' + (targetDoc === null));

    var toReturn: IDataOneTreeNode[] = [];

    if (targetDoc) {
      //this.debug().Log(targetDoc);
      var rootNode = targetDoc.Document.getElementById(this.Const().ElemId.sc.SitecoreRootNodeId);

      if (rootNode) {
        this.debug().Log('rootNode: ' + rootNode.innerHTML);
        var rootParent = rootNode.parentElement;

        toReturn = this.WalkNodeRecursive(rootParent, this.Const().MaxIter);
        this.debug().Log('foundNodes count: ' + toReturn.length);

        //var nodesAsString = JSON.stringify(toReturn);
        //this.debug().Log('toReturn as string: ' + nodesAsString);
      } else {
        this.debug().Error(this.GetOneLiveTreeData.name, 'no root node');
      }
    } else {
      this.debug().Error(this.GetOneLiveTreeData.name, 'no targetDoc');
    }
    this.debug().FuncEnd(this.GetOneLiveTreeData.name);

    return toReturn;
  }
}