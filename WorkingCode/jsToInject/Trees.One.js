var xyyz = xyyz || {};

xyyz.OneTree = {
  GetFriendlyNameFromNode: function (inputNode) {
    xyyz.debug.FuncStart(this.GetFriendlyNameFromNode.name);
    var toReturn = 'unknown';

    // xyyz.debug.Log('inputNode: ' + JSON.stringify({
    //     'input': inputNode
    // }));

    var parentNode = inputNode.parentNode;

    // xyyz.debug.Log('parentNode: ' + JSON.stringify(parentNode));
    var treeNode = parentNode.querySelector('[id^=Tree_Node_]');
    if (treeNode) {
      // xyyz.debug.Log('treeNode: ' + JSON.stringify(treeNode));
      toReturn = treeNode.innerText;
      //document.getElementsByTagName('iframe')[0].contentDocument.getElementById('Tree_Node_5EAE6F2279524A43BB628C633A0ABC47').innerText
    } else {
      xyyz.debug.Log('No treeNode');
    }
    xyyz.debug.FuncEnd(this.GetFriendlyNameFromNode.name + ' ' + toReturn);
    return toReturn;
  },

  WalkNodeRecursive: function (targetNode, depth) {
    // xyyz.debug.Log('WalkNodeRecursive ' + depth);
    var toReturn = [];
    depth = depth - 1;

    if (targetNode) {
      var className = targetNode.className;
      // xyyz.debug.Log('class: ' + className);
      if (className === xyyz.InjectConst.ClassNames.ContentTreeNode) {
        var firstImg = targetNode.querySelector(xyyz.InjectConst.Selector.ContentTreeNodeGlyph);
        if (firstImg) {
          // xyyz.debug.Log(targetNode);
          // xyyz.debug.Log('targetNode: ' + JSON.stringify(targetNode));
          // xyyz.debug.Log('firstImg: ' + JSON.stringify(firstImg));
          var srcAttr = firstImg.getAttribute('src');
          if (srcAttr.indexOf(xyyz.InjectConst.TreeExpandedPng) > -1) {
            // xyyz.debug.Log('src: ' + srcAttr);

            var friendlyName = this.GetFriendlyNameFromNode(firstImg);

            toReturn.push(new OneTreeNode(firstImg.id, friendlyName));
          }
        }
      }

      var childNodes = targetNode.children;
      if (childNodes && childNodes.length > 0 && depth > 0) {
        for (var jdx = 0; jdx < childNodes.length; jdx++) {
          var oneChild = childNodes[jdx];
          toReturn = toReturn.concat(this.WalkNodeRecursive(oneChild, depth));
        }
      }
    }
    return toReturn;
  },


  GetOneLiveTreeData: function (idx, targetDoc) {
    xyyz.debug.FuncStart(this.GetOneLiveTreeData.name + ' idx: ' + idx);

    var toReturn = [];

    if (targetDoc) {
      xyyz.debug.Log(JSON.stringify(targetDoc));
      var rootNode = targetDoc.getElementById(xyyz.InjectConst.Selector.RootNodeId);

      if (rootNode) {
        xyyz.debug.Log('rootNode: ' + rootNode.innerHTML);
        var rootParent = rootNode.parentElement;

        toReturn = this.WalkNodeRecursive(rootParent, xyyz.InjectConst.MaxIter);
        xyyz.debug.Log('foundNodes count: ' + toReturn.length);

        var nodesAsString = JSON.stringify(toReturn);
        xyyz.debug.Log('toReturn as string: ' + nodesAsString);
      } else {
        xyyz.debug.Error(this.GetOneLiveTreeData.name, 'no root node');
      }
    } else {
      xyyz.debug.Error(this.GetOneLiveTreeData.name, 'no targetDoc');
    }
    xyyz.debug.FuncEnd(this.GetOneLiveTreeData.name);

    return toReturn;
  }
};