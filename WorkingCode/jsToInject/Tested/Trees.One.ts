console.log('OneTree loaded');

class OneTreeManager extends ManagerBase {
  constructor(xyyz: Hub) {
    super(xyyz)
    xyyz.debug.FuncStartName(OneTreeManager.name);
    xyyz.debug.FuncEndName(OneTreeManager.name);
  }

  GetFriendlyNameFromNode(inputNode) {
    this.Xyyz.debug.FuncStartName(this.GetFriendlyNameFromNode.name);
    var toReturn = 'unknown';

    var parentNode = inputNode.parentNode;

    var treeNode = parentNode.querySelector('[id^=Tree_Node_]');
    if (treeNode) {
      toReturn = treeNode.innerText;
    } else {
      this.Xyyz.debug.Log('No treeNode');
    }
    this.Xyyz.debug.FuncEndName(this.GetFriendlyNameFromNode.toString + ' ' + toReturn);
    return toReturn;
  }

  WalkNodeRecursive(targetNode: HTMLElement, depth: number): IDataOneTreeNode[] {
    var toReturn: IDataOneTreeNode[] = [];
    depth = depth - 1;

    if (targetNode) {
      var className = targetNode.className;
      if (className === this.Xyyz.Const.ClassNames.ContentTreeNode) {
        var firstImg = targetNode.querySelector(this.Xyyz.Const.Selector.ContentTreeNodeGlyph);
        if (firstImg) {
          var srcAttr = firstImg.getAttribute('src');
          if (srcAttr.indexOf(this.Xyyz.Const.TreeExpandedPng) > -1) {
            var friendlyName = this.GetFriendlyNameFromNode(firstImg);

            var newData: IDataOneTreeNode = { NodeFriendly: friendlyName, NodeId: this.Xyyz.GuidMan.ParseGuid( firstImg.id) }
            toReturn.push(newData);
          }
        }
      }

      var childNodes: HTMLCollection = targetNode.children;
      if (childNodes && childNodes.length > 0 && depth > 0) {
        for (var jdx = 0; jdx < childNodes.length; jdx++) {
          var oneChild = <HTMLElement> childNodes[jdx];
          toReturn = toReturn.concat(this.WalkNodeRecursive(oneChild, depth));
        }
      }
    }
    return toReturn;
  }

  GetOneLiveTreeData(dataOneCe: IDataOneCE, targetDoc: Document): IDataOneTreeNode[] {
    this.Xyyz.debug.FuncStartName(this.GetOneLiveTreeData.name + 'b idx: ' + dataOneCe.Id);
    this.Xyyz.debug.Log('targetDoc isnull xx: ' + (targetDoc === null));

    var toReturn: IDataOneTreeNode[] = [];

    if (targetDoc) {
      this.Xyyz.debug.Log(targetDoc);
      var rootNode = targetDoc.getElementById(this.Xyyz.Const.ElemId.SitecoreRootNodeId);

      if (rootNode) {
        this.Xyyz.debug.Log('rootNode: ' + rootNode.innerHTML);
        var rootParent = rootNode.parentElement;

        toReturn =  this.WalkNodeRecursive(rootParent, this.Xyyz.Const.MaxIter);
        this.Xyyz.debug.Log('foundNodes count: ' + toReturn.length);

        //var nodesAsString = JSON.stringify(toReturn);
        //this.Xyyz.debug.Log('toReturn as string: ' + nodesAsString);
      } else {
        this.Xyyz.debug.Error(this.GetOneLiveTreeData.name, 'no root node');
      }
    } else {
      this.Xyyz.debug.Error(this.GetOneLiveTreeData.name, 'no targetDoc');
    }
    this.Xyyz.debug.FuncEndName(this.GetOneLiveTreeData.name);

    return toReturn;
  }
}