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

    var treeNode = parentNode.querySelector('[id^=Tree_Node_]');
    if (treeNode) {
      toReturn = treeNode.innerText;
    } else {
      this.debug().Log('No treeNode');
    }
    this.debug().FuncEnd(this.GetFriendlyNameFromNode.toString + ' ' + toReturn);
    return toReturn;
  }

  WalkNodeRecursive(targetNode: HTMLElement, depth: number): IDataOneTreeNode[] {
    var toReturn: IDataOneTreeNode[] = [];
    depth = depth - 1;

    if (targetNode) {
      var className = targetNode.className;
      if (className === this.Const().ClassNames.ContentTreeNode) {
        var firstImg = targetNode.querySelector(this.Const().Selector.ContentTreeNodeGlyph);
        if (firstImg) {
          var srcAttr = firstImg.getAttribute('src');
          if (srcAttr.indexOf(this.Const().Names.sc.scTreeExpandedPng) > -1) {
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

        toReturn =  this.WalkNodeRecursive(rootParent, this.Const().MaxIter);
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