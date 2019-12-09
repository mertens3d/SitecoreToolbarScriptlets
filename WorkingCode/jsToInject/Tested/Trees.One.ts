console.log('OneTree loaded');

class OneTreeManager extends SpokeBase {
  constructor(xyyz: Hub) {
    super(xyyz)
    xyyz.debug.FuncStart(OneTreeManager.name);
    xyyz.debug.FuncEnd(OneTreeManager.name);
  }

  GetFriendlyNameFromNode(inputNode) {
    this.Xyyz.debug.FuncStart(this.GetFriendlyNameFromNode.name);
    var toReturn = 'unknown';

    var parentNode = inputNode.parentNode;

    var treeNode = parentNode.querySelector('[id^=Tree_Node_]');
    if (treeNode) {
      toReturn = treeNode.innerText;
    } else {
      this.Xyyz.debug.Log('No treeNode');
    }
    this.Xyyz.debug.FuncEnd(this.GetFriendlyNameFromNode.toString + ' ' + toReturn);
    return toReturn;
  }

  WalkNodeRecursive(targetNode: HTMLElement, depth :number): OneTreeNode[] {
    var toReturn: OneTreeNode[] = [];
    depth = depth - 1;

    if (targetNode) {
      var className = targetNode.className;
      if (className === this.Xyyz.InjectConst.ClassNames.ContentTreeNode) {
        var firstImg = targetNode.querySelector(this.Xyyz.InjectConst.Selector.ContentTreeNodeGlyph);
        if (firstImg) {
          var srcAttr = firstImg.getAttribute('src');
          if (srcAttr.indexOf(this.Xyyz.InjectConst.TreeExpandedPng) > -1) {
            var friendlyName = this.GetFriendlyNameFromNode(firstImg);

            toReturn.push(new OneTreeNode(firstImg.id, friendlyName, this.Xyyz));
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

  GetOneLiveTreeData(idx, targetDoc: Document): OneTreeNode[] {
    this.Xyyz.debug.FuncStart(this.GetOneLiveTreeData.name + 'b idx: ' + idx);
    this.Xyyz.debug.Log('targetDoc isnull xx: ' + (targetDoc === null));

    var toReturn: OneTreeNode[] = [];

    if (targetDoc) {
      this.Xyyz.debug.Log(targetDoc);
      var rootNode = targetDoc.getElementById(this.Xyyz.InjectConst.Selector.RootNodeId);

      if (rootNode) {
        this.Xyyz.debug.Log('rootNode: ' + rootNode.innerHTML);
        var rootParent = rootNode.parentElement;

        toReturn = this.WalkNodeRecursive(rootParent, this.Xyyz.InjectConst.MaxIter);
        this.Xyyz.debug.Log('foundNodes count: ' + toReturn.length);

        //var nodesAsString = JSON.stringify(toReturn);
        //this.Xyyz.debug.Log('toReturn as string: ' + nodesAsString);
      } else {
        this.Xyyz.debug.Error(this.GetOneLiveTreeData.name, 'no root node');
      }
    } else {
      this.Xyyz.debug.Error(this.GetOneLiveTreeData.name, 'no targetDoc');
    }
    this.Xyyz.debug.FuncEnd(this.GetOneLiveTreeData.name);

    return toReturn;
  }
}